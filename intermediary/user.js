

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
      window.alert(arr.length);

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
      window.alert(arr);

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


function getUserEnergyValues(id){
  var xhttp = new XMLHttpRequest();
  var id_val = id;
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


  var data = {id: id_val};
  
  xhttp.send(JSON.stringify(data));

}