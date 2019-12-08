// server.js
var express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var Sim = require('./simulator.js');
var app = express();
var PORT = 3000;

var cookieParser = require('cookie-parser');
var session = require('express-session');
const bcrypt = require('bcrypt');
let saltRounds = 10; 



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

const sim = new Sim();

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
            res.redirect('website/index_customer.html');
        }
        else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
            res.redirect('/website/index_admin.html');
          } 
        else {
             res.redirect('/website/index.html');
          }
        });

//Dessa funkar inte om man ändrar i webbadressen, men via länkar funkar detta

app.route('/index.html')
    .get((req,res)=>{
       if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
            res.redirect('website/index_customer.html');
        }
        else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
            res.redirect('/website/index_admin.html');
          } 
        else {
             res.redirect('/website/index.html');
          }
        });

  app.route('/index_customer.html')
  .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/index_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/index_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });

  app.route('/index_admin.html')
  .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/index_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/index_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });

  app.route('/profile_customer.html')
  .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/profile_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/profile_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });

  app.route('/profile_admin.html')
  .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/profile_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/profile_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });


    app.route('/edit_profile.html')
  .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/edit_profile.html');
      }

      //ÄNDRA HÄR
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/edit_profile.html');
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
      if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
        res.redirect('website/index_customer.html');
      }else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
        res.redirect('website/index_admin.html');
      }else{
        res.redirect('website/login.html');
      }
        });
      

  app.route('/signUp.html')
  .get((req,res)=>{
      if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
        res.redirect('website/index_customer.html');
      }else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
        res.redirect('website/index_admin.html');
      }else{
        res.redirect('website/signUp.html');
      }
      });

app.route('/market.html')
    .get((req,res)=>{
        if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/market_customer.html');
        }else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('website/market_admin.html');
        }else{
          res.redirect('website/market.html');
        }
        });


const Db_user = require('./db/db_users.js');

const db_user = new Db_user();


app.post('/createUser', function(req,res){

  db_user.emailAvailable(req.body.username,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          if(result.length == 0){
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
              if(err){
                console.log(err);
              }
              console.log("Hashed password: "+ hash);
              //const password = hash; 
              db_user.addUser(0, 1 , req.body.firstname, req.body.lastname, req.body.email, hash, "hejsan", req.body.area, 0, req.body.consumption);
              db_user.getUserId(req.body.email, hash, (error, results) =>{
              req.session.role_id = 0;
              req.session.Users = results[0].id; 
              db_user.setOnline(req.session.Users, 1);
              db_user.addBlocked(req.session.Users, 0, 0);
              db_user.addSellBuy(req.session.Users, 0.5 , 0.5);
            });
            
            send_(err, result, res);
            });

          }else{
            send_(err, result, res);
          }
        }
    })

  })

/*app.post('/createUser', function(req,res){

  db_user.emailAvailable(req.body.username,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          if(result.length == 0){
            db_user.addUser(0, 1 , req.body.firstname, req.body.lastname, req.body.email, req.body.password, "hejsan", req.body.area, 0, req.body.consumption);
            db_user.getUserId(req.body.email, req.body.password, (error, results) =>{
              req.session.role_id = 0;
              req.session.Users = results[0].id; 
              db_user.setOnline(req.session.Users, 1);
              db_user.addBlocked(req.session.Users, 0, 0);
              db_user.addSellBuy(req.session.Users, 0.5 , 0.5);
            });
            
            send_(err, result, res);
          }else{
            send_(err, result, res);
          }
        }
    })

  });*/

app.post('/loginUser',function(req,res){
      db_user.getUserHashedPassword(req.body.email, (err, result1) =>{
        const hash = result1[0].password.toString();
        //console.log("PASSWORD:" + hash);
        bcrypt.compare(req.body.password, hash, function(err, response) {
            if(response==true){
              db_user.checkLogin(req.body.email,hash,(err,result) =>{
              if(err){
                console.error(err);
              }else{
                console.log("SIZE:" + result.length);
                if(result.length > 0 && (result[0].role_id == 0||result[0].role_id == 1)){
                  req.session.role_id = result[0].role_id;
                  req.session.Users = result[0].id; 
                  console.log("RESULTAT OK:" + result);
                  db_user.setOnline(result[0].id, 1);

                  send_(err, result, res); 
                }else{
                  console.log("RESULTAT EJ OK:" + result);
                  send_(err, result, res);
          }
        }
      })

            }
        });

      })

  });

