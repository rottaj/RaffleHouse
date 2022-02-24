var bodyParser = require('body-parser')
var app = require('express')();
var http = require('http').createServer(app);
http.listen(8080, () => {
  console.log("Listening on port 8080");
})
exports.app = app;