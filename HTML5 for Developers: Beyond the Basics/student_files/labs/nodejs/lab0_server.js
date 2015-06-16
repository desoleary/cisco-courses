var express     = require('express'),
    port        = 8005,
    app         = express();

app.use(express.directory("public"));
app.use(express.static("public"));

app.get("/test/:echoval", function (req, resp) {
    var echoval = req.params.echoval, 
        results = {"error" : "An error occurred."};

    console.log("GET /test: " + echoval);
		
	if (echoval) results = { "data" : echoval };	

	resp.json(results);
    resp.end();
});

app.listen(port);
console.log('Server running on port ' + port + '.');
