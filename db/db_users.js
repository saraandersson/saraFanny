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


class Db_user {

	constructor(){

	}
	addUser(role_id, online, firstname, lastname, email, password, img, area, buffert, consumption){
		var addSql = `INSERT INTO users (role_id, online, firstname, lastname, email, password, img, area, buffert, consumption, has_power) VALUES (?,?,?,?,?,?,?,?,?,?, 1)`;
		//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
		con.query(addSql,[role_id, online, firstname, lastname, email, password, img, area, buffert, consumption ] , function(err, result){
			if(err){
				throw err;
			}else{
				//console.log("User is added");
			}
		});
	}



	getUser(id, callback){
		var getSql= `SELECT users.firstname, users.lastname, users.email, users.consumption, users.area, users.buffert, users.img, blocked.blocked FROM users JOIN blocked ON users.id = blocked.users_id WHERE users.id = ?`;
		//var getSql = `SELECT * FROM users WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User is fetched");
				callback(err, result);
			}
		});
	}

	getUserProduction(id, callback){
		var getSql= `SELECT users.consumption, users.area, users.buffert, user_production.latest_production, user_production.latest_wind, user_production.latest_excess FROM users JOIN user_production ON users.id = user_production.user_id WHERE users.id = ?`;
		//var getSql = `SELECT * FROM users WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User production is fetched");
				callback(err, result);
			}
		});
	}



	deleteUser(id, callback){
		var deleteSql = `DELETE FROM users WHERE id = ?`;
		con.query(deleteSql,[id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User is deleted");
				callback(err, result);
			}
		});
	}

	checkLogin(email, password, callback){
		var checksql = `SELECT * FROM users WHERE email = ? AND password = ?`;
		con.query(checksql, [email,password], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("Från databas: " + result);
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
				callback(err, result);
			}
		});
	}

	setOnline(id, online){
		var setsql=`UPDATE users SET online = ? WHERE id = ?`;
		con.query(setsql, [online, id], function(err, result){
				if(err){
				}else{
					if(online == 0){
						console.log("Set offline");
					}else{
						console.log("Set online");
					}
					
				}
			});

		}

	setHasPower(id, power){
		var setsql=`UPDATE users SET has_power = ? WHERE id = ?`;
		con.query(setsql, [power, id], function(err, result){
				if(err){
				}else{
					if(power == 0){
						console.log("Set has no power");
					}else{
						console.log("Set has power");
					}
					
				}
			});

		}

	getHasPower(id, callback){
		var getSql = `SELECT has_power FROM users WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("Has power is fetched");
				callback(err, result);
			}
		});
	}

	getBuffert(id, callback){
		var getSql = `SELECT buffert FROM users WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				console.log("Buffert is fetched");
				callback(err, result);
			}
		});
	}

	updateProfile(id,firstname,lastname, area, consumption, img){
		var setsql=`UPDATE users SET firstname = ?, lastname = ?, area = ?, consumption = ?, img = ? WHERE id = ?`;
		con.query(setsql, [firstname, lastname, area, consumption, img, id], function(err, result){
				if(err){
				}else{
					//console.log("Profile updated");
				}
			});
	}

	updateProfileAdmin(id,firstname,lastname, img){
		var setsql=`UPDATE users SET firstname = ?, lastname = ?, img = ? WHERE id = ?`;
		con.query(setsql, [firstname, lastname, img, id], function(err, result){
				if(err){
				}else{
					//console.log("Profile updated");
				}
			});
	}

	changePassword(id, password){
		var setsql=`UPDATE users SET password = ? WHERE id = ?`;
		con.query(setsql, [password, id], function(err, result){
				if(err){
				}else{
					//console.log("Lösenord ändrat");
				}
			});
	}



	getEnergy(id, callback){
		var getSql = `SELECT * FROM production WHERE id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User is fetched");
				callback(err, result);
			}
		});
	}

getAllProsumers(callback){
	var getSql = `SELECT users.id, users.firstname, users.lastname, users.email, users.online, users.has_power, users.role_id, blocked.blocked, user_production.total_production, 
	user_production.total_excess FROM users JOIN blocked ON users.id = blocked.users_id JOIN user_production ON users.id = user_production.user_id`;
	con.query(getSql, [] , function(err, result){
		if(err){
			callback(err, null);
		}else{
			//console.log("Users is fetched");
			callback(err, result);
		}
	});
}



addBlocked(user_id, blocked, time){
	var addSql = `INSERT INTO blocked (users_id, blocked, time) VALUES (?,?,?)`;
	//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
	con.query(addSql,[user_id, blocked, time] , function(err, result){
		if(err){
			throw err;
		}else{
			//console.log("Blocked table is added");
		}
	});
}

getUserId(email, password, callback){
	var getSql = `SELECT * FROM users WHERE email = ? AND password = ?`;
	con.query(getSql, [email, password] , function(err, result){
		if(err){
			callback(err, null);
		}else{
			//console.log("Id is fetched");
			callback(err, result);
		}
	});
}


addSellBuy(user_id, sell, buy){
	var addSql = `INSERT INTO user_sell_buy (user_id, sell, buy) VALUES (?,?,?)`;
	//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
	con.query(addSql,[user_id, sell, buy] , function(err, result){
		if(err){
			throw err;
		}else{
			//console.log("user_sell_buy table is added");
		}
	});
}

	updateBuffert(id, value){
		var getSql = `SELECT * FROM users WHERE id = ?`;
		var setsql=`UPDATE users SET buffert = ? WHERE id = ?`;
		var buffert = 0;
		con.query(getSql, [id], function(err, res){
			if(err){
				console.log(err);
			}else{
				buffert = value + res[0].buffert;
				con.query(setsql, [buffert, id], function(error, result){
				if(error){
					console.log(error);
				}else{
					//console.log("Buffert uppdaterad");
				}});
			}
		});
		
			
	}


	updateMarket(value){
		var getSql = `SELECT * FROM market`;
		var setsql=`UPDATE market SET amount = ?`;
		con.query(getSql, [], function(err, res){
			if(err){
				
			}else{
				var amount = value + res[0].amount;
				con.query(setsql, [amount], function(error, result){
				if(error){
				}else{
					//console.log("Market amount uppdaterad");
				}});
			}
		});
	}

	updateMarketPrice(value){
		var setsql=`UPDATE market SET price = ?`;
		con.query(setsql, [value], function(error, result){
		if(error){
			}else{
				//console.log("Market price uppdaterad");
			}});
			}

	updateMarketPriceSim(value){
		var setsql=`UPDATE market SET price_sim = ?`;	
		con.query(setsql, [value], function(error, result){
		if(error){
		}else{
			//console.log("Market price_sim uppdaterad");
		}});
	}
		
		
	



getUserHashedPassword(email,callback){
	var getSql =  `SELECT password FROM users WHERE email= ?`;
		con.query(getSql, [email] , function(err, result){
		if(err){
			callback(err, null);
		}else{
			callback(err, result);
		}
	});
}

getSellBuy(id, callback){
	var getSql = `SELECT * FROM user_sell_buy WHERE user_id = ?`;
	con.query(getSql, [id] , function(err, result){
		if(err){
			callback(err, null);
		}else{
			//console.log("SellBuy is fetched");
			
			callback(err, result);
		}
	});
}

updateSell(id, sell){
	var setSql=`UPDATE user_sell_buy SET sell = ? WHERE user_id = ?`;
		con.query(setSql, [sell, id], function(err, res){
			if(err){	
			}else{
				//console.log("Sell uppdaterat");
			}
		});
}

updateBuy(id, buy){
	var setSql=`UPDATE user_sell_buy SET buy = ? WHERE user_id = ?`;
		con.query(setSql, [buy, id], function(err, res){
			if(err){	
			}else{
				//console.log("Buy uppdaterat");
			}
		});
}

getMarket(callback){
	var getSql = `SELECT * FROM market`;
		con.query(getSql, [], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("Market is fetched");
				callback(err, result);
			}
		});
}


addUserProduction(id){
	var addSql = `INSERT INTO user_production (user_id, total_production , total_excess, latest_production, latest_wind, latest_excess, sim_price) VALUES (?, 0, 0, 0, 0, 0, 0)`;
	con.query(addSql,[id] , function(err, result){
		if(err){
			throw err;
		}else{
			//console.log("User production is added");
		}
	});
}

checkPassword(id, password, callback){
	var getSql = `SELECT * FROM users WHERE id = ? AND password = ? `;
		con.query(getSql, [id, password], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User production is fetched");
				callback(err, result);
			}
		});
}


getUserProduction(id, callback){
	var getSql = `SELECT * FROM user_production WHERE user_id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User production is fetched");
				callback(err, result);
			}
		});
}

