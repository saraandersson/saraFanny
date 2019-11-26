

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
      window.alert(arr);

      if (arr.size > 0){
        window.location.replace("../website/index_customer.html");
      } 
      
    }
  }


  var data = {email: email_val, password: password_val};
  

  xhttp.send(JSON.stringify(data));
}


function createUser(firstname, lastname, email, password, area, consumption){
  var xhttp = new XMLHttpRequest();
  var firstname_val = firstname;
  var lastname_val = lastname;
  var email_val = email;
  var password_val = password;
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

      if (arr.size > 0){
        window.location.replace("../website/index_customer.html");
      } 
      
    }
  }


  var data = {firstname: firstname_val, lastname: lastname_val, email: email_val, password: password_val, area: area_val, consumption: consumption_val};
  

  xhttp.send(JSON.stringify(data));
}
