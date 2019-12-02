
const Wind = require('./wind.js');

class Sim {

	constructor() {
		//WindSpeed wind = new WindSpeed();
		this.counter = 0; 
		this.wind = 0;
		this.area = 0;
		this.consumption = 0;
		this.consumption_per_area = 0;
		this.excessElProd = 0;
		this.totalProduction = 0; 
	}

	getTotalProductionPerDay(consumption, area, callback){
		this.wind = new Wind();
		this.consumption = consumption;
		this.area = area;
		this.totalProduction = this.wind.getElProd();
		this.consumption_per_area = this.consumption/this.area;
		this.excessElProd = this.totalProduction - this.consumption_per_area;

		 

		var result = [this.wind.WindSpeed, this.totalProduction, this.excessElProd];

		callback(result);

	}
}

module.exports = Sim;