/*app.post('/loginUser',function(req,res){
      db_user.checkLogin(req.body.email,req.body.password,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          console.log("SIZE:" + result.length);
          if(result.length > 0 && (result[0].role_id == 0||result[0].role_id == 1)){
            req.session.role_id = result[0].role_id;
            req.session.Users = result[0].id; 
            console.log("RESULTAT OK:" + result);
            db_user.setOnline(result[0].id, 1);

            send_(err, result, res);
          }else{
            console.log("RESULTAT EJ OK:" + result);
            send_(err, result, res);
          }
        }
      })

  });*/



app.post('/logout', (req, res) => {
    if (req.session.Users && req.cookies.user_id) {
        res.clearCookie('user_id');
        db_user.setOnline(req.session.Users, 0);
        res.send("{}");
    } else {
      res.send("{}");
    }
});

app.post('/updateProfile', (req, res) => {
    db_user.updateProfile(req.session.Users, req.body.firstname, req.body.lastname, req.body.area, req.body.consumption, req.body.img);
    res.send("{}");
});



app.post('/getUser', function(req,res){
     db_user.getUser(req.session.Users,(err,result) =>{
        send_(err, result, res);
    });
  });


/*app.post('/changePassword', (req, res) => {
  db_user.getUser(req.session.Users,(err,result) =>{
    if(req.body.old_password == result[0].password){ //Checks if the password is correct
      console.log(result[0].password);
        db_user.changePassword(req.session.Users, req.body.new_password); //Change password
        res.send("{}");
    }else{
        res.send("{}");
    }
    });
  
});*/

app.post('/changePassword', (req, res) => {
  db_user.getUser(req.session.Users,(err,result) =>{
    const hash = result[0].password.toString();
    bcrypt.compare(req.body.old_password, hash, function(err, response) {
      if(response==true){
        //if(req.body.old_password == result[0].password){ //Checks if the password is correct
          console.log(result[0].password);
          bcrypt.hash(req.body.new_password, saltRounds, function(err, hash){
            if(err){
              console.log(err);
            }
            db_user.changePassword(req.session.Users, hash); //Change password
            res.send("{}");
          });

        }
        else{
          res.send("{}");
        }

    //  }
    });

    });
  
});

app.post('/getEnergy', function(req,res){
     db_user.getEnergy(req.session.Users,(err,result) =>{
        send_(err, result, res);
    });
  });

app.post('/getAllProsumers', function(req,res){
     db_user.getAllProsumers((err,result) =>{
        send_(err, result, res);
    });
  });

app.post('/callSimulator', function(req,res){
        db_user.getUser(req.session.Users,(err,result) =>{
        sim.getTotalProductionPerDay(result[0].consumption, result[0].area, (results)=>{


          /*Surplus/Excess*/
          if(results[2] > 0){
           
              db_user.getSellBuy(req.session.Users, (e,r)=>{
              
              //Set in to buffert and sell to market.
              var value_buffert = results[2] * (1.00 - r[0].sell);
              var value_market = results[2] * r[0].sell;
              db_user.updateBuffert(req.session.Users, value_buffert);
              db_user.updateMarket(value_market);
              db_user.getUser(req.session.Users,(errbuffert ,buffert) =>{
                  results.push(buffert[0].buffert);
                  send_(err, results, res);
              });
            }); 

          /*Loss/Deficit*/
          }else{
          
            db_user.getSellBuy(req.session.Users, (e,r)=>{

            //Take from buffert and buy from market. 
            var value_buffert = results[2] * (1.00 -r[0].buy);
            var value_market = results[2] * r[0].buy;
            db_user.updateBuffert(req.session.Users, value_buffert);
            db_user.updateMarket(value_market);

             db_user.getUser(req.session.Users,(errbuffert ,buffert) =>{
                  results.push(buffert[0].buffert);
                  send_(err, results, res);
              });


          });
          }
          
        });
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
