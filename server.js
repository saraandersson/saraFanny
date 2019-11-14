// server.js

var express = require('express');
var http = require('http');
var Sim = require('./simulator.js');
var app = express();
var PORT = 3000;

app.use('/website',express.static('website'));
app.route('/')
    .get((req,res)=>{
        res.redirect('website/index.html');
        });


var server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello world\n");
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});


/*
app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});
*/

//const Db_user = require('./db/db_users.js');

//const db_user = new Db_user();

//Send kw/day for X m^2
const sim = new Sim(36,300);

/*app.get('/', function(req, res) {
	db_user.addUser(300,20);

	var test = db_user.selectUser(16, (err, db_user) => {
                    //send_(err, db_user, res)
                    if(db_user.rowCount > 0){
                    	var getArea = db_user.rows[0].area;
                    	console.log(getArea);
                    }else{
                    	console.log("Dont exist");
                    }
                    
                });

	db_user.deleteUser(16);

   res.status(200).send("KLAR");
});*/



