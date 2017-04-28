var url=require("path");
var fs=require("fs");
var shell=require("shelljs");
class factory{
    constructor(path){
        this.path=path;
        this.contents=[];
        this.getCon();
    }
    getCon(){
        //var extname=url.extname(this.path);
        //var dirname=url.dirname(this.path);
        //console.log(dirname);路径名
        var fullname=this.path;
        var arr=shell.find("-p",fullname).filter(function(file){
            return file;//文件名组成的数组
        })
        //返回给定路径中的所有文件（不论深度）的数组。
        var that=this;
        arr.forEach(function(val,index){
            var obj={};
            obj.content=fs.readFileSync(val);//保存文件的内容
            obj.name=url.basename(val);//保存文件名,没有路径
            that.contents.push(obj);
            //[{name:content},{name:content}]
        })
    }

}

//module.exports=new factory;//这样写的话，不方便传参
module.exports=function (path) {
    return new factory(path);
}

