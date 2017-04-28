var stream=require("stream");
var fs=require("fs");
var through=require("./through");
var factory=require("./factory");
var shell=require("shelljs");
var url=require("path");
class mygulp{
    constructor(){
        this.contents=[];
        this.taskInfo={};

        //1.加入命令，通过输入命令行添加参数，执行相应的任务
        this.argv=process.argv[2]?process.argv[2]:"default";
        var that=this;
        //必须设置延时，然后执行run,不然fn还没有添加到taskInfo里，执行的话会报错not function
        //正常线程走完执行 setTimeout/process.nextTick(function(){}) 一样
        /*
         console.log(this.taskInfo);显示taskInfo为{}
        setTimeout(function () {
            //console.log(that.taskInfo);这里有延时后，都已经添加进去了
            that.run();
        },0)
        */
        process.nextTick(function () {
            that.run();
        })

    }
    task(tname,callback){
        //1.把每个任务的名字和回调函数放在info内，使得mygulp.taskInfo["name"}()可以调用函数
            //数组效率低，存成json，少了循环，加快程序运行速度
        this.taskInfo[tname]=callback;
    }
    run(){
        if(this.taskInfo[this.argv]){
            this.taskInfo[this.argv]();
        }else {
            console.log(this.argv+"命令不存在");
        }
    }
    src(path){
        //2.src(可读流) 找到源头，对源头数据处理
        return through.readObj(function () {
            this.push(factory(path).contents);
            this.push(null);
        })
    }

    dest(path){
        //3.dest(可写流)
        return through.obj(function (a,b,c) {
            var basename=url.basename(path);
            var extname=url.extname(path);
            var dirname=url.dirname(path);
            var fullname=path;
            //处理，如果只传入路径没有文件名，对路径的设置
            var dirname=extname?dirname:fullname;
            try{
                fs.statSync(dirname);//检查文件路径是否存在，存在再执行之后
                for(var i=0;i<a.length;i++){
                    //看传入的路径里是否有文件名
                    var lastname=extname?basename:a[i].name;
                    fs.writeFileSync(url.join(dirname,lastname),a[i].content,"utf-8");
                }
            }catch(e){
                //文件不存在，创建文件
                shell.mkdir("-p",dirname);
                for(var i=0;i<a.length;i++){
                    var lastname=extname?basename:a[i].name;
                    fs.writeFileSync(url.join(dirname,lastname),a[i].content,"utf-8");
                }
            }
            c(null,null);

        })


    }
}
module.exports=new mygulp();
