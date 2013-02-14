function Table(){
	var balls = new Array();
	var holes = new Array();

	this.width = 1000;
	this.height = 500;

	this.regions = new Array();

	// Always label regions from largest to smallest
	this.regions[0] = new Region(0,0,1000,500, 0.8);
	this.regions[0].color = 'green';
	this.regions[1] = new Region(50,50,900,400, 0.6);
	this.regions[1].color = '#31B404';
	this.regions[2] = new Region(150,130,700,240, 0.3);
	this.regions[2].color = '#00FF00';

	//0-5 medium balls
	balls[0] = new Ball(new Point(699,250),23,2);
	balls[0].color = 'yellow';
	balls[0].id = 0;
	
	balls[1] = new Ball(new Point(700,203),23,2);
	balls[1].color = 'yellow';
	balls[1].id = 1;

	balls[2] = new Ball(new Point(700,297),23,2);
	balls[2].color = 'yellow';
	balls[2].id = 2;

	balls[3] = new Ball(new Point(741,274),23,2);
	balls[3].color = 'yellow';
	balls[3].id = 3;

	balls[4] = new Ball(new Point(741,227),23,2);
	balls[4].color = 'yellow';
	balls[4].id = 4;

	balls[5] = new Ball(new Point(782,250),23,2);
	balls[5].color = 'yellow';
	balls[5].id = 5;

	//6-8 big balls
	balls[6] = new Ball(new Point(641,250),33,3);
	balls[6].color = 'red';
	balls[6].id = 6;

	balls[7] = new Ball(new Point(772,322),33,3);
	balls[7].color = 'red';
	balls[7].id = 7;

	balls[8] = new Ball(new Point(772,178),33,3);
	balls[8].color = 'red';
	balls[8].id = 8;

	//9-14 small balls
	balls[9] = new Ball(new Point(726,178),12,1);
	balls[9].color = 'blue';
	balls[9].id = 9;

	balls[10] = new Ball(new Point(726,322),12,1);
	balls[10].color = 'blue';
	balls[10].id = 10;

	balls[11] = new Ball(new Point(664,210),12,1);
	balls[11].color = 'blue';
	balls[11].id = 11;

	balls[12] = new Ball(new Point(664,290),12,1);
	balls[12].color = 'blue';
	balls[12].id = 12;	

	balls[13] = new Ball(new Point(797,217),12,1);
	balls[13].color = 'blue';	
	balls[13].id = 13;

	balls[14] = new Ball(new Point(797,283),12,1);
	balls[14].color = 'blue';	
	balls[14].id = 14;

	//big holes
	holes[0] = new Hole(new Point(0,0), 50);

	//medium holes
	holes[1] = new Hole(new Point(500,500), 36);
	holes[2] = new Hole(new Point(1000,0), 30);
	holes[3] = new Hole(new Point(0,500), 30);

	//small holes
	holes[4] = new Hole(new Point(1000,500), 20);
	holes[5] = new Hole(new Point(500,0), 20);

	this.getBalls = function(){
		return balls;
	}

	this.getHoles = function(){
		return holes;
	}

	 this.setBalls = function(allBalls){
	 	this.balls = allBalls;
	 }

	 this.getRegionFromPoint = function(point){
	 	if ((point.x > this.regions[2].x) && (point.x < this.regions[2].x + this.regions[2].width) 
	 		&& (point.y > this.regions[2].y) && (point.y < this.regions[2].y + this.regions[2].height)){
	 		return this.regions[2];
	 	}
	 	else if ((point.x > this.regions[1].x) && (point.x < this.regions[1].x + this.regions[1].width) 
	 		&& (point.y > this.regions[1].y) && (point.y < this.regions[1].y + this.regions[1].height)){
	 		return this.regions[1];
	 	}
	 	else {
	 		return this.regions[0];
	 	}

	 }

	 this.incrementFriction = function(){
	 	for (var i=0; i<=2; i++){
	 		this.regions[i].frictionIncrease();
	 		logger.log("New friction: "+i+" :"+this.regions[i].coefficientOfFriction);
	 	}

	 }

	 this.decrementFriction = function(){
	 	for (var i=0; i<=2; i++){
	 		this.regions[i].frictionDecrease();
	 		logger.log("New friction: "+i+" :"+this.regions[i].coefficientOfFriction);
	 	}
	 }
}