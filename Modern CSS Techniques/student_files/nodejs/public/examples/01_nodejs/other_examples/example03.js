// this reads the file and displays the results properly

var http     = require("http"), 
    fs       = require('fs'),
    respData = '',
    handleRequest = function(request, response) {
    	fs.readFile('./sample.txt', 'utf-8', function(err, data){
    		if (err) respData = err;
    		else respData = data;
    		
    		response.writeHead(200, {"Content-Type": "text/plain"});
	    	response.write(respData);
	    	console.log(respData);
	    	response.end();
    	});
    },
    port = 8005,
    server       = http.createServer(handleRequest);
    console.log('Example03 is running.\nUse localhost:' + port + ' in your browser or CTRL-C twice to end.');


server.listen(port);