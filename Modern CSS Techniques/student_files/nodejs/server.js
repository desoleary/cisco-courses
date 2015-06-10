var express      = require('express'),
	empdata      = require('./empdata.js'),				// for several of the examples
	emps         = empdata.empdata.emps,
	max          = 100+emps.length,
    contacts     = require('./contacts.js'),
    contactdata  = contacts.contacts.contactdata,
    record_count = contactdata.length + 500,
    json2xml     = require('./json2xml.js'),
    port         = 8005,
    app          = express();

// define the nodejs/public folder as the place for static resources
app.use(express.directory("public"))
   .use(express.static("public"))
   .use(express.bodyParser());

// supports CORS
app.options("*", function (req, res) {
    console.log("OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "format, Accept, X-Requested-With, Origin, Content-Type ");
    res.end();
});



//--------------------------------------------------
//  Used for Exercise 1 and 2 to test the nodejs server and debug
//  It echoes any message sent to it
//
app.get("/test/:echoval", function (req, resp) {
    var echoval = req.params.echoval,
        results = {"error" : "An error occurred."};

    console.log("GET /test: " + echoval);

    if (echoval) results = { "data" : echoval };

    resp.json(results);
    resp.end();
});
app.get("/test/", function (req, resp) {
    var results = {"error" : "No data submitted."};
    console.log("GET /test/");
    resp.json(results);
    resp.end();
});


//--------------------------------------------------
//  Main set of functions for the contact-based lab-exercises
//
app.get("/contact/:contactid", function (req, resp) {
    var contactid = req.params.contactid, 
        results = {"error" : "Not found."};
    
    console.log("GET contact: " + contactid);

    resp.setHeader("Access-Control-Allow-Origin", "*");
	
	contactdata.forEach(function(contact){
		if (contact.contactid == contactid)
			results = contact;
	});
	
	
	if (req.headers.format === 'xml') {
		results = json2xml.json2xml(eval({contact: results}));
		resp.contentType('text/xml');
		resp.write(results);
	}
	else 
		resp.json(results);
		
    resp.end();
});

app.get("/contact", function (req, resp) {
    var results={};
    results.contactdata = [];

    contactdata.forEach(function(c){
        var contact = {};
        contact.contactid        = c.contactid;
        contact.name             = c.name;
        contact.address          = c.address;
        contact.email            = c.email;
        contact.phone_num        = c.phones[0].number;
        contact.phone_type       = c.phones[0].type;
        contact.company          = c.company;
        contact.position         = c.position;
        results.contactdata.push(contact);
    });

    console.log("GET all contacts");

    resp.setHeader("Access-Control-Allow-Origin", "*");
	
	if (req.headers.format === 'xml') {
		results = json2xml.json2xml(eval({contacts: results}));
		resp.contentType('text/xml');
		resp.write(results);
	}
	else 
		resp.json(results);
		
    resp.end();
});

app.post("/contact", function (req, resp) {
    var name = req.body.name, address = req.body.address, email = req.body.email,
               phone_num = req.body.phone_num, phone_type = req.body.phone_type,
    		   company = req.body.company, position = req.body.position, contact;
    contact = {"contactid": record_count++, "name": name, "address": address, "email": email, "company": company, 
               "position": position, "phones": [{ "number": phone_num, "type": phone_type }] };
    contactdata.push(contact);
	resp.json({"created": contact.contactid});
	console.log("POST new contact " + contact.name + ' ' + contact.address + ' ' + contact.phones[0].number);
    resp.end();
});

app.delete("/contact/:contactid", function (req, resp) {
    var contactid = req.params.contactid, results = {"error" : "Not found."};
    
    console.log("DELETE contact: " + contactid);
	
    for(var i=0,len=contactdata.length; i<len; i++) {
    	if (contactdata[i].contactid == contactid) {
    		contactdata.splice(i,1);
    		results = {"deleted" : contactid};
    		break;
    	}
    }	
	resp.json(results);
    resp.end();
});


app.put("/contact/:contactid", function (req, resp) {
	        var contactid = req.params.contactid, name = req.body.name, address = req.body.address, email = req.body.email, phone_num = req.body.phone_num, phone_type = req.body.phone_type,
    		   company = req.body.company, position = req.body.position, contact, results = {"error" : "Not found."};
    
    console.log("PUT contact: " + contactid + " updating " + name);
	
    contactdata.forEach(function(contact){
		if (contact.contactid == contactid) {
			contact.name             = name;
			contact.address          = address;
			contact.email            = email;
			contact.phones[0].number = phone_num;
			contact.phones[0].type   = phone_type;
			contact.company          = company;
			contact.position         = position;
			results = {"updated" : contactid};
		}
	});
		
	resp.json(results);
    resp.end();
});




//--------------------------------------------------------------
//	The following calls are used for employee-related examples
//
app.get("/employee/:empid", function (req, resp) {
    var empid = req.params.empid, 
        results = {"error" : "Not found."};
    
    console.log("GET employee: " + empid);

    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Headers", "format, accept, origin, access-control-request-method, x-requested-with");

	emps.forEach(function(emp){
		if (emp.empid == empid)
			results = emp;
	});
	
	if (req.headers.format === 'xml') {
		results = json2xml.json2xml(eval({employee: results}));
		resp.contentType('text/xml');
		resp.write(results);
	}
	else 
		resp.json(results);

    resp.end();
});


app.get("/employee", function (req, resp) {
    console.log("GET all employees");
    resp.setHeader("Access-Control-Allow-Origin", "*");	
	resp.json({"empList": emps});
    resp.end();
});

app.post("/employee", function (req, resp) {
    var firstname = req.body.firstname, lastname = req.body.lastname, salary = req.body.salary, emp;

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



//--------------------------------------------------------
//   The /rest/contact urls are not used here
//
//
app.get("/rest/contact/:contactid", function (req, resp) {
    var contactid = req.params.contactid,
        results = {"error" : "Not found."};

    console.log("GET contact: " + contactid);

    resp.setHeader("Access-Control-Allow-Origin", "*");

    contactdata.forEach(function(contact){
        if (contact.contactid == contactid)
            results = contact;
    });


    if (req.headers.format === 'xml') {
        results = json2xml.json2xml(eval({contact: results}));
        resp.contentType('text/xml');
        resp.write(results);
    }
    else
        resp.json(results);

    resp.end();
});

app.get("/rest/contact", function (req, resp) {
    console.log("GET all contacts - /rest/contact version");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    var flatContactData=[];

    contactdata.forEach(function(c){
        var contact = {};
        contact.contactid        = c.contactid;
        contact.name             = c.name;
        contact.address          = c.address;
        contact.email            = c.email;
        contact.phone_number     = c.phones[0].number;
        contact.phone_type       = c.phones[0].type;
        contact.company          = c.company;
        contact.position         = c.position;
        flatContactData.push(contact);
    });

    resp.json(flatContactData);
    resp.end();
});

app.post("/rest/contact", function (req, resp) {
    var name = req.body.name, address = req.body.address, email = req.body.email, phone_num = req.body.phoneNumber, phone_type = req.body.phoneType,
        company = req.body.company, position = req.body.position, contact;

    contact = {"contactid": record_count++, "name": name, "address": address, "email": email, "company": company,
        "position": position, "phones": [{ "number": phone_num, "type": phone_type }] };
    contactdata.push(contact);
    resp.json({"created": contact.contactid});
    console.log("POST new contact " + contact.name + ' ' + contact.address + ' ' + contact.phones[0].number + ' /rest/contact version');
    resp.end();
});

app.delete("/rest/contact/:contactid", function (req, resp) {
    var contactid = req.params.contactid, results = {"error" : "Not found."};

    console.log("DELETE contact: " + contactid);

    for(var i=0,len=contactdata.length; i<len; i++) {
        if (contactdata[i].contactid == contactid) {
            contactdata.splice(i,1);
            results = {"deleted" : contactid};
            break;
        }
    }
    resp.json(results);
    resp.end();
});


app.put("/rest/contact/:contactid", function (req, resp) {
    var contactid = req.params.contactid, name = req.body.name, address = req.body.address, email = req.body.email, phone_num = req.body.phoneNumber, phone_type = req.body.phoneType,
        company = req.body.company, position = req.body.position, contact, results = {"error" : "Not found."};

    console.log("PUT contact: " + contactid + ' /rest/contact version');

    contactdata.forEach(function(contact){
        if (contact.contactid == contactid) {
            contact.name             = name || contact.name;
            contact.address          = address || contact.address;
            contact.email            = email || contact.email;
            contact.phones[0].number = phone_num || contact.phones[0].number;
            contact.phones[0].type   = phone_type || contact.phones[0].type;
            contact.company          = company || contact.company;
            contact.position         = position || contact.position;
            results = {"updated" : contactid};
        }
    });

    resp.json(results);
    resp.end();
});


//---------------------------------------------
//
// The /rest/employee URLs are not used here
//
app.get("/rest/employee", function (req, resp) {
    console.log("GET all employees - /rest/employee version");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.json(emps);
    resp.end();
});

app.get("/rest/employee/:empid", function (req, resp) {
    var empid = req.params.empid,
        results = {"error" : "Not found."};

    console.log("GET employee: " + empid);

    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Headers", "format, accept, origin, access-control-request-method, x-requested-with");

    emps.forEach(function(emp){
        if (emp.empid == empid)
            results = emp;
    });

    if (req.headers.format === 'xml') {
        results = json2xml.json2xml(eval({employee: results}));
        resp.contentType('text/xml');
        resp.write(results);
    }
    else
        resp.json(results);

    resp.end();
});

app.delete("/rest/employee/:empid", function (req, resp) {
    var empid = req.params.empid,
        results = {"error" : "Not found."};

    console.log("DELETE employee: " + empid);

    for(var i=0,len=emps.length; i<len; i++) {
        if (emps[i].empid == empid) {
            emps.splice(i,1);
            results = {"deleted" : empid};
        }
    }

    resp.json(results);
    resp.end();
});

app.put("/rest/employee/:empid", function (req, resp) {
    var empid = req.params.empid;
        results = {"error" : "Not found."};

    console.log("PUT employee: " + empid, req.body);


    emps.forEach(function(emp){
        if (emp.empid == empid) {
            if(req.body.firstname) emp.firstname = req.body.firstname;
            if(req.body.lastname) emp.lastname = req.body.lastname;
            if(req.body.salary) emp.salary = req.body.salary;

            results = {"updated" : empid};
        }
    });

    resp.json(results);
    resp.end();
});

app.post("/rest/employee", function (req, resp) {
    var firstname = req.body.firstname, lastname = req.body.lastname, salary = req.body.salary, emp;

    // should validate to prevent injection attacks

    emp = {"empid": max++, "firstname": firstname, "lastname": lastname, "salary": salary };
    emps.push(emp);
    resp.json({"created": emp.empid});
    console.log("POST new employee " + emp.firstname + ' ' + emp.lastname + ' ' + emp.salary);
    resp.end();
});




//--------------------------------------------------------------
//The following echoes a msg value sent as a request parameter example
//
app.get("/simpleajax", function (req, resp) {
	var msg = req.query.msg;

	console.log("GET msg: " + msg);
	
	resp.write('Thank you for your msg. (' + msg + ') We will get back to you on this.');
	resp.end();
});



//--------------------------------------------------------------
//The following prints parameters and responds with a message.
//
app.post("/formdata", function (req, resp) {

    console.log("params sent to /formdata: ");
    Object.keys(req.body).forEach(function(prop){ console.log(prop + ' - ' + req.body[prop]); });

    resp.write('Thank you. '+ Object.keys(req.body).length + ' updates received.');
    resp.end();
});




app.listen(port);
console.log('Server running on port ' + port + '.');
console.log(contacts.contacts.contactdata.length + ' contacts found.');
console.log(emps.length + ' employees found.');

