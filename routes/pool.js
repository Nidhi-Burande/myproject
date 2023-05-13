var mysql=require('mysql')
var pool=mysql.createPool(
{ host:'localhost',port:3308,user:'root',
password:'root',database:'services',connectionLimit:100,
multipleStatements:true  
});

module.exports=pool;