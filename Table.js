function Table(){
	var balls = new Array();
	var holes = new Array();

	this.width = 1000;
	this.height = 500;

	this.regions = new Array();

	// Always label regions from largest to smallest
	this.regions[0] = new Region(0,0,1000,500, 0.8);
	this.regions[0].color = 'brown';
	this.regions[1] = new Region(50,50,900,400, 0.6);
	this.regions[1].color = 'green';
	this.regions[2] = new Region(150,130,700,240, 0.3);
	this.regions[2].color = 'yellow';

	//0-5 medium balls
	balls[0] = new Ball(new Point(700,250),23,2);
	balls[0].color = 'red';
	
	balls[1] = new Ball(new Point(700,203),23,2);
	balls[1].color = 'blue';

	balls[2] = new Ball(new Point(700,297),23,2);
	balls[2].color = 'purple';

	balls[3] = new Ball(new Point(741,274),23,2);
	balls[3].color = 'orange';

	balls[4] = new Ball(new Point(741,227),23,2);
	balls[4].color = 'yellow';

	balls[5] = new Ball(new Point(782,250),23,2);
	balls[5].color = 'black';

	//6-8 big balls
	balls[6] = new Ball(new Point(643,250),33,3);
	balls[6].color = '#666666';

	balls[7] = new Ball(new Point(772,322),33,3);
	balls[7].color = '#333333';

	balls[8] = new Ball(new Point(772,178),33,3);
	balls[8].color = '#999999';

	//9-14 small balls
	balls[9] = new Ball(new Point(726,178),12,1);
	balls[9].color = '#00FF00';
	
	balls[10] = new Ball(new Point(726,322),12,1);
	balls[10].color = '#00FF00';

	balls[11] = new Ball(new Point(665,210),12,1);
	balls[11].color = '#00FF00';

	balls[12] = new Ball(new Point(665,290),12,1);
	balls[12].color = '#00FF00';	

	balls[13] = new Ball(new Point(797,217),12,1);
	balls[13].color = '#00FF00';	

	balls[14] = new Ball(new Point(797,283),12,1);
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
}