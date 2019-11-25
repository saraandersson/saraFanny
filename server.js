// server.js

var express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var Sim = require('./simulator.js');
var app = express();
var PORT = 3000;

var cookieParser = require('cookie-parser');
var session = require('express-session');



app.use('/website',express.static('website'));
app.use('/intermediary',express.static('intermediary'));

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_id',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_id && !req.session.Users) {
        res.clearCookie('user_id');        
    }
    next();
});

app.route('/')
    .get((req,res)=>{
       if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
            res.redirect('website/index.html');
        }
        else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
            res.redirect('/website/index.html');
          } 
        else {
             res.redirect('/website/index.html');
          }
        });

        

var server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello world\n");
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
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

app.post('/createUser', function(req,res){

  db_user.emailAvailable(req.body.username,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          if(result.rowCount == "0"){
            db_user.addUser(0, 1 , req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.img, req.body.area, 0, req.body.consumption);
            res.send('{"text": "Användare skapad."}');
          }else{
            res.send('{"text": "Användarnamnet är upptaget."}');
          }
        }
    })

  });

app.post('/loginUser',function(req,res){
      db_user.checkLogin(req.body.email,req.body.password,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          console.log("SIZE:" + result.size);
          if(result.size > 0 && (result.rows[0].role_id == 0||result.rows[0].role_id == 1)){
            req.session.role_id = result.rows[0].role_id;
            req.session.Users = result.rows[0].id; 
            console.log(result);
            send_(err, result, res);
          }else{
            console.log(result);
            send_(err, result, res);
          }
        }
      })

  });


app.post('/getUserFirstname', function(req,res){
        console.log(req.body.id);
     db_user.selectUser(req.body.id,(err,result) =>{
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
