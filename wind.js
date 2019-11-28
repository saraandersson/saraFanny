
class Wind {

	
	constructor(consumption) {
		this.windspeed = Math.floor(Math.random() * 20);	
	}

	getElProd(){
		var el_prod = Math.pow(this.windspeed,3) * 0.0006 * 0.42; 
		var el_prod = el_prod/8640;

		
		//var el_prod = (1/(Math.sqrt(2*3.1415*Math.pow(this.standard_dev,2))))*Math.pow(2.718,(-(Math.pow(this.windspeed - this.mean, 2))/(2*Math.pow(this.standard_dev,2))));
		return el_prod; //kilo watt / square meter
	}
}

module.exports = Wind;

