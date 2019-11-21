

function getUserFirstname(user_id, callback){
  var xhttp = new XMLHttpRequest();
  var id_val = user_id;
  xhttp.open("GET", "/getUserFirstname", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //alert(xhttp.responseText);
      var arr = xhttp.responseText;
      

      if (arr.length > 0) {
          callback(null, arr);  
      }
    }
  }

  var data = {user_id: id_val};
  
  xhttp.send(JSON.stringify(data));
  
  

}