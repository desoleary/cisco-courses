// this contains the contact data required by the server entitled: server.js in the nodejs/nodejs_server folder

var contacts = { contactdata : [
    { "contactid" : 500, "name" : "Red Victors",  "address" : "4517 Elm St. Riverside NJ 08075", 
    	 "phones" : [{"number" : "(301)356-8921", "type": "home"}, {"number": "(301)356-2652", "type": "work"}], 
    	  "email" : "fthompson@yahoo.com", "company" : "ABC Inc.", "position" : "President" 
    },
    { "contactid" : 501, "name" : "Bob Green",  "address" : "2101 Eucalyptus Ave. Philadelphia PA 09119", 
   	 "phones" : [{"number" : "(202)901-2121", "type": "home"}], 
   	  "email" : "dbreal@hotmail.com", "company" : "Tupelo Industries", "position" : "Product Manager" 
    },
    { "contactid" : 502, "name" : "John Brown",  "address" : "331 Birch Cir. Black Hills SD 82101", 
  	     "phones" : [{"number" : "(719)421-8875", "type": "home"}, {"number": "(719)540-1291", "type": "work"}, {"number": "(393)522-0094", "type": "mobile"}], 
  	      "email" : "jb6712@gmail.com", "company" : "Last Rites LLC", "position" : "Undertaker" 
    },
    { "contactid" : 503, "name" : "Tina O. Range",  "address" : "82 Pine Dr. Lakewood CA 90713", 
	     "phones" : [{"number" : "(212)432-0944", "type": "home"}, {"number": "(212)387-5620", "type": "work"}], 
	      "email" : "tornut@besthp.com", "company" : "Best Holistic Practices", "position" : "Customer Service Representative" 
    },
    { "contactid" : 504, "name" : "Berry Blumenthal",  "address" : "3012 Mahogany Ln. Denver CO 80101", 
	     "phones" : [{"number" : "(202)685-2323", "type": "home"}, {"number": "(202)392-8845", "type": "work"}], 
	      "email" : "bleubry@yahoo.com", "company" : "Roller Heights Packaging", "position" : "Owner" 
    },
    { "contactid" : 505, "name" : "Jim Pinkado",  "address" : "2113 Redwood Blvd. Long Beach CA 90314", 
 	     "phones" : [{"number" : "(204)740-9000", "type": "work"}, {"number": "(204)230-1127", "type": "mobile"}], 
 	      "email" : "jpinkman@rocketmail.com", "company" : "Hollywood West Novelties", "position" : "Distribution Manager" 
    },
    { "contactid" : 506, "name" : "Alicia Grey",  "address" : "415 Poplar Ct. St. Louis MO 72210", 
 	     "phones" : [{"number" : "(211)870-6780", "type": "home"}], 
 	      "email" : "algrey@blanksystems.com", "company" : "Blank Systems Inc.", "position" : "Lead Technical Engineer" 
    },
    { "contactid" : 507, "name" : "Violet Waters",  "address" : "821 Ash Way Seattle WA 92230", 
 	     "phones" : [{"number" : "(302)390-1181", "type": "home"}, {"number": "(302)822-2235", "type": "work"}, {"number": "(302)451-8862", "type": "mobile"}], 
 	      "email" : "waters@medcare.com", "company" : "Home Medical Services", "position" : "Regional Account Representative" 
    },
    { "contactid" : 508, "name" : "Sandy White",  "address" : "906 Hickory Rd. Phoenix, AZ 83010", 
	     "phones" : [{"number" : "(213)221-4143", "type": "home"}], 
	      "email" : "swhite@bricks.com", "company" : "Bricks and More", "position" : "Product Sales" 
    },
    { "contactid" : 509, "name" : "Kay Black",  "address" : "1241 Maple Pl. Plano TX 72110", 
	     "phones" : [{"number" : "(401)322-8728", "type": "home"}, {"number": "(401)416-9081", "type": "work"}, {"number": "(401)338-0807", "type": "fax"}, {"number": "(401)527-0888", "type": "mobile"}], 
	      "email" : "ksb2101@yahoo.com", "company" : "Certified Signing Authorities", "position" : "Graphics Artist" 
    },

]};
    

exports.contacts = contacts;