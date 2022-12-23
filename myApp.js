let express = require('express');
let app = express();
let bodyParser = require('body-parser');

const filePath = __dirname + "/views/index.html";
const assetsPath = __dirname + "/public";

app.use("/", bodyParser.urlencoded({extended: false})).post("/name", function(req, res) {
  let data = req.body;
  res.send({name: data.first + " " + data.last});
  next();
})

app.get("/:word/echo", function(req, res, next) {
  let word = req.params.word
  res.send({echo: word})
  next();
})

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.use("/", function(req, res, next) {
  let method = req.method;
  let path = req.path;
  let ip = req.ip;
  console.log(method + " " + path + " - " + ip);
  next();
});

app.get("/json", function(req, res) {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ "message": response });
});

app.use("/public", express.static(assetsPath));

app.get("/", function(req, res) {
  res.sendFile(filePath);
})




































module.exports = app;
