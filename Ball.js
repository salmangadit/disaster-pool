function Ball(centerPoint, radius, mass){
	this.centerPoint = centerPoint;
	this.radius = radius;
	this.mass = mass;
	this.velocity = 0;
	this.direction = 0;

	this.setVelocity = function(vel){
		this.velocity = vel;
	};

	this.setDirection = function(dir){
		this.direction = dir;
	}
}