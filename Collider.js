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

		var massRatio = ball2.mass/ball1.mass;
		var impactParameter_x = ball2.centerPoint.x - ball1.centerPoint.x;
		var impactParameter_y = ball2.centerPoint.y - ball1.centerPoint.y;
		var velocity_xDiff = initialVel2.getXComponent() - initialVel1.getXComponent();
		var velocity_yDiff = initialVel2.getYComponent() - initialVel1.getYComponent();

		var velocity_xCentreOfMass = ((ball1.mass*initialVel1.getXComponent())+(ball2.mass*initialVel2.getXComponent()))/(ball1.mass + ball2.mass);
		var velocity_yCenterOfMass = ((ball1.mass*initialVel1.getYComponent())+(ball2.mass*initialVel2.getYComponent()))/(ball1.mass + ball2.mass);

		// Update velocities
       	var impactParameter = impactParameter_y / impactParameter_x;
       	var deviationParameter = -2*(velocity_xDiff +impactParameter*velocity_yDiff)/((1+impactParameter*impactParameter)*(1+massRatio)) ;

       	var finalVelX2 = initialVel2.getXComponent()+deviationParameter;
       	var finalVelY2 = initialVel2.getYComponent()+impactParameter*deviationParameter;
       	var finalVelX1 = initialVel1.getXComponent()-massRatio*deviationParameter;
       	var finalVelY1 = initialVel1.getYComponent()-impactParameter*massRatio*deviationParameter;

       	var finalVel1 = physicsEngine.getVector(finalVelX1, finalVelY1);
		var finalVel2 = physicsEngine.getVector(finalVelX2, finalVelY2);

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
       // vx1=(vx1-velocity_xCentreOfMass)*R + velocity_xCentreOfMass;
       // vy1=(vy1-velocity_yCenterOfMass)*R + velocity_yCenterOfMass;
       // vx2=(vx2-velocity_xCentreOfMass)*R + velocity_xCentreOfMass;
       // vy2=(vy2-velocity_yCenterOfMass)*R + velocity_yCenterOfMass;
	}

	//Distance between the centers of the balls only on y axis
	function getImpactParameter(ball1, ball2){
		return ball1.centerPoint.y - ball2.centerPoint.y;
	}
}
