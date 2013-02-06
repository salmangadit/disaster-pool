function CollisionPair(id1, id2){
	this.id1 = id1;
	this.id2 = id2;
}

function Collider(){
	this.coefficientOfRestitution = 0.8;
	var collisionPairs = new Array();

	this.detectCollisionWithWalls = function(ball) {
		var tableWidth = table.width;
		var tableHeight = table.height;

		if (((ball.centerPoint.x + ball.radius) >= table.width)){
			logger.log('Ball hit right wall!');
			this.performCollisionWithWall(ball, 1);
		}
		else if (((ball.centerPoint.y + ball.radius) >= table.height)){
			logger.log('Ball hit bottom wall');
			this.performCollisionWithWall(ball, 2);
		}
		else if (((ball.centerPoint.y - ball.radius) <= 0)){
			logger.log('Ball hit top wall');
			this.performCollisionWithWall(ball,4);
		}
		else if (((ball.centerPoint.x - ball.radius) <= 0)){
			logger.log('Ball hit left wall');
			this.performCollisionWithWall(ball,3);
		}
	}

	this.detectCollisionWithBalls = function(ball){
		var balls = table.getBalls();

		for (var i=0; i<balls.length; i++){
			if (ball.id == balls[i].id){
				continue;
			}

			if(this.detectBallToBallCollision(ball, balls[i])) {
				if (!checkIfCollisionPairExists(ball, balls[i])) {
					collisionPairs.push(new CollisionPair(ball.id, balls[i].id));
					this.performCollisionBetweenBalls(ball,balls[i]);
				}
				else {
					ballPositionShift(ball, balls[i]);
				}
			}
			else {
				//console.log(collisionPairs.length);
				removeCollisionPair(ball, balls[i]);
			}
		}

		// Check with cueball
		if(this.detectBallToBallCollision(ball, cueBall)){
			if (!checkIfCollisionPairExists(ball,cueBall)) {
				collisionPairs.push(new CollisionPair(ball.id, cueBall.id));
				this.performCollisionBetweenBalls(ball,cueBall);
				if(initialCollision == true){
					//get impact force
					var impactForce = 0;
					//call tornadoGen
					physicsEngine.tornadoGen(impactForce);
					initialCollision = false;
				}
			}
			else{
				ballPositionShift(ball, cueBall);
			}
		}
		else {
				removeCollisionPair(ball, cueBall);
		}

	}

	this.detectPotting = function(ball){
		var holes = table.getHoles();

		for (var i=0; i<holes.length; i++){
			var centerPointDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, holes[i].centerPoint);

			if (centerPointDistance <= holes[i].radius){
				logger.log('ball potted!');
				ball.potted = true;
				ball.stop();
				ball.centerPoint.x =0;
				ball.centerPoint.y = 600;
			}
			
		}

	}

	this.detectBallToBallCollision = function(ball1, ball2){
		var centerPointDistance = math.getDistanceBetweenTwoPoints(ball1.centerPoint, ball2.centerPoint);

		if (centerPointDistance != 0 && centerPointDistance < (ball1.radius + ball2.radius) ){
			return true;
		}

		return false;
	}

	this.performCollisionWithWall = function(ball, wall){
		var angleWithHoriz = math.getAngleWithQuadrant(ball.direction);
		var quadrant = math.getQuadrantByAngle(ball.direction);

		if (wall == 1){
			if (quadrant == 1){
				ball.direction = Math.PI+angleWithHoriz;
			} else if (quadrant == 4){
				ball.direction = Math.PI-angleWithHoriz;
			}
		} else if (wall == 2){
			if (quadrant == 3){
				ball.direction = Math.PI+angleWithHoriz;
			} else if (quadrant == 4){
				ball.direction = (2*Math.PI)-angleWithHoriz;
			}
		} else if (wall == 3){
			if (quadrant == 2){
				ball.direction = (2*Math.PI)-angleWithHoriz;
			} else if (quadrant == 3){
				ball.direction = angleWithHoriz;
			}
		} else {
			if (quadrant == 1){
				ball.direction = angleWithHoriz;
			} else if (quadrant == 2){
				ball.direction = Math.PI-angleWithHoriz;
			}
		}
	}

	/*to detect any balls entering the tornado*/
	this.detectCollisionWithTornado = function (tornado) {
		if(tornado.onScreen == true){
			var balls = table.getBalls();
		    var random = Math.floor(Math.random() * 11); //generates a random number between 1 to 10

		    // check with normal balls
		    for (var i = 0; i < balls.length; i++) {
		    	var centerPointDistance = math.getDistanceBetweenTwoPoints(tornado.centerPoint, balls[i].centerPoint);
		    	var radiusAdded = tornado.radius + balls[i].radius;

		    	if (centerPointDistance != 0 && centerPointDistance <= radiusAdded) {
		            //alert('Ball entered tornado!');
		            if(balls[i].spin == 0){
		            	if(random % 2 != 1){
		            		physicsEngine.turnLeft(balls[i], tornado.strength);
		            	} else {
		            		physicsEngine.turnRight(balls[i], tornado.strength);
		            	}/*end if-else*/
		            }/*end if(balls[i].spin == 0)*/
		        }/*end if(centerPointDistance ...)*/
		    }/*end for*/

		    // check with cueball
		    var centerPointDistance = math.getDistanceBetweenTwoPoints(tornado.centerPoint, cueBall.centerPoint);
		    var radiusAdded = tornado.radius + cueBall.radius;

		    if(centerPointDistance != 0 && centerPointDistance <= radiusAdded) {
		        //alert('Cue ball entered tornado!');
		        if(cueBall.spin == 0) {
		        	if (random % 2 != 1) {
		        		physicsEngine.turnLeft(cueBall, tornado.strength);
		        	} else {
		        		physicsEngine.turnRight(cueBall, tornado.strength);
		        	}/*end if-else*/
		        }/*end if(cueBall.spin == 0) */
		    }/*end if(centerPointDistance ...)*/
		}/*end if(tornado.onScreen == true)*/
	}//end detectCollisionWithTornado*/

	this.performCollisionBetweenBalls = function(ball1, ball2){
		
		// while (this.detectBallToBallCollision(ball1, ball2)){
			ballPositionShift(ball1, ball2);
		// }

		var initialVel1 = new Vector();
		initialVel1.magnitude = ball1.velocity;
		initialVel1.direction = ball1.direction;

		var initialVel2 = new Vector();
		initialVel2.magnitude = ball2.velocity;
		initialVel2.direction = ball2.direction;

		//console.log("Ball1 initial velocity: " + initialVel1.toString());
		//console.log("Ball2 initial velocity: " + initialVel2.toString());

		var initialMomentum1 = physicsEngine.getMomentum(ball1.mass, initialVel1);
		var initialMomentum2 = physicsEngine.getMomentum(ball2.mass, initialVel2);

		//console.log("Ball1 initial momentum: " + initialMomentum1.toString());
		//console.log("Ball2 initial momentum: " + initialMomentum2.toString());

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

       	// velocity correction for inelastic collisions ***
        //finalVelX1=(finalVelX1-velocity_xCentreOfMass)*this.coefficientOfRestitution + velocity_xCentreOfMass;
        //finalVelY1=(finalVelY1-velocity_yCenterOfMass)*this.coefficientOfRestitution + velocity_yCenterOfMass;
        //finalVelX2=(finalVelX2-velocity_xCentreOfMass)*this.coefficientOfRestitution + velocity_xCentreOfMass;
        //finalVelY2=(finalVelY2-velocity_yCenterOfMass)*this.coefficientOfRestitution + velocity_yCenterOfMass;

        var finalVel1 = physicsEngine.getVector(finalVelX1, finalVelY1);
        var finalVel2 = physicsEngine.getVector(finalVelX2, finalVelY2);

        //console.log("Ball1 final velocity: " + finalVel1.toString());
        //console.log("Ball2 final velocity: " + finalVel2.toString());

        var finalMomentum1 = physicsEngine.getMomentum(ball1.mass, finalVel1);
        var finalMomentum2 = physicsEngine.getMomentum(ball2.mass, finalVel2);

        var changeInVel1 = physicsEngine.vectorSubtract(finalVel1, initialVel1);
        var changeInVel2 = physicsEngine.vectorSubtract(finalVel2, initialVel2);

        var acceleration1 = finalVel1.magnitude;
        var acceleration2 = finalVel2.magnitude;

        ball1.velocity = finalVel1.magnitude;
        ball1.direction = finalVel1.direction;
        ball1.acceleration = 0;

        ball2.velocity = finalVel2.magnitude;
        ball2.direction = finalVel2.direction;
        ball2.acceleration = 0;

    }

    function ballPositionShift(ball1, ball2){
    	var cpDistance = math.getDistanceBetweenTwoPoints(ball1.centerPoint, ball2.centerPoint);
    	var overlap = (ball1.radius + ball2.radius) - cpDistance;
    	var directionToGo = math.correctAngleToFirstCircle(ball1.direction + Math.PI);
    	var quadrant = math.getQuadrantByAngle(directionToGo);

    	var angleWithHoriz = math.getAngleWithQuadrant(directionToGo);

    	var x_disp = overlap*Math.cos(angleWithHoriz) + 1;
    	var y_disp = overlap*Math.sin(angleWithHoriz) + 1;

    	if (quadrant == 1){
    		ball1.centerPoint.x += x_disp;
    		ball1.centerPoint.y -= y_disp;
    	} else if (quadrant == 2){
    		ball1.centerPoint.x -= x_disp;
    		ball1.centerPoint.y -= y_disp;
    	} else if (quadrant == 3){
    		ball1.centerPoint.x -= x_disp;
    		ball1.centerPoint.y += y_disp;
    	} else {
    		ball1.centerPoint.x += x_disp;
    		ball1.centerPoint.y += y_disp;
    	}
    }

	//Distance between the centers of the balls only on y axis
	function getImpactParameter(ball1, ball2){
		return ball1.centerPoint.y - ball2.centerPoint.y;
	}

	function checkIfCollisionPairExists(ball1,ball2) {
		//console.log(collisionPairs.length);
		for (var i = 0; i < collisionPairs.length; i++) {
			if ((collisionPairs[i].id1 == ball1.id && collisionPairs[i].id2 == ball2.id) || (collisionPairs[i].id1 == ball2.id && collisionPairs[i].id2 == ball1.id)){
				return true;
			}
		}

		return false;
	}

	function removeCollisionPair(ball1,ball2){
		for (var i = 0; i< collisionPairs.length; i++){
			if ((collisionPairs[i].id1 == ball1.id && collisionPairs[i].id2 == ball2.id) || (collisionPairs[i].id1 == ball2.id && collisionPairs[i].id2 == ball1.id)){
				collisionPairs.splice(i,1);
			}
		}
	}
}
