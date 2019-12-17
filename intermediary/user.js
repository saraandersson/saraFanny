

function getUserFirstname(user_id, callback){
  var xhttp = new XMLHttpRequest();
  var id_val = user_id;
  console.log(id_val);
  xhttp.open("POST", "/getUserFirstname", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr);  
      
    }
  }

  var data = {id: id_val};
  

  xhttp.send(JSON.stringify(data));

}

function checkLogin(email, password){
  var xhttp = new XMLHttpRequest();
  var email_val = email;
  var password_val = password;
  xhttp.open("POST", "/loginUser", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);
      if (arr.length > 0){
        window.location.replace("/index");
      }else{

        document.getElementById("errorMsg").innerHTML += '<br>Wrong email or password!';

      }
      
    }
  }


  var data = {email: email_val, password: password_val};


  xhttp.send(JSON.stringify(data));
}


function createUser(firstname, lastname, email, password, img, area, consumption){
  var xhttp = new XMLHttpRequest();
  var firstname_val = firstname;
  var lastname_val = lastname;
  var email_val = email;
  var password_val = password;
  var img_val = img;
  var area_val = area;
  var consumption_val = consumption;
  xhttp.open("POST", "/createUser", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);

      if (arr.length == 0){
         window.location.replace("/login");
      }else{
        document.getElementById("errorMsg").innerHTML += '<br>Email already exist!';
        //Felmeddelande: E-mail upptaget. 
      }
      
    }
  }


  var data = {firstname: firstname_val, lastname: lastname_val, email: email_val, password: password_val, img: img_val,area: area_val, consumption: consumption_val};
  
  xhttp.send(JSON.stringify(data));
}


function logOut(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/logout", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        window.location.replace("/index");
    }
  }

  var data = {};

  

  xhttp.send(JSON.stringify(data));
}


function getUserEnergyValues(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getEnergy", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
  }
}
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}


function editProfile(firstname, lastname, area, consumption, img){
  var xhttp = new XMLHttpRequest();
  var firstname_val = firstname;
  var lastname_val = lastname;
  var img_val = img;
  var area_val = area;
  var consumption_val = consumption;
  xhttp.open("POST", "/updateProfile", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        window.location.replace("/profile");

    }
  }

   var data = {firstname: firstname_val,lastname: lastname_val,img: img_val, area: area_val,consumption: consumption_val};

  xhttp.send(JSON.stringify(data));

}

function editProfileAdmin(firstname, lastname, img){
  var xhttp = new XMLHttpRequest();
  var firstname_val = firstname;
  var lastname_val = lastname;
  var img_val = img;
  xhttp.open("POST", "/updateProfileAdmin", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        window.location.replace("/profile");

    }
  }

   var data = {firstname: firstname_val, lastname: lastname_val, img: img_val};

  xhttp.send(JSON.stringify(data));

}

function getUser(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getUser", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
  }
}
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}


function changePassword(old_password, new_password){
  var xhttp = new XMLHttpRequest();
  var old_password_val = old_password;
  var new_password_val = new_password;
  xhttp.open("POST", "/changePassword", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       var arr = JSON.parse(xhttp.responseText);

      if (arr.length > 0){
         window.location.replace("/profile");
      }else{
        document.getElementById("errorMsg").innerHTML += '<br>Wrong password!';
        
      }

      //IF success
        
      //Else error message

    }
  }

   var data = {old_password: old_password_val, new_password: new_password_val};

  xhttp.send(JSON.stringify(data));

}

/*Ska hämta värden från databasen gällande en prosumers sell/buy värden */
function getUserSellBuy(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getUserSellBuy", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
  }
}
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}

