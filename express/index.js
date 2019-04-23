const fs = require('fs');

setInterval(() => {
    var object = {};
    object['data'] = [{ "number": Math.floor(Math.random() * 10 + 1), "name": "one" }, { "number": Math.floor(Math.random() * 10 + 1), "name": "two" }, { "number": Math.floor(Math.random() * 10 + 1), "name": "three" }];
    var out = JSON.stringify(object);
    fs.writeFile('./data.json',out,(err) => {
        if(!err){
            console.log('生成成功')
        }
    })
},2000)