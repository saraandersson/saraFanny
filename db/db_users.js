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

	changePassword(id, password){
		var setsql=`UPDATE users SET password = ? WHERE id = ?`;
		con.query(setsql, [password, id], function(err, result){
				if(err){
				}else{
					console.log("Lösenord ändrat");
				}
			});
	}

	getEnergy(id, callback){
		var getSql = `SELECT * FROM production WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("User is fetched");
				callback(err, result);
			}
		});
	}

getAllProsumers(callback){
	var getSql = `SELECT users.id, users.firstname, users.lastname, users.email, users.onlie, blocked.blocked FROM users JOIN blocked ON users.id = blocked.users_id`;
	con.query(getSql, [] , function(err, result){
		if(err){
			callback(err, null);
		}else{
			console.log("Users is fetched");
			callback(err, result);
		}
	});
}



addBlocked(user_id, blocked, time){
	var addSql = `INSERT INTO blocked (user_id, blocked, time) VALUES (?,?,?)`;
	//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
	con.query(addSql,[user_id, blocked, time] , function(err, result){
		if(err){
			throw err;
		}else{
			console.log("Blocked table is added");
		}
	});
}

getBlocked(callback){
	var getSql = `SELECT * FROM blocked`;
	con.query(getSql, [] , function(err, result){
		if(err){
			callback(err, null);
		}else{
			console.log("Blocked is fetched");
			callback(err, result);
		}
	});
}







}

module.exports = Db_user;