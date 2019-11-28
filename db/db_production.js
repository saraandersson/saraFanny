var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "sarafanny",
  database: "sarafanny"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


class Db_production{

	constructor(){

	}

updateWind(user_id, wind, production){
	var addSql = `INSERT INTO wind (users_id, wind, production) VALUES (?,?,?)`;
	//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
	con.query(addSql,[user_id, wind, production] , function(err, result){
		if(err){
			throw err;
		}else{
			console.log("Wind table is added");
		}
	});


}

}

module.exports = Db_production;