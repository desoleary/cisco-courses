
var express      = require('express'),
    contacts     = require('./contacts.js'),
    contactdata  = contacts.contacts.contactdata,
    record_count = contactdata.length + 500;
    json2xml     = require('./json2xml.js'),
    port         = 8005,
    app          = express();


app.use(express.directory("public"))
   .use(express.static("public"))
   .use(express.bodyParser());

// supports CORS
app.options("/contact", function (req, res) {
    console.log("OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "accept, origin, format");
    res.end();
});

app.options("/contacts/:contactid", function (req, res) {
    console.log("OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "accept, origin, format");
    res.end();
});


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
		resp.write(results);
	}
	else 
		resp.json(results);
		
    resp.end();
});

app.get("/contact", function (req, resp) {
    var results = contacts.contacts;
    
    console.log("GET all contacts");

    resp.setHeader("Access-Control-Allow-Origin", "*");
	
	if (req.headers.format === 'xml') {
		results = json2xml.json2xml(eval({contacts: results}));
		resp.write(results);
	}
	else 
		resp.json(results);
		
    resp.end();
});

app.post("/contact", function (req, resp) {
    var name = req.body.name, address = req.body.address, email = req.body.email, phone_num = req.body.phone_num, phone_type = req.body.phone_type, 
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
    
    console.log("PUT contact: " + contactid);
	
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

app.listen(port);
console.log('Server running on port ' + port + '.');
console.log(contacts.contacts.contactdata.length + ' contacts found.');
