function Collider(){
	this.detectCollisionWithWalls = function(ball){
		var tableWidth = table.width;
		var tableHeight = table.height;

		if (((ball.centerPoint.x + ball.radius) >= table.width)){
			//alert('Ball hit right wall!');
			//ball.stop();
		}
		else if (((ball.centerPoint.y + ball.radius) >= table.height)){
			//alert('Ball hit bottom wall');
			//ball.stop();
		}
		else if (((ball.centerPoint.y - ball.radius) <= 0)){
			//alert('Ball hit top wall');
			//ball.stop();
		}
		else if (((ball.centerPoint.x - ball.radius) <= 0)){
			//alert('Ball hit left wall');
			//ball.stop();
		}
	}

	this.detectCollisionWithBalls = function(ball){
		var balls = table.getBalls();

		for (var i=0; i<balls.length; i++){
			var centerPointDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, balls[i].centerPoint);

			if (centerPointDistance != 0 && centerPointDistance <= (ball.radius + balls[i].radius) ){
				//alert('ball collision!');
				//ball.stop();
				this.performCollisionBetweenBalls(ball, balls[i]);
			}
		}

		// Check with cueball
		var centerPointDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, cueBall.centerPoint);

		if (centerPointDistance != 0 && centerPointDistance <= (ball.radius + cueBall.radius) ){
			//alert('ball collision!');
			//ball.stop();
			this.performCollisionBetweenBalls(ball, cueBall);
		}

		
	}

	this.performCollisionBetweenBalls = function(ball1, ball2){
		var initialVel1 = new Vector();
		initialVel1.magnitude = ball1.velocity;
		initialVel1.direction = ball1.direction;

		var initialVel2 = new Vector();
		initialVel2.magnitude = ball2.velocity;
		initialVel2.direction = ball2.direction;

		var initialMomentum1 = physicsEngine.getMomentum(ball1.mass, initialVel1);
		var initialMomentum2 = physicsEngine.getMomentum(ball2.mass, initialVel2);

		var impactParameter = getImpactParameter(ball1, ball2);
		var impactAngle = Math.asin(impactParameter/(ball1.radius + ball2.radius));

		var deflectionDirection = 0;
		if (impactParameter < 0){
			deflectionDirection = -1*impactAngle;
		} else {
			deflectionDirection = (2* Math.PI) - impactAngle;
		}


		var m21 = ball2.mass/ball1.mass;
		var x21 = ball2.centerPoint.x - ball1.centerPoint.x;
		var y21 = ball2.centerPoint.y - ball1.centerPoint.y;
		var vx21 = initialVel2.getXComponent() - initialVel1.getXComponent();
		var vy21 = initialVel2.getYComponent() - initialVel1.getYComponent();

		var vx_cm = ((ball1.mass*initialVel1.getXComponent())+(ball2.mass*initialVel2.getXComponent()))/(ball1.mass + ball2.mass);
		var vy_cm = ((ball1.mass*initialVel1.getYComponent())+(ball2.mass*initialVel2.getYComponent()))/(ball1.mass + ball2.mass);

		// Update velocities
       	var a = y21 / x21;
       	var dvx2 = -2*(vx21 +a*vy21)/((1+a*a)*(1+m21)) ;

       	var f_vx2 = initialVel2.getXComponent()+dvx2;
       	var f_vy2 = initialVel2.getYComponent()+a*dvx2;
       	var f_vx1 = initialVel1.getXComponent()-m21*dvx2;
       	var f_vy1 = initialVel1.getYComponent()-a*m21*dvx2;

       	var finalVel1 = physicsEngine.getVector(f_vx1, f_vy1);
		var finalVel2 = physicsEngine.getVector(f_vx2, f_vy2);

		var finalMomentum1 = physicsEngine.getMomentum(ball1.mass, finalVel1);
		var finalMomentum2 = physicsEngine.getMomentum(ball2.mass, finalVel2);

		var changeInVel1 = physicsEngine.vectorSubtract(finalVel1, initialVel1);
		var changeInVel2 = physicsEngine.vectorSubtract(finalVel2, initialVel2);

		var acceleration1 = changeInVel1.magnitude/1;
		var acceleration2 = changeInVel2.magnitude/1;

		ball1.velocity = finalVel1.magnitude;
		ball1.direction = finalVel1.direction;
		ball1.acceleration = acceleration1;

		ball2.velocity = finalVel2.magnitude;
		ball2.direction = finalVel2.direction;
		ball2.acceleration = acceleration2;
       	// velocity correction for inelastic collisions ***
       // vx1=(vx1-vx_cm)*R + vx_cm;
       // vy1=(vy1-vy_cm)*R + vy_cm;
       // vx2=(vx2-vx_cm)*R + vx_cm;
       // vy2=(vy2-vy_cm)*R + vy_cm;
	}

	//Distance between the centers of the balls only on y axis
	function getImpactParameter(ball1, ball2){
		return ball1.centerPoint.y - ball2.centerPoint.y;
	}
}
