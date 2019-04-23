var express = require('express');
var app = express();
var fs = require('fs');


app.use(express.static('./data.json'));

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow_Header","X-Requested-Width");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By","3.2.1");
    res.header("Content-Type","application/json;charset=utf-8");
    next();
})

app.get('/',(req,res) => {
    fs.readFile('./data.json',(err,data) => {
        if(err){
            console.log(err);
        }else{
            res.end(data);
        }
    })
})

var server = app.listen(8080,'127.0.0.1',() => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`访问端口号:${port}`);
})