function Physics(){
    var gravity = 9.81;

	this.applyForceAtAngle = function(ball, force, forceAngle){
		var direction = forceAngle;
		var acceleration = getAccelerationFromForce(force,ball.mass);

		ball.direction = direction;
		ball.acceleration = acceleration;

		//console.log("Force applied: "+force+" at angle: " + forceAngle);

		return ball;
	}

	this.updatePoint = function(ball){

		// to spin the ball due to tornado's effect
	    if (ball.spin != 0) {
	        //alert('Tornado effect!');
	        ball.direction += ball.spin;
	        ball.spinCounter -= 1;

	        // decelerate ball every (5*1000/30) miliseconds
	        if(ball.spinCounter <= 0){
	        	ball.spin -= ball.spinDeceleration
	        	ball.spinCounter = 5;
	        }/*end if(ball.spinCounter <= 0)*/

	        // stop spinning when decelerate finish 
	        if(ball.spin <= 0) {
	        	ball.spinStop();
	        }/*end if(ball.spin <= 0)*/

            console.log("Applying tornado curving strength of " + ball.spin);
	    }/*end if(ball.spin != 0)*/

		var endVelocity = vuat(ball.velocity, ball.acceleration, 0.1);
		var distMoved = sutat2(ball.velocity, 0.1, ball.acceleration);

		var quadrant = math.getQuadrantByAngle(ball.direction);
		var angleWithHoriz = math.getAngleWithQuadrant(ball.direction);

		var x_disp = 0;
		var y_disp = 0;

		if (distMoved > 0){
			if (quadrant == 1){
				x_disp = distMoved*Math.cos(angleWithHoriz);
				y_disp = -1*distMoved*Math.sin(angleWithHoriz);
			} else if (quadrant == 2){
				x_disp = -1*distMoved*Math.cos(angleWithHoriz);
				y_disp = -1*distMoved*Math.sin(angleWithHoriz);
			} else if (quadrant == 3){
				x_disp = -1*distMoved*Math.cos(angleWithHoriz);
				y_disp = distMoved*Math.sin(angleWithHoriz);
			} else {
				x_disp = distMoved*Math.cos(angleWithHoriz);
				y_disp = distMoved*Math.sin(angleWithHoriz);
			}
		}

		ball.centerPoint.x = ball.centerPoint.x + x_disp;
		ball.centerPoint.y = ball.centerPoint.y + y_disp;
		ball.velocity = endVelocity;

		if (ball.velocity > 0){
			if (ball.acceleration > 0){
			ball.acceleration = ball.acceleration - getAccelerationFromFriction(ball.centerPoint);
			}
			else
			{
				ball.acceleration = - getAccelerationFromFriction(ball.centerPoint);
			}
		} else {
			ball.acceleration = 0;
			ball.velocity = 0;
			ball.spin = 0;
			if(cueBall.acceleration == 0){
				initialCollision = true;
			}
		}
		// console.log("distMoved"+ distMoved);
		if (x_disp != 0 || y_disp != 0){
			/* console.log("Direction "+ ball.direction);
			 console.log("X disp "+ x_disp);
			 console.log("Y disp "+ y_disp);
			 console.log("Quadrant "+ quadrant);
			 console.log("angleWithHoriz "+ angleWithHoriz);
			 console.log("Ball position updated to "+ball.centerPoint.x);
			 console.log ("Ball acceleration " + ball.acceleration);
			 console.log ("Ball velocity " + ball.velocity);*/
		}

		return ball;
	}

	this.getVector = function(x,y){
		var result = new Vector();
		var magnitude = math.pythagorasTheorem(x,y);

		var quadrant = math.getQuadrantByPoint(x,y);
		var angle = Math.atan(Math.abs(y)/Math.abs(x));

		if (quadrant == 4){
			result.direction = angle;
		} else if (quadrant == 3) {
			result.direction = Math.PI - angle;
		} else if (quadrant == 2) {
			result.direction = Math.PI + angle;
		} else {
			result.direction = (2* Math.PI) - angle;
		}

		result.magnitude = magnitude;

		return result;
	}

	this.vectorSubtract = function(vector1, vector2){
		
		var x1 = vector1.getXComponent();
		var x2 = vector2.getXComponent();
		var y1 = vector1.getYComponent();
		var y2 = vector2.getYComponent();

		var result = this.getVector(x1-x2, y1-y2);

		return result;
	}

	// F - (mu)R = ma
	function getAccelerationFromFriction(point){
		var region = table.getRegionFromPoint(point);
		//logger.log("Friction is "+ region.coefficientOfFriction);
		return region.coefficientOfFriction*gravity;
	}

	// F = ma
	function getAccelerationFromForce(force, mass){
		return force/mass;
	}

	// v = u + at
	function vuat(u,a,t){
		return u+(a*t);
	}

	// s = ut + 1/2 at^2
	function sutat2(u,t,a){
		return (u*t)+(0.5*a*Math.pow(t,2));
	}

	this.getMomentum = function(mass,velocityVector){
		var mom_x = mass*velocityVector.getXComponent();
		var mom_y = mass*velocityVector.getYComponent();

		var resultant = this.getVector(mom_x, mom_y);

		return resultant;
	}

    /*spin ball left*/
    this.turnLeft = function (ball, percent) {
        if(percent < 1 && percent >= 0){
            ball.spin = -1 * percent;
        } else if(percent < 100 && percent >= 1){
            ball.spin = -1 * (percent/100);
        } else {
            ball.spin = 0;
        }//end if-else
        logger.log("Setting curve left strength of " + percent);
	}//end turnLeft*/

    /*spin ball right*/
    this.turnRight = function (ball, percent) {
        if(percent < 1 && percent >= 0){
            ball.spin = percent;
        } else if(percent < 100 && percent >= 1){
            ball.spin = percent/100;
        } else {
            ball.spin = 0;
        }//end if-else*/
        logger.log("Setting curve right strength of " + percent);
	}//end turnRight*/
	
	/*move balls after earthquake*/
	this.earthquakeEffect = function(){
		var pointBalls = table.getBalls();
		var earthquakeForce = 50;
		var dir = 0;
		var acc = 0;
		//apply force to all point balls in play
	    for (var i=0;i<pointBalls.length;i++){
	    	if(pointBalls[i].potted == false){ //check if ball is potted 1st
				if(pointBalls[i].acceleration == 0){ //if ball is not moving
					//apply a random direction vector
					dir = this.randomDirection360();
					pointBalls[i] = physicsEngine.applyForceAtAngle(pointBalls[i], earthquakeForce, dir);
				} else {
					//apply force to moving balls
					dir = this.randomDirection();
					pointBalls[i].direction += dir;
					acc = physicsEngine.getAccelerationFromForce(earthquakeForce,pointBalls[i].mass);
					pointBalls[i].acceleration += acc;
				}//end if-else
			}//end if(pointBalls[i].potted == false)
		}//end for
		//apply force to cueball
		if(cueBall.potted == false){ //check if ball is potted 1st
			if(cueBall.acceleration == 0){ //if ball is not moving
				//apply a random direction vector
				dir = this.randomDirection360() ;
				cueBall = physicsEngine.applyForceAtAngle(cueBall, earthquakeForce, dir);
			} else {
				//apply force to moving balls
				dir = this.randomDirection();
				cueBall.direction += dir;
				acc = physicsEngine.getAccelerationFromForce(earthquakeForce,cueBall.mass);
				cueBall.acceleration += acc;
			}//end if-else*/
		}//end if(cueBall.potted == false)
	}//end earthquakeEffect*/

	/*gives a random angle of direction from 0 to 360*/
	this.randomDirection360 = function(){
		var random = Math.floor(Math.random() * 361); //generates a random number between 1 to 10
		return ((Math.PI/180)*random);
	}//end randomDirection360*/

	/*gives a random angle of direction from 5 to 25 and -5 to -25*/
	this.randomDirection = function(){
		var random = 5 + Math.floor(Math.random()*(25+1-5)); //generates a random number between 5 and 25
		var posNeg = Math.floor(Math.random() * 3);
		if(posNeg == 2){
			random *= -1;
		}
		return ((Math.PI/180)*random);
	}//end randomDirection*/

	/*generate tornado on cueBall impact*/
	this.tornadoGen =  function(impact){
		var tornadoCondition = 10;
		if(impact >= tornadoCondition){
			tornado.onScreen = true;
		}
	}//end tornadoGen*/
}