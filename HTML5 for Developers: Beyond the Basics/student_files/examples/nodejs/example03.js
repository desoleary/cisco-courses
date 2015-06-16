// this loads the user-defined module 'example04'

var http     = require('http'),
    ex04     = require('./example04'), 
    server   = http.createServer(ex04.handleRequest);

server.listen(8000);