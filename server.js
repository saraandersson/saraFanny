// server.js

var express = require('express');
var http = require('http');
var Sim = require('./simulator.js');
var app = express();
var PORT = 3000;

app.use('/website',express.static('website'));
app.use('/intermediary',express.static('intermediary'));


app.route('/')
    .get((req,res)=>{
        res.redirect('website/index.html');
        });

        


var server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello world\n");
});


app.route('/login.html')
    .get((req,res)=>{
        res.redirect('website/login.html');
        });

app.route('/market.html')
    .get((req,res)=>{
        res.redirect('website/market.html');
        });


const Db_user = require('./db/db_users.js');

const db_user = new Db_user();

//Send kw/day for X m^2
//const sim = new Sim(36,300);

/*
app.get('/', function(req, res) {
	db_user.addUser(1,1,'sarafanny','Andersson','sara@hotmail.com','hejsan','minbild',300,0,20);

	var test = db_user.selectUser(1, (err, db_user) => {
                    //send_(err, db_user, res)
                    //if(db_user.rowCount > 0){
                    	//var getArea = db_user.rows[0].area;
                    	console.log(db_user[0].firstname);
                    //}else{
                    	//console.log("Dont exist");
                    //}
                    
                });

	db_user.deleteUser(3);

   res.status(200).send("KLAR");
});
*/

app.get('/getUserFirstname', function(req,res){
        console.log(req.user_id);
     db_user.selectUser(1,(err,result) =>{
        send_(err, result, res);
    });
  });


function send_(err, data, res) {
    if (err) {
      console.error(err.stack);
      res.sendStatus(400);
    } else {
      res.send(data);
    }
  }
