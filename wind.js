
class Wind {

	
	constructor(consumption) {
		this.windspeed = Math.floor(Math.random() * 20);
		this.price = 0;
	}

	getElProd(){
		var el_prod = Math.pow(this.windspeed,3) * 0.0006 * 0.42; 
		var el_prod = el_prod/8640;

		if(this.windspeed == 0){
			this.price = 10;
		}else if(this.windspeed == 1){
			this.price = 7.5;
		}else if(this.windspeed == 2){
			this.price = 5;
		}else if(this.windspeed == 3){
			this.price = 4;
		}else if(this.windspeed == 4){
			this.price = 3.5;
		}else if(this.windspeed == 5){
			this.price = 3;
		}else if(this.windspeed == 6){
			this.price = 2.5;
		}else if(this.windspeed == 7){
			this.price = 2.25;
		}else if(this.windspeed == 8){
			this.price = 2;
		}else if(this.windspeed == 9){
			this.price = 1.8;
		}else if(this.windspeed == 10){
			this.price = 1.6;
		}else if(this.windspeed == 11){
			this.price = 1.4;
		}else if(this.windspeed == 12){
			this.price = 1.2;
		}else if(this.windspeed == 13){
			this.price = 1;
		}else if(this.windspeed == 14){
			this.price = 0.9;
		}else if(this.windspeed == 15){
			this.price = 0.8;
		}else if(this.windspeed == 16){
			this.price = 0.7;
		}else if(this.windspeed == 17){
			this.price = 0.6;
		}else if(this.windspeed == 18){
			this.price = 0.5;
		}else if(this.windspeed == 19){
			this.price = 0.4;
		}else if(this.windspeed == 20){
			this.price = 0.3;
		}

		var arr = [el_prod, this.price];
		
		return arr; //kilo watt / square meter
	}
}

module.exports = Wind;

