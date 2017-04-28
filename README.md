# mygulp
模拟gulp做的，可以通过操作命令行执行任务

**主要文件及思想：**

through.js:处理双工流

factory.js:处理文件路径及文件读取

small.js:模拟功能插件，将文件内容转化为小写

yasuo.js:去除文件的空格

shelljs:类似命令行操作文件

mygulpfile.js:任务

mygulp.js:


```

graph TD

    A[mygulp] -->C(mugulp.js)
    C -->|task| D[任务名和内容放在taskInfo]
    C -->|src| E[可读流处理\读取数据内容]
    C -->|dest| F[可写流\检查路径后写入文件]
    C -->|run| G[获取命令行参数\延时添加\执行任务]
    
    D --> H(a)
    E --> I(factory.js把文件内容和文件名保存在contents)
    G --> J(index.js)
    J --> K(引入时会把文件执行一次mygulpfile.js/从而执行相应命令行)
    
    
    
    
```
