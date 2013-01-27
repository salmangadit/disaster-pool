function Table(){
	var balls = new Array();
	var holes = new Array();

	this.width = 1000;
	this.height = 500;

	this.coefficientOfFriction = 0.4;


	for (var i =0; i<2; i++){
		balls[i] = new Ball(new Point(100*(i+2),100),10,10);
		balls[i].color = 'red';
	}
	balls[1].color = 'blue';

	this.getBalls = function(){
		return balls;
	}

	this.getHoles = function(){
		return holes;
	}

	 this.setBalls = function(allBalls){
	 	this.balls = allBalls;
	 }
}