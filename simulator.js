
const Wind = require('./wind.js');

class Sim {

	constructor(consumption, area) {
		//WindSpeed wind = new WindSpeed();
		this.wind = new Wind();
		this.area = area;
		this.consumption = consumption;
		this.consumption_per_area = this.consumption/this.area;
		this.excessElProd = this.wind.getElProd() - this.consumption_per_area;
		this.price = 1;
		this.totalPrice = (this.price * this.consumption_per_area)/this.excessElProd;
	}

	getTotalPrice(){
		var pricePerDay = this.totalPrice*this.area;
		return pricePerDay;
	}
}

module.exports = Sim;

