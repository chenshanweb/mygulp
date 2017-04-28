var through=require("./through");
module.exports=function(){
    //使用时small(),这个函数会将through.obj(fun(){})返回出去
    //调用through.obj(fun(){})
    /*函数执行后显示：
    function (opt,cb) {
        var obj=new transformClass({objectMode:true});
        obj._transform=function(a,b,c){
             var arr=[];
             a.forEach(function(con,index){
                 var obj={};
                 obj.content= con.content.toString().toLowerCase();
                 obj.name=con.name;
                 arr.push(obj);
             })
             this.push(arr);
             c(null,null);
         };
        return obj;
    }
    */
    return through.obj(function(a,b,c){
        //console.log(a);//结果是个数组格式，之前处理的原因
        var arr=[];
        a.forEach(function(con,index){
            var obj={};
            obj.content= con.content.toString().toLowerCase();
            obj.name=con.name;
            arr.push(obj);
        })
        this.push(arr);
        c(null,null);
    })
}