var express      = require('express'),
    port         = 8006,
    app          = express();

app.use(express.directory("public"))
   .use(express.static("public"))
   .use(express.bodyParser());

app.listen(port);
console.log('Lab09 server running on port ' + port + '.');
console.log('Use this server to serve up the index.html page only');
