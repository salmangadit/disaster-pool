function Table(){
	var balls = new Array();
	var holes = new Array();

	this.getBalls = function(){
		return balls;
	}

	this.getHoles = function(){
		return holes;
	}

	// This function can be removed later with a constructor
	// to create the balls
	this.setBalls = function(allBalls){
		this.balls = allBalls;
	}
}