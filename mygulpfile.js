var mygulp=require("./mygulp");
var small=require("./small");
var path=require("path");
var yasuo=require("./yasuo")
mygulp.task("one",function(){
    mygulp.src("a/one.js").pipe(small()).pipe(yasuo()).pipe(mygulp.dest("c/b"));
})
mygulp.task("two",function(){
    console.log(2);
    //mygulp.src("aa/bb/cc.cs").pipe(mygulp.dest(cc/dd));
})
mygulp.task("default",function(){
    console.log("default");
    //mygulp.src("aa/bb/cc.cs").pipe(mygulp.dest(cc/dd));
})
