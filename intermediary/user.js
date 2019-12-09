

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
        window.location.replace("../");
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
        window.location.replace("../");
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

   var data = {firstname: firstname_val,lastname: lastname_val, img: img_val};

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

      //IF success
        window.location.replace("/profile");
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

function getAdmin(){
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

/*Get values from simulator*/
function fetchWindData(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/callSimulator", true);
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





