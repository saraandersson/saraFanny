

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
        //Konto har skapats.
        window.location.replace("../");
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

/*Lägga till ändra lösenord? Kanske separat?*/
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
        window.location.replace("../website/profile_customer.html");

    }
  }

   var data = {firstname: firstname_val,lastname: lastname_val,img: img_val, area: area_val,consumption: consumption_val};

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
        window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {old_password: old_password_val, new_password: new_password_val};

  xhttp.send(JSON.stringify(data));

}

/*Ska hämta värden från databasen gällande en prosumers buffert */
function getProduction(callback){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/getProduction", true);
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

/*Om prosumern har ändrat sin buffert/market procent så uppdateras detta*/
function updateUserProduction(buffert, market){
  var xhttp = new XMLHttpRequest();
  var buffert_val = buffert;
  var market_val = market;
  xhttp.open("POST", "/updateUserProduction", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //IF success
        //window.location.replace("../website/profile_customer.html");
      //Else error message

    }
  }

   var data = {buffert: buffert_val, market: market_val};

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

function getAllProsumers(){
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


