

function getUserFirstname(user_id, callback){
  var xhttp = new XMLHttpRequest();
  var id_val = user_id;
  console.log(id_val);
  xhttp.open("GET", "/getUserFirstname", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = JSON.parse(xhttp.responseText);
      callback(null, arr);  
      
    }
  }

  var data = {user_id: id_val};
  
  
  xhttp.send(JSON.stringify(data));
  
  

}