getProductionInfo(id, callback){
	var getSql = `SELECT users.buffert, users.area, users.consumption, users.has_power, user_production.latest_wind, user_production.latest_production, user_production.latest_excess FROM users JOIN user_production ON users.id = user_production.user_id WHERE users.id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("User production is fetched");
				callback(err, result);
			}
		});
}

getAllUserProduction(callback){
	var getSql = `SELECT * FROM user_production`;
		con.query(getSql, [], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("All user production is fetched");
				callback(err, result);
			}
		});
}

getProsumersProductionSimPrice(callback){
	var getSql = `SELECT users.role_id, user_production.sim_price FROM users JOIN user_production ON users.id = user_production.user_id WHERE users.role_id = 0`;
		con.query(getSql, [], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("All prosumers production is fetched");
				callback(err, result);
			}
		});
}

getProsumerProductionSimPrice(id, callback){
	var getSql = `SELECT users.role_id, user_production.sim_price FROM users JOIN user_production ON users.id = user_production.user_id WHERE users.id = ?`;
		con.query(getSql, [id], function(err, result){
			if(err){
				callback(err, null);
			}else{
				//console.log("One prosumers production is fetched");
				
				callback(err, result);
			}
		});
}


updateUserProduction(id, production, excess, wind, price){
	var add_production = production;
	var add_excess = excess;
	var setSql=`UPDATE user_production SET total_production = total_production + ?, total_excess = total_excess + ?, latest_production = ?, latest_wind = ?, latest_excess = ?, sim_price = ? WHERE user_id = ?`;
		con.query(setSql, [add_production, add_excess, production, wind , excess, price, id], function(err, res){
			if(err){	
			}else{
				//console.log("User production uppdaterat");
			}
		});
}

blockUser(id, block, time){
	var setSql=`UPDATE blocked SET blocked = ?, time = ? WHERE users_id = ?`;
		con.query(setSql, [block, time, id], function(err, res){
			if(err){	
			}else{
				//console.log("User blocked uppdaterat");
			}
		});
}


createCoalSimulator(id){
	var addSql = `INSERT INTO coal (user_id, status) VALUES (?,?)`;
		//console.log(role_id + "," + online + "," + firstname + "," + lastname + "," + email + "," + password + "," + img + "," + area + "," + buffert + "," + consumption);
		con.query(addSql,[id,0] , function(err, result){
			if(err){
				throw err;
			}else{
				//console.log("Coal simulator is added");
			}
	});
}

getCoalSimulators(id,callback){
	var getSql = `SELECT * FROM coal WHERE user_id = ?`;
		con.query(getSql,[id] , function(err, result){
			if(err){
				callback(err,null)
			}else{
				//console.log("Coal simulators is fetched");
				callback(err,result);
			}
		});
	}

getCoalSimulator(id,callback){
	var getSql = `SELECT * FROM coal WHERE id = ?`;
		con.query(getSql,[id] , function(err, result){
			if(err){
				callback(err,null)
			}else{
				//console.log("Coal simulator is fetched");
				callback(err,result);
			}
		});
	}

startCoalSimulator(coal_id, status){
	var setSql=`UPDATE coal SET status = ? WHERE id = ?`;
		con.query(setSql, [status, coal_id], function(err, res){
			if(err){	
			}else{
				//console.log("Coal simulator started");
			}
		});
}

stopCoalSimulator(coal_id, status){
	var setSql=`UPDATE coal SET status = ? WHERE id = ?`;
		con.query(setSql, [status, coal_id], function(err, res){
			if(err){	
			}else{
				//console.log("Coal simulator stopped");
			}
		});
}

startCoalProduction(coal_id, time, production){
	var addSql = `INSERT INTO coal_power (coal_id, time,production, price, status) VALUES (?,?,?,?,?)`;
	con.query(addSql,[coal_id, time, production, 0, 1] , function(err, result){
			if(err){
				throw err;
			}else{
				//console.log("Coal simulator production is started");
			}
		});

}

stopCoalProduction(status, coal_id){
	var setSql=`UPDATE coal_power SET status = ? WHERE coal_id = ?`;
		con.query(setSql, [status, coal_id], function(err, res){
			if(err){
			console.log(err);	
			}else{
				//console.log("Coal production stopped");
			}
		});
	}

getCoalProduction(coal_id,status,callback){
	var getSql = `SELECT * FROM coal_power WHERE coal_id = ? AND status = ?`;
		con.query(getSql,[coal_id,status] , function(err, result){
			if(err){
				callback(err,null)
			}else{
				//console.log("Coal production is fetched");
				callback(err,result);
			}
		});
}

updateAdminProduction(market,buffert,id){
	var setSql=`UPDATE user_sell_buy SET sell = ?, buy = ? WHERE user_id = ?`;
		con.query(setSql, [market,buffert, id], function(err, res){
			if(err){	
				console.log(err);
			}else{
				//console.log("Admin procent to market is changed");
			}
		});
}





}

module.exports = Db_user;
