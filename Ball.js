function Ball(centerPoint, radius, mass){
	this.centerPoint = centerPoint;
	this.radius = radius;
	this.mass = mass;
	this.velocity = 0;
	this.direction = 0;
	this.color = 'white';
	this.acceleration = 0;
	this.tornadoEffect = 0;

	this.stop = function() {
		this.velocity = 0;
		this.acceleration = 0;
	}
}