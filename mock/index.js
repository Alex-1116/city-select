const express = require('express');
const app = express();
const router = require('./router');
//后台接口设置允许跨域请求,必须在use router之前
app.all("*",function (req,res,next) {
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.header('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');

    next();
});

app.use(router);

app.listen(3000,()=>{
    console.log('Loading...');
})