// to run from cmd line: put directory for node.exe in your PATH, cd to this directory, execute node example01.js

var http = require("http"),
    
    handleRequest = function(request, response) {
    	var resp = 'Thank you for your response.';
    	response.writeHead(200, {"Content-Type": "text/plain"});
    	response.write(resp);
    	console.log(resp);
    	response.end();
    },

    port = 8005,
    server   = http.createServer(handleRequest);
    console.log('Example01 running...visit localhost:' + port + ' in your browser or CTRL-C twice to exit.');

server.listen(port);