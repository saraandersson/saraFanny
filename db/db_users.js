var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "sarafanny"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


/*

const{Pool,Client} = require('pg')
const connectionString = 'postgres://fannysara:fannysara@localhost:5432/fannySara'

const client = new Client({
	connectionString:connectionString
})*/

//client.connect()

class Db_user{

	consturctor(){

	}
	addUser(role_id, online, firstname, lastname, email, password, img, area, buffert, consumption){
		var addSql = `INSERT INTO users (role_id, online, firstname, lastname, email, password, img, area, buffert, consumption) VALUES (${role_id},${online},${firstname},${lastname}, ${email}, ${password},${img}, ${area},${buffert}, ${consumption})`;
		con.query(addSql, function(err, result){
			if(err){
				throw err;
			}else{
				console.log("User is added");
			}
		});
	}

	selectUser(id, callback){
		var getSql = `SELECT * FROM users WHERE id = ${id}`;
		con.query(getSql, function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("User is fetched");
				callback(err, result);
			}
		});
	}


	deleteUser(id){
		var deleteSql = `DELETE FROM users WHERE id = ${id}`;
		con.query(deleteSql, function(err, result){
			if(err){
				throw err;
			}else{
				console.log("User is deleted");
			}
		});
	}


}

module.exports = Db_user;