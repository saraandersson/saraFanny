const{Pool,Client} = require('pg')
const connectionString = 'postgres://fannysara:fannysara@localhost:5432/fannySara'

const client = new Client({
	connectionString:connectionString
})

client.connect()

class Db_user{

	consturctor(){

	}
	addUser(area, consumption){
		var addSql = `INSERT INTO users (area, consumption) VALUES (${area}, ${consumption})`;
		client.query(addSql, function(err, result){
			if(err){
				throw err;
			}else{
				console.log("User is added");
			}
		});
	}

	selectUser(id, callback){
		var getSql = `SELECT * FROM users WHERE id = ${id}`;
		client.query(getSql, function(err, result){
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
		client.query(deleteSql, function(err, result){
			if(err){
				throw err;
			}else{
				console.log("User is deleted");
			}
		});
	}


}

module.exports = Db_user;