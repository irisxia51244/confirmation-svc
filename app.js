var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var transactionNumber = "";
var orderNumber = "";

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host:'127.0.0.1',
//   port:'3306',
//   user:'root',
//   password:'tcss531',
//   database:'order',
//
// })

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
})
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host : process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PW,
//   database: process.env.MYSQL_DB,
// })

//app.get('/',function(req,res){
  //res.send('Hello World!')
//})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

//get transactionNumber

app.post("/",function(req,res){
  var transactionNumber = req.body.transactionNumber;
});

if(transactionNumber != ''){
//transactionNumber = '111'
//generate orderNumber
var crypto = require('crypto');
function randomValueHex(len){
  return crypto.randomBytes(Math.ceil(len/2))
  .toString('hex')
  .slice(0,len);
}
var orderNumber = randomValueHex(10);

app.get('/',function(req,res){
  res.send(transactionNumber)
})

 connection.connect();
 var queryString = 'INSERT INTO order_table VALUES (?,?)'

 connection.query(queryString,[orderNumber,transactionNumber], function(err, rows, fields) {
    if (err) throw err;

    for (var i in rows) {
        console.log('Post Titles: ', rows[i].post_title);
    }
  });

  connection.end();
}

else{
  app.get('/',function(req,res){
    res.send('transaction not successfull')
  })
}
app.listen(process.env.PORT || 3000);
// app.listen(3000,function(){
//   console.log('Example app listening on port 3000')
// })
