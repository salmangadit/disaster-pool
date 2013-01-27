function Physics(){
    var gravity = 9.81;

	this.applyForceAtAngle = function(ball, force, forceAngle){
		var direction = forceAngle;
		var acceleration = getAccelerationFromForce(force,ball.mass);

		ball.direction = direction;
		ball.acceleration = acceleration;

		console.log("Force applied: "+force+" at angle: " + forceAngle);

		return ball;
	}

	this.updatePoint = function(ball){
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
			ball.acceleration = ball.acceleration - getAccelerationFromFriction();
			}
			else
			{
				ball.acceleration = - getAccelerationFromFriction();
			}
		} else {
			ball.acceleration = 0;
			ball.velocity = 0;
		}
		// console.log("distMoved"+ distMoved);
		if (x_disp != 0 || y_disp != 0){
			 console.log("Direction "+ ball.direction);
			 console.log("X disp "+ x_disp);
			 console.log("Y disp "+ y_disp);
			 console.log("Quadrant "+ quadrant);
			 console.log("angleWithHoriz "+ angleWithHoriz);
			 console.log("Ball position updated to "+ball.centerPoint.x);
			 console.log ("Ball acceleration " + ball.acceleration);
			 console.log ("Ball velocity " + ball.velocity);
		}

        //to curve the ball due to tornado's effect
	    if (ball.tornadoEffect != 0) {
	        //alert('Tornado effect!');
	        ball.direction += ball.tornadoEffect;
            console.log("Applying tornado curving strength of " + ball.tornadoEffect);
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
	function getAccelerationFromFriction(){
		return table.coefficientOfFriction*gravity;
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

    //curve ball left
    this.turnLeft = function (ball, percent) {
        if(percent < 1 && percent >= 0){
            ball.tornadoEffect = -1 * percent;
        } else if(percent < 100 && percent >= 1){
            ball.tornadoEffect = -1 * (percent/100);
        } else {
            ball.tornadoEffect = 0;
        }
        console.log("Setting curve left strength of " + percent);
	}

    //curve ball right
    this.turnRight = function (ball, percent) {
        if(percent < 1 && percent >= 0){
            ball.tornadoEffect = percent;
        } else if(percent < 100 && percent >= 1){
            ball.tornadoEffect = percent/100;
        } else {
            ball.tornadoEffect = 0;
        }
        console.log("Setting curve right strength of " + percent);
	}
	
}