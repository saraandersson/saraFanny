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


/*

const{Pool,Client} = require('pg')
const connectionString = 'postgres://fannysara:fannysara@localhost:5432/fannySara'

const client = new Client({
	connectionString:connectionString
})*/

//client.connect()

class Db_user{

	constructor(){

	}
	addUser(role_id, online, firstname, lastname, email, password, img, area, buffert, consumption){
		var addSql = `INSERT INTO users (role_id, online, firstname, lastname, email, password, img, area, buffert, consumption) VALUES (?,?,?,?,?,?,?,?,?,?)`;
		//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
		con.query(addSql,[role_id, online, firstname, lastname, email, password, img, area, buffert, consumption ] , function(err, result){
			if(err){
				throw err;
			}else{
				console.log("User is added");
			}
		});
	}

	getUser(id, callback){
		var getSql = `SELECT * FROM users WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("User is fetched");
				callback(err, result);
			}
		});
	}


	deleteUser(id){
		var deleteSql = `DELETE FROM users WHERE id = ?`;
		con.query(deleteSql,[id], function(err, result){
			if(err){
				throw err;
			}else{
				console.log("User is deleted");
			}
		});
	}

	checkLogin(email, password, callback){
		var checksql = `SELECT * FROM users WHERE email = ? AND password = ?`;
		con.query(checksql, [email,password], function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("Från databas: " + result);
				callback(err, result);
			}
		});
	}

	emailAvailable(email, callback){
		var checksql = `SELECT * FROM users WHERE email = ?`;
		con.query(checksql, [email], function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("Email is checked");
				callback(err, result);
			}
		});
	}

	setOnline(id, online){
		var setsql=`UPDATE users SET online = ? WHERE id = ?`;
		con.query(setsql, [online, id], function(err, result){
				if(err){
				}else{
					console.log("Set online/offline");
				}
			});

		}

	updateProfile(id,firstname,lastname, area, consumption, img){
		var setsql=`UPDATE users SET firstname = ?, lastname = ?, area = ?, consumption = ?, img = ? WHERE id = ?`;
		con.query(setsql, [firstname, lastname, area, consumption, img, id], function(err, result){
				if(err){
				}else{
					console.log("Profile updated");
				}
			});
	}


}

module.exports = Db_user;