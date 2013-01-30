function Table(){
	var balls = new Array();
	var holes = new Array();

	this.width = 1000;
	this.height = 500;

	this.coefficientOfFriction = 0.4;


	//0-5 medium balls
	balls[0] = new Ball(new Point(700,250),23,23);
	balls[0].color = 'red';
	
	balls[1] = new Ball(new Point(700,203),23,23);
	balls[1].color = 'blue';

	balls[2] = new Ball(new Point(700,297),23,23);
	balls[2].color = 'purple';

	balls[3] = new Ball(new Point(741,274),23,23);
	balls[3].color = 'orange';

	balls[4] = new Ball(new Point(741,227),23,23);
	balls[4].color = 'yellow';

	balls[5] = new Ball(new Point(782,250),23,23);
	balls[5].color = 'black';

	//6-8 big balls
	balls[6] = new Ball(new Point(643,250),33,33);
	balls[6].color = '#666666';

	balls[7] = new Ball(new Point(772,322),33,33);
	balls[7].color = '#333333';

	balls[8] = new Ball(new Point(772,178),33,33);
	balls[8].color = '#999999';

	//9-14 small balls
	balls[9] = new Ball(new Point(726,178),12,12);
	balls[9].color = '#00FF00';
	
	balls[10] = new Ball(new Point(726,322),12,12);
	balls[10].color = '#00FF00';

	balls[11] = new Ball(new Point(665,210),12,12);
	balls[11].color = '#00FF00';

	balls[12] = new Ball(new Point(665,290),12,12);
	balls[12].color = '#00FF00';	

	balls[13] = new Ball(new Point(797,217),12,12);
	balls[13].color = '#00FF00';	

	balls[14] = new Ball(new Point(797,283),12,12);
	balls[14].color = '#00FF00';	


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