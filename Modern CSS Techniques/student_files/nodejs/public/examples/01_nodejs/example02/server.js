// run node server.js

var express = require('express'),
    empdata = require('./empdata.js'),
    emps    = empdata.empdata.emps,
    max     = 100+emps.length,
    port    = 8005,
    app     = express();


app.use(express.directory("public"))
   .use(express.static("public"))
   .use(express.bodyParser());

// supports CORS
app.options("*", function (req, res) {
    console.log("OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "accept, origin, format");
    res.end();
});

app.get("/employee/:empid", function (req, resp) {
    var empid = req.params.empid, 
        results = {"error" : "Not found."};
    
    console.log("GET employee: " + empid);

    resp.setHeader("Access-Control-Allow-Origin", "*");
	
	emps.forEach(function(emp){
		if (emp.empid == empid)
			results = emp;
	});
		
	resp.json(results);
    resp.end();
});

app.get("/employee", function (req, resp) {
    var results = emps;
    console.log("GET all employees");
    resp.setHeader("Access-Control-Allow-Origin", "*");	
	resp.json(results);
    resp.end();
});

app.post("/employee", function (req, resp) {
    var firstname = req.body.firstname, lastname = req.body.lastname, salary = req.body.salary, success = true, emp;

    // should validate to prevent injection attacks
    
    emp = {"empid": max++, "firstname": firstname, "lastname": lastname, "salary": salary };
    emps.push(emp);
	resp.json({"created": emp.empid});
	console.log("POST new employee " + emp.firstname + ' ' + emp.lastname + ' ' + emp.salary);
    resp.end();
});

app.delete("/employee/:empid", function (req, resp) {
    var empid = req.params.empid, 
        results = {"error" : "Not found."};
    
    console.log("DELETE employee: " + empid);
	
    for(var i=0,len=emps.length; i<len; i++) {
    	if (emps[i].empid == empid) {
    		emps.splice(i,1);
    		results = {"deleted" : empid};
    	}
    }
	console.log(emps.length);	
	resp.json(results);
    resp.end();
});


app.put("/employee/:empid", function (req, resp) {
    var empid = req.params.empid, salary = req.body.salary, 
        results = {"error" : "Not found."};
    
    console.log("PUT employee: " + empid, salary);
	
    emps.forEach(function(emp){
		if (emp.empid == empid) {
			emp.salary = salary;
			results = {"updated" : empid};
		}
	});
		
	resp.json(results);
    resp.end();
});


app.listen(port);
console.log('Server running on port ' + port + '.');
console.log(emps.length + ' employees found.');
