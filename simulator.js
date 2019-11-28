
//const Wind = require('./wind.js');

class Sim {

	constructor(consumption, area) {
		//WindSpeed wind = new WindSpeed();
		this.counter = 0; 
		this.wind = 0;
		this.area = area;
		this.consumption = consumption;
		this.consumption_per_area = 0;
		this.excessElProd = 0;
		this.totalProduction = 0; 
	}

	counter(){
		this.wind = new Wind();
		this.counter++;
		this.totalProduction += this.wind.getElProd();
		if(this.counter==8640){
			getTotalProductionPerDay();
			this.counter=0;
		}
	}

	getTotalProductionPerDay(){
		this.consumption_per_area = this.consumption/this.area;
		this.excessElProd = this.totalProduction - this.consumption_per_area;
		/*this.price = 1;
		this.totalPrice = (this.price * this.consumption_per_area)/this.excessElProd;
		var pricePerDay = this.totalPrice*this.area;*/
		return this.excessElProd;
	}
}

module.exports = Sim;

