var express = require('express');
var app = express();
var tree = require('./model/Forest.js');

app.get('/jit.js', function(req, res){
    res.sendFile('/Users/jeremyshi/Devlopment/visualize_gbdt/assets/jit.js');
});

app.get('/', function(req, res) {
    res.sendFile('/Users/jeremyshi/Devlopment/visualize_gbdt/index.html');
});

app.get('/tree', function(req, res) {
    res.send(tree);
});

app.listen(8080);