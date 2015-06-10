// this loads the user-defined module 'example05'

var http     = require('http'),
    ex05     = require('./example05'), 
    server   = http.createServer(ex05.handleRequest);

server.listen(8000);