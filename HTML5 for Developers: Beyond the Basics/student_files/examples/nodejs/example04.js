// this contains the server code in a module required by example04.js

var fs       = require('fs'),
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
    };
    
   
exports.handleRequest = handleRequest;