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

const multer = require('multer');



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

app.route('/index')
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



app.route('/login')
    .get((req,res)=>{
      if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
        res.redirect('website/index_customer.html');
      }else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
        res.redirect('website/index_admin.html');
      }else{
        res.redirect('website/login.html');
      }
        });
      

  app.route('/signUp')
  .get((req,res)=>{
      if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
        res.redirect('website/index_customer.html');
      }else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
        res.redirect('website/index_admin.html');
      }else{
        res.redirect('website/signUp.html');
      }
      });


  app.route('/profile')
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



  app.route('/edit_profile')
  .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/edit_profile.html');
      }

      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/edit_profile_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });


    app.route('/production_settings')
    .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/production_settings_customer.html');
      }

      //ÄNDRA HÄR
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/production_settings_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });

    app.route('/market')
    .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('website/market_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/market_admin.html');
        } 
      else {
           res.redirect('/website/market.html');
        }
      });

    app.route('/prosumers_admin')
    .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('/website/index_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/prosumers_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });

    
      

    app.route('/change_password')
    .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('/website/change_password.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/change_password_admin.html');
        } 
      else {
           res.redirect('/website/index.html');
        }
      });




    app.route('/*')
    .get((req,res)=>{
     if (req.session.Users && req.cookies.user_id && req.session.role_id == 0) {
          res.redirect('/website/index_customer.html');
      }
      else if(req.session.Users && req.cookies.user_id && req.session.role_id == 1){
          res.redirect('/website/index_admin.html');
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






const Db_user = require('./db/db_users.js');

const db_user = new Db_user();


/*app.post('/createUser', function(req,res){

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

  })*/


/*Run the simulator and decide price*/

setPrice();

setInterval(setPrice, 10000);

function setPrice(){
  var idarr = [];
  db_user.getAllProsumers((err,result) =>{

    for(var i = 0; i < result.length; i++){
      if(result[i].role_id == 0){

        idarr.push(result[i].id);
        
      }
    }

    var price = 0;
    var number = 0;

    

    for(var j = 0; j < idarr.length; j ++){

      //Dessa behövs då den glömmer bort värden efter simulatorCall

      var temp_length = idarr.length;

      simulatorCall(idarr[j], j, function(arr_num){
        
          if(arr_num == (temp_length - 1)){
              db_user.getProsumersProductionSimPrice((err, res) =>{
                  for(var k = 0; k < temp_length; k++){
                     price = price + res[k].sim_price;
                     number ++; 
                  }
                  price = price / number;
                  //console.log("Sim priset blir: " + price);
                  db_user.updateMarketPriceSim(price);
                });
              
          }
      });
    }

  });

}

async function simulatorCall(id, number,  fn){

  db_user.getUser(id,(err,result) =>{
          sim.getTotalProductionPerDay(result[0].consumption, result[0].area, (results)=>{

          

          //Update user production result
          
          db_user.updateUserProduction(id, results[1], results[2], results[0], results[4]);

          

          /*Surplus/Excess*/
          if(results[2] > 0){
            //Set has_power = 1
            db_user.setHasPower(id, 1);
            //Check if blocked, cant sell to market, only add to buffert
              if(result[0].blocked == 1){
              db_user.updateBuffert(id, results[2]);
              fn(number);

              }else{
                db_user.getSellBuy(id, (e,r)=>{
              
                  //Set in to buffert and sell to market.
                  var value_buffert = results[2] * (1.00 - r[0].sell);
                  var value_market = results[2] * r[0].sell;
                  db_user.updateBuffert(id, value_buffert);
               
                  db_user.updateMarket(value_market);
                  fn(number);
                  
              }); 
              }
              

          /*Loss/Deficit*/
          }else{
          
            db_user.getSellBuy(id, (e,r)=>{

            //Take from buffert and buy from market. 
            var value_buffert = results[2] * (1.00 -r[0].buy);
            var value_market = results[2] * r[0].buy;
            var remaining = 0;


            //Checks if its enough in the buffert

              var temp2 = result[0].buffert + value_buffert;
              console.log(temp2);

            if((result[0].buffert + value_buffert) > 0){
              db_user.updateBuffert(id, value_buffert);
            }else{ 
            //If not, save the amount thats remaining in the var "remaining"
              remaining = result[0].buffert + value_buffert;
              value_buffert = -(result[0].buffert);
              //Buffert is now 0
              db_user.updateBuffert(id, value_buffert);
            }

            db_user.getMarket((er,re)=>{
                //Checks if its enough on the market
                var temp = re[0].amount + value_market + remaining;
                console.log(temp);

                if((re[0].amount + value_market + remaining) > 0){
                  console.log("går in i if");

                  value_market += remaining;
                   db_user.updateMarket(value_market);
                   //Set has_power = 1
                   db_user.setHasPower(id, 1);
                }else{
                  console.log("går in i else");
                  //If not, the user has not enough power
                  var updatemarket = -(re[0].amount);
                  //Market is now 0
                  db_user.updateMarket(updatemarket);
                  //Set has_power = 0
                  db_user.setHasPower(id, 0);
                }

                fn(number);

            });
            
         
          
            

          });
          }
          
        });
    });

}
/*To store pictures on server*/

const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, 'public/uploads/')
        },
        filename: function(req,file,cb){
            cb(null,file.originalname) 
        }
    });

const upload = multer({
    storage: storage
}).single('myImage');


app.post('/createUser', function(req,res){

  db_user.emailAvailable(req.body.email,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          if(result.length == 0){
            console.log("Kommer till OK");
            console.log(req.body.file);
              db_user.addUser(0, 1 , req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.file.originalname, req.body.area, 0, req.body.consumption);
              upload(req,res,function(err){
                if(err){
                  console.log(err);
                    }
                else{
                  console.log("Image saved!");
               }
              });
              db_user.getUserId(req.body.email, req.body.password, (error, results) =>{
              db_user.addBlocked(results[0].id, 0, 0);
              db_user.addSellBuy(results[0].id, 0.5 , 0.5);
              db_user.addUserProduction(results[0].id);
            });
            
            send_(err, result, res);
          }else{
            console.log("Kommer till FAIL");
            send_(err, result, res);
          }
        }
    })

  });

/*app.post('/loginUser',function(req,res){
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

  });*/

app.post('/loginUser',function(req,res){
      db_user.checkLogin(req.body.email,req.body.password,(err,result) =>{
        if(err){
          console.error(err);
        }else{
          
          if(result.length > 0 ){
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

  });



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

app.post('/updateProfileAdmin', (req, res) => {
    db_user.updateProfileAdmin(req.session.Users, req.body.firstname, req.body.lastname, req.body.img);
    res.send("{}");
});



app.post('/getUser', function(req,res){
     db_user.getUser(req.session.Users,(err,result) =>{
      console.log(result);
        send_(err, result, res);
    });
  });


app.post('/changePassword', (req, res) => {
  db_user.checkPassword(req.session.Users, req.body.old_password,(err,result) =>{
    if(result.length > 0){ //Checks if the password is correct
        console.log(result[0].password);
        db_user.changePassword(req.session.Users, req.body.new_password); //Change password
        send_(err, result, res);
    }else{
        send_(err, result, res);
    }
    });
  
});

/*app.post('/changePassword', (req, res) => {
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
  
});*/

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

app.post('/getUserSellBuy', function(req,res){
     db_user.getSellBuy(req.session.Users, (err, result) =>{
        send_(err, result, res);
     });
  });

app.post('/updateUserProductionExcess', function(req,res){
   console.log("HIT : "  + req.body.sell);
     db_user.updateSell(req.session.Users, req.body.sell);
  });

app.post('/updateUserProductionDeficit', function(req,res){
      console.log("HIT : "  + req.body.buy);
     db_user.updateBuy(req.session.Users, req.body.buy);
  });

app.post('/getMarket', function(req,res){
     db_user.getMarket((err,result) =>{
        send_(err, result, res);
    });
  });


/*Get the production for the active user*/

app.post('/getUserProduction', function(req,res){
     db_user.getUserProduction(req.session.Users, (err,result) =>{
        send_(err, result, res);
    });
  });

/*Get the production for all users*/

app.post('/getAllUserProduction', function(req,res){
     db_user.getAllUserProduction((err,result) =>{
        send_(err, result, res);
    });
  });

app.post('/blockUser', function(req,res){
     db_user.blockUser(req.body.id, 1, req.body.time);
     /*Unblock after a certain time*/
     setTimeout(function(){
      db_user.blockUser(req.body.id, 0, req.body.time);
    }, req.body.time*1000);
  });

app.post('/unblockUser', function(req,res){
     db_user.blockUser(req.body.id, 0, 0);
  });

//Admin uses this function

app.post('/deleteUser', function(req,res){
     db_user.deleteUser(req.body.id,(err,result)=>{
      res.send("{}");
    });
  });

//Prosumer uses this function

app.post('/deleteUserProsumer', function(req,res){
     db_user.deleteUser(req.session.Users,(err,result)=>{
       if (req.session.Users && req.cookies.user_id) {
        res.clearCookie('user_id');
        res.send("{}");
    } else {
      res.send("{}");
    }
    });
  });

app.post('/updateMarketPrice', function(req,res){
     db_user.updateMarketPrice(req.body.price,(err,result)=>{
      res.send("{}");
    });
  });

app.post('/sendToMarket', function(req,res){

  //TEMP ID, ska försöka fixa

      console.log(req.session.Users);

      db_user.getBuffert(req.session.Users, (err, result)=>{
        if(result[0].buffert > req.body.value){

          db_user.updateMarket(req.body.value);
          buffert_value = -(req.body.value);
          db_user.updateBuffert(req.session.Users, buffert_value);

          var sendArr = [1];

          send_(err, sendArr, res);


        }else{

          var sendArr = [0];

          send_(err, sendArr, res);

        }
      });
    
  });




/*I called every 10 second*/

//DENNA SKA ÄNDRAS TILL ATT ENDAST HÄMTA NY DATA
app.post('/getProductionInfo', function(req,res){
    db_user.getProductionInfo(req.session.Users,(err,result) =>{
      send_(err, result, res);
    });
});


/*

app.post('/callSimulator', function(req,res){
          db_user.getUser(req.session.Users,(err,result) =>{
          sim.getTotalProductionPerDay(result[0].consumption, result[0].area, (results)=>{



          //Update user production result
          db_user.updateUserProduction(req.session.Users, results[1], results[2]);
          //Surplus/Excess
          if(results[2] > 0){
            //Check if blocked, cant sell to market, only add to buffert
              if(result[0].blocked == 1){
              db_user.updateBuffert(req.session.Users, results[2]);
              db_user.getUser(req.session.Users,(errbuffert ,buffert) =>{
                  //Add buffert in results array
                  results.push(buffert[0].buffert);
                  send_(err, results, res);
                }); 

              }else{
                db_user.getSellBuy(req.session.Users, (e,r)=>{
              
              //Set in to buffert and sell to market.
              var value_buffert = results[2] * (1.00 - r[0].sell);
              var value_market = results[2] * r[0].sell;
              db_user.updateBuffert(req.session.Users, value_buffert);
              db_user.updateMarket(value_market);
              db_user.getUser(req.session.Users,(errbuffert ,buffert) =>{
                //Add buffert in results array
                  results.push(buffert[0].buffert);
                  send_(err, results, res);
                });
              }); 
              }
              

          //Loss/Deficit
          }else{
          
            db_user.getSellBuy(req.session.Users, (e,r)=>{

            //Take from buffert and buy from market. 
            var value_buffert = results[2] * (1.00 -r[0].buy);
            var value_market = results[2] * r[0].buy;
            db_user.updateBuffert(req.session.Users, value_buffert);
            db_user.updateMarket(value_market);

             db_user.getUser(req.session.Users,(errbuffert ,buffert) =>{
              //Add buffert in results array
                  results.push(buffert[0].buffert);
                  send_(err, results, res);
              });


          });
          }
          
        });
    });
        
  }); 

*/


app.post('/getMarketDemand', function(req,res){
          db_user.getMarket((err,result)=>{
            //If - people have been buying more, if + people have been selling more
            var marketDemand = result[0].amount - req.body.oldAmount;


            console.log("IS CALLED: OLD: " + req.body.oldAmount + " NEW: " + result[0].amount);
            var procent = (result[0].amount/req.body.oldAmount - 1.00);
        
            //Arr = current market, market demand, procent
            var arr = [result[0].amount, marketDemand, procent, result[0].price_sim, result[0].price];
            send_(err, arr, res);
          });
        
  });

/*Funktioner för manager att kontrollera kolsimulatorn*/

app.post('/createCoalSimulator', function(req,res){
    db_user.createCoalSimulator(req.session.Users,(err,result) =>{
      send_(err, result, res);
    });
});

app.post('/getCoalSimulators', function(req,res){
    db_user.getCoalSimulators(req.session.Users,(err,result) =>{
      send_(err, result, res);
    });
});

app.post('/startCoalSimulator', function(req,res){
    db_user.startCoalSimulator(req.body.coal_id,1)

    setTimeout(function(){
      db_user.getCoalSimulator(req.body.coal_id,(err,result)=>{
        /*kanske bättre lösning med clearInterval men blev problem med vilket intervall som skulle
        försvinna*/
        if(result[0].status==1){
          db_user.startCoalSimulator(req.body.coal_id,2);
          db_user.startCoalProduction(req.body.coal_id, req.body.time, req.body.production);
          setTimeout(function(){  
          db_user.getCoalSimulator(req.body.coal_id,(err,results)=>{
            if(results[0].status==2){
              //stops the production
            db_user.stopCoalProduction(0,req.body.coal_id);
            db_user.stopCoalSimulator(req.body.coal_id,0);
      //Updates admin buffert and the market
            db_user.getSellBuy(req.session.Users,(err,result1)=>{
            var marketValue = req.body.production*result1[0].sell;
            var buffertValue = req.body.production*result1[0].buy;
            db_user.updateMarket(marketValue);
            db_user.updateBuffert(req.session.Users,buffertValue);
              });
            }
          });  

    },req.body.time*1000)
        }
      });
      
    },30*1000)
});

/*app.post('/startCoalProduction', function(req,res){
    db_user.startCoalProduction(req.body.coal_id, req.body.time, req.body.production);

    setTimeout(function(){
      //stops the production
      db_user.stopCoalProduction(req.body.coal_id);

    },req.body.time*1000)
});*/


app.post('/stopCoalProduction', function(req,res){
    db_user.stopCoalProduction(req.body.coal_id, req.body.time, req.body.production);
    db_user.stopCoalSimulator(req.body.coal_id,0);
});

app.post('/getCoalProduction', function(req,res){
    db_user.getCoalProduction(req.body.coal_id,1,(err,result) =>{
      send_(err, result, res);
    });
});

app.post('/updateAdminProduction', function(req,res){
    db_user.updateAdminProduction(req.body.market ,req.body.buffert,req.session.Users);

});


function send_(err, data, res) {
    if (err) {
      console.error(err.stack);
      res.sendStatus(400);
    } else {
      res.send(data);
    }
  }
