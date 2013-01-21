function Physics(){
    var math = new Maths();

	this.applyForceAtAngle = function(ball, force, forceAngle){
		var direction = forceAngle;
		var acceleration = getAccelerationFromForce(force,ball.mass);

		ball.direction = direction;
		ball.acceleration = acceleration;

		console.log("Force applied: "+force+" at angle: " + forceAngle);

		return ball;
	}

	this.updatePoint = function(ball){
		var endVelocity = vuat(ball.velocity, ball.acceleration, screenUpdateTime);
		var distMoved = sutat2(ball.velocity, screenUpdateTime, ball.acceleration);

		var quadrant = math.getQuadrantByAngle(ball.direction);
		var angleWithHoriz = math.getAngleWithQuadrant(ball.direction);

		var x_disp;
		var y_disp;

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

		ball.centerPoint.x = ball.centerPoint.x + x_disp;
		ball.centerPoint.y = ball.centerPoint.y + y_disp;
		ball.velocity = endVelocity;
		
		console.log("distMoved"+ distMoved);
		if (x_disp > 0 || y_disp > 0){
			console.log("Direction"+ ball.direction);
			console.log("X disp"+ x_disp);
			console.log("Y disp"+ y_disp);
			console.log("Quadrant"+ quadrant);
			console.log("angleWithHoriz"+ angleWithHoriz);
			console.log("Ball position updated to "+ball.centerPoint.x);
		}
		return ball;
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
}