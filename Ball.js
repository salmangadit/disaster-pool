function Ball(centerPoint, radius, mass){
	this.centerPoint = centerPoint;
	this.radius = radius;
	this.mass = mass;
	this.velocity = 0;
	this.direction = 0;
	this.color = 'white';
	this.acceleration = 0;
	this.spin = 0;
	this.spinDeceleration = 0.01;
	this.spinCounter = 5;

	this.stop = function() {
		this.velocity = 0;
		this.acceleration = 0;
	}

	this.spinStop = function() {
		this.spin = 0;
		this.spinDeceleration = 0.01;
		this.spinCounter = 10;
	}
}