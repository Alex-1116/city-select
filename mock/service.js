const fs = require('fs');
const path = require('path');
const https = require('https');
exports.getAllCity = (req,res)=>{
    fs.readFile(path.join(__dirname,'./cityData.json'),'utf-8',(err,data)=>{
        if(err){
            res.end('页面出错了');
        }else{
            res.end(data);
        }
    })
   
}

exports.getNowCity = (req,res)=>{
     showCityInfo(function(msg){
         let data = msg;
         res.end(data);
     });
    
    }

function showCityInfo(cb){
  
    const options = {
        hostname: 'restapi.amap.com',
        port: 443,
        path: '/v3/ip?key=9bfd1cf807d06ba5152fea6fa57df0e4&output=json',
        method: 'GET',
    };

    const req = https.request(options, (res) => {
        let pdata = "";
        /*  console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`); */
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            pdata += chunk;
        });
        res.on('end', () => {
            cb(pdata);//类型必须是string或者buffer
        });
        
    });
    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });


    
    req.end();//必须有 
}   
      
exports.getHotCity = (req,res)=>{
    fs.readFile(path.join(__dirname,'./hotCity.json'),'utf-8',(err,data)=>{
        if(err){
            res.end('页面出错了');
        }else{
            res.end(data);
        }
    })
}    