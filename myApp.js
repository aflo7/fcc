var express = require('express');
var app = express();
const path = require('path')
var bodyParser = require('body-parser')

var myLogger = (req, res, next) => {
let ClientIp = req.ip
let path = req.path
let method = req.method

console.log(method + " " + path + " - " + ClientIp);
next()
}

const absolutePath = __dirname + '/public'
const bodyMiddleWare = bodyParser.urlencoded({extended: false})

app.use(myLogger)
app.use(bodyMiddleWare)


app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  
})

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      "message": "HELLO JSON"
    });
  }
    res.json({
      "message": "Hello json"
    }); 
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, function (req, res) {
  res.json({
    time: req.time
  })
})

app.get('/:word/echo', (req, res) => {
  let word = req.params.word
  
  res.json({
    echo: word 
  })
})

app.get('/name', (req, res) => {
 let first = req.query.first
 let last = req.query.last
 
 res.json({
   name: first + " " + last
   
 })
})
  
app.post('/name', (req, res) => {
 let string = req.body.first + " " + req.body.last
 
  res.json({name: string})
})

module.exports = app;