/*Om prosumern har ändrat sin sell ändras denna*/
function updateUserProductionExcess(sell){
  var xhttp = new XMLHttpRequest();
  var sell_val = sell;
  xhttp.open("POST", "/updateUserProductionExcess", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //IF success
        //window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {sell: sell_val};

  xhttp.send(JSON.stringify(data));

}

/*Om prosumern har ändrat sin buy så uppdateras detta*/
function updateUserProductionDeficit(buy){
  var xhttp = new XMLHttpRequest();
  var buy_val = buy;
  xhttp.open("POST", "/updateUserProductionDeficit", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //IF success
        //window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {buy: buy_val};

  xhttp.send(JSON.stringify(data));

}



function blockUser(id, time){
  var xhttp = new XMLHttpRequest();
  var id_val = id;
  var time_val = time;
  xhttp.open("POST", "/blockUser", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //IF success
        //window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {id: id_val, time: time_val};

  xhttp.send(JSON.stringify(data));

}

function unblockUser(id, time){
  var xhttp = new XMLHttpRequest();
  var id_val = id;
  var time_val = time;
  xhttp.open("POST", "/unblockUser", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //IF success
        //window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {id: id_val, time: time_val};

  xhttp.send(JSON.stringify(data));

}

function deleteUser(id, callback){
  var xhttp = new XMLHttpRequest();
  var id_val = id;
  xhttp.open("POST", "/deleteUser", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var arr = JSON.parse(xhttp.responseText);
       callback(null, arr); 
    

    }
  }

   var data = {id: id_val};

  xhttp.send(JSON.stringify(data));

}


function deleteUserProsumer(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/deleteUserProsumer", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       window.location.replace("/index");
    

    }
  }

   var data = {};

  xhttp.send(JSON.stringify(data));

}

function getAllProsumers(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getAllProsumers", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
  }
}
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}

function getMarket(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getMarket", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
    }
  }
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}

function getUserProduction(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getUserProduction", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
    }
  }
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}

function getAllUserProduction(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getAllUserProduction", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
    }
  }
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}

function getMarketDemand(old_amount, callback){
  var old_amount_val = old_amount;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getMarketDemand", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
    }
  }
    var data = {oldAmount: old_amount_val};
  
    xhttp.send(JSON.stringify(data));
}

function updateMarketPrice(price){
  var price_val = price;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/updateMarketPrice", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           

      
      
    }
  }
    var data = {price: price_val};
  
    xhttp.send(JSON.stringify(data));
}


/*Get values from simulator*/
function fetchWindData(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getProductionInfo", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      
  }
}
    var data = {};
  
    xhttp.send(JSON.stringify(data));
}

function createCoalSimulator(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/createCoalSimulator", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
    }
  }

  var data = {};

  

  xhttp.send(JSON.stringify(data));
}

function getCoalSimulators(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getCoalSimulators", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      }
    }
    var data = {};
    xhttp.send(JSON.stringify(data));
}

function startCoalSimulator(production, coal_id, time){
  var production_val = production;
  var coal_id_val = coal_id;
  var time_val = time; 
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/startCoalSimulator", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

     // var arr = JSON.parse(xhttp.responseText);
      //callback(null, arr); 
    }
  }
  var data = {production: production_val, coal_id: coal_id_val, time: time_val};
  xhttp.send(JSON.stringify(data));

}

function stopCoalProduction(coal_id){
  var coal_id_val=coal_id;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/stopCoalProduction", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      }
    }
    var data = {coal_id:coal_id_val};
    xhttp.send(JSON.stringify(data));
}

function getCoalProduction(coal_id, callback){
  var coal_id_val=coal_id;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getCoalProduction", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);

      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr); 
      }
    }
    var data = {coal_id:coal_id_val};
    xhttp.send(JSON.stringify(data));
}

function updateAdminProduction(market,buffert){
  var xhttp = new XMLHttpRequest();
  var market_val = market;
  var buffert_val = buffert;
  xhttp.open("POST", "/updateAdminProduction", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //IF success
        //window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {market: market_val, buffert:buffert_val};

  xhttp.send(JSON.stringify(data));
}

function sendToMarket(value, callback){
  var value_val = value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/sendToMarket", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var arr = JSON.parse(xhttp.responseText);

    

      callback(err,arr);
           

      
      
    }
  }
    var data = {value: value_val};
  
    xhttp.send(JSON.stringify(data));
}






/*
if(result[0].buffert == 0){
        document.getElementById("errorMsg").innerHTML = '<br> You don´t have that much in your buffert.';
        document.getElementById("okMsg").innerHTML = '';
      }else{
          document.getElementById("errorMsg").innerHTML = '';
        document.getElementById("okMsg").innerHTML = '<br> Sent to market.';
      }
*/