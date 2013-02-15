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
			//logger.log('Ball hit right wall!');
			this.performCollisionWithWall(ball, 1);
		}
		else if (((ball.centerPoint.y + ball.radius) >= table.height)){
			//logger.log('Ball hit bottom wall');
			this.performCollisionWithWall(ball, 2);
		}
		else if (((ball.centerPoint.y - ball.radius) <= 0)){
			//logger.log('Ball hit top wall');
			this.performCollisionWithWall(ball,4);
		}
		else if (((ball.centerPoint.x - ball.radius) <= 0)){
			//logger.log('Ball hit left wall');
			this.performCollisionWithWall(ball,3);
		}
	}

	this.detectCollisionWithWallsBoolean = function(ball) {
		var tableWidth = table.width;
		var tableHeight = table.height;

		if (((ball.centerPoint.x + ball.radius) >= table.width)){
			//logger.log('Ball hit right wall!');
			return true;
		}
		else if (((ball.centerPoint.y + ball.radius) >= table.height)){
			//logger.log('Ball hit bottom wall');
			return true;
		}
		else if (((ball.centerPoint.y - ball.radius) <= 0)){
			//logger.log('Ball hit top wall');
			return true;
		}
		else if (((ball.centerPoint.x - ball.radius) <= 0)){
			//logger.log('Ball hit left wall');
			return true;
		}
	}	

	this.detectCollisionWithBalls = function(ball){
		var balls = table.getBalls();

		for (var i=0; i<balls.length; i++){
			if (ball.id == balls[i].id){
				continue;
			}//end if(ball.id == balls[i].id)

			if(this.detectBallToBallCollision(ball, balls[i])) {
				if (!checkIfCollisionPairExists(ball, balls[i])) {
					collisionPairs.push(new CollisionPair(ball.id, balls[i].id));
					this.performCollisionBetweenBalls(ball,balls[i]);
					cleanseOverlap(ball);
				} else {
					ballPositionShift(ball, balls[i]);
				}//end if-else(!checkIfCollisionPairExists(ball, balls[i]))
			} else {
				//console.log(collisionPairs.length);
				removeCollisionPair(ball, balls[i]);
			}//end if-else(this.detectBallToBallCollision(ball, balls[i]))
		}//end for

		// Check with cueball
		if(this.detectBallToBallCollision(ball, cueBall)){
			if (!checkIfCollisionPairExists(ball,cueBall)) {
				collisionPairs.push(new CollisionPair(ball.id, cueBall.id));
				this.performCollisionBetweenBalls(ball,cueBall);
				cleanseOverlap(cueBall);
			} else{
				ballPositionShift(ball, cueBall);
			}//end if-else(!checkIfCollisionPairExists(ball,cueBall))
		} else {
			removeCollisionPair(ball, cueBall);
		}//end if-else(this.detectBallToBallCollision(ball, cueBall))
	}

	this.detectPotting = function(ball){
		var holes = table.getHoles();
		for (var i=0; i<holes.length; i++){
			var centerPointDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, holes[i].centerPoint);
			if (centerPointDistance <= holes[i].radius) {
				//logger.log('ball potted!');
				ball.potted = true;
				for(var i=0;i<players.length;i++){
					if(players[i].isplaying) {
						//check if cueball is potted and if it is dont add to potting
						if(ball.id != 99){
							players[i].ballsPotted.push(ball.id);
						}//end if(ball.id != 99)
					}//end if(players[i].isplaying)
				}//end for(var i=0;i<players.length;i++)
				ball.stop();

				if(players[0].isplaying)
				{
					ball.centerPoint.x = 2035;
					ball.centerPoint.y = players[0].ballplacingoffsety;

					if(ball.id !=99)
					{
							players[0].ballplacingoffsety += 50;
					}
				} //end if (players[0].isplaying)
				else
				{
					ball.centerPoint.x = 2105;
					ball.centerPoint.y = players[1].ballplacingoffsety;

					if(ball.id !=99)
					{

							players[1].ballplacingoffsety += 50;

					}
				}
			}//end if(centerPointDistance <= holes[i].radius)
		}//end for(var i=0; i<holes.length; i++)
	}

	this.detectBallToBallCollision = function(ball1, ball2){
		var centerPointDistance = math.getDistanceBetweenTwoPoints(ball1.centerPoint, ball2.centerPoint);
		if (centerPointDistance != 0 && centerPointDistance < (ball1.radius + ball2.radius) ){
			/*Lionel(A0073872)*/
			if((ball1.id == 99 || ball2.id == 99 ) && initialCollision == true){
				//get impact force
				var impactForce = 50;
				//var impactPoint = new Point(200, 100);
				if (ball1.id == 99) {
					var impactPoint = ball1.centerPoint;
				} else {
					var impactPoint = ball2.centerPoint;
				}
				//call tornadoGen
				physicsEngine.tornadoGen(impactForce, impactPoint);
				initialCollision = false;
				//logger.log("Drew Tornado, center "+ tornado.centerPoint.toString() + ", radius "+ tornado.radius);
			}//end if(initialCollision == true)*/
			/*end Lionel(A0073872)*/
			return true;
		}
		return false;
	}

	this.performCollisionWithWall = function(ball, wall){
		var angleWithHoriz = math.getAngleWithQuadrant(ball.direction);
		var quadrant = math.getQuadrantByAngle(ball.direction);

		if (wall == 1){
			if (quadrant == 1||quadrant == 3){
				ball.direction = Math.PI+angleWithHoriz;
			} else if (quadrant == 4||quadrant == 2){
				ball.direction = Math.PI-angleWithHoriz;
			} 
		} else if (wall == 2){
			if (quadrant == 3 || quadrant == 1){
				ball.direction = Math.PI+angleWithHoriz;
			} else if (quadrant == 4 || quadrant == 2){
				ball.direction = (2*Math.PI)-angleWithHoriz;
			}
		} else if (wall == 3){
			if (quadrant == 2 || quadrant == 4){
				ball.direction = (2*Math.PI)-angleWithHoriz;
			} else if (quadrant == 3 || quadrant == 1){
				ball.direction = angleWithHoriz;
			}
		} else {
			if (quadrant == 1 || quadrant == 3){
				ball.direction = angleWithHoriz;
			} else if (quadrant == 2 || quadrant == 4){
				ball.direction = Math.PI-angleWithHoriz;
			}
		}
	}

	/*Lionel(A0073872)*/
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
	/*end Lionel(A0073872)*/

	this.performCollisionBetweenBalls = function(ball1, ball2){
		 //while (this.detectBallToBallCollision(ball1, ball2)){
		ballPositionShift(ball1, ball2);
		 //}

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
		if (impactParameter_x == 0){
			impactParameter_x = 1;
		}
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
       	finalVelX1=(finalVelX1-velocity_xCentreOfMass)*this.coefficientOfRestitution + velocity_xCentreOfMass;
       	finalVelY1=(finalVelY1-velocity_yCenterOfMass)*this.coefficientOfRestitution + velocity_yCenterOfMass;
       	finalVelX2=(finalVelX2-velocity_xCentreOfMass)*this.coefficientOfRestitution + velocity_xCentreOfMass;
       	finalVelY2=(finalVelY2-velocity_yCenterOfMass)*this.coefficientOfRestitution + velocity_yCenterOfMass;

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

        //manipulator.checkManipulation();
        if (manipulator.check()){
        	if (ball1.id == 99){
        		performCollisionManipulation(ball2);
        	} else if (ball2.id == 99){
        		performCollisionManipulation(ball1);
        	}
        }
    }

    function performCollisionManipulation(ball){
    	var holes = table.getHoles();
    	for (var i =0; i<holes.length; i++){
    		var holeDirection = math.getAngleFromCollisionPoint(ball, holes[i].centerPoint);
    		var toleranceMin = holeDirection - (Math.PI/4);
    		var toleranceMax = holeDirection + (Math.PI/4);

    		if ((ball.direction >= toleranceMin) && (ball.direction <= toleranceMax)){
    			logger.log("Result ball manipulated!");
    			ball.direction = holeDirection;
    		}
    	}
    }

    function ballPositionShift(ball1, ball2){
    	var cpDistance = math.getDistanceBetweenTwoPoints(ball1.centerPoint, ball2.centerPoint);
    	var overlap = (ball1.radius + ball2.radius) - cpDistance;
    	var directionToGo = 0;
    	if (ball1.velocity >= ball2.velocity){
    		directionToGo = math.correctAngleToFirstCircle(ball1.direction + Math.PI);
		} else {
			directionToGo = math.correctAngleToFirstCircle(ball2.direction + Math.PI);
		}

    	var quadrant = math.getQuadrantByAngle(directionToGo);

    	var angleWithHoriz = math.getAngleWithQuadrant(directionToGo);

    	var x_disp = overlap*Math.cos(angleWithHoriz) + 1;
    	var y_disp = overlap*Math.sin(angleWithHoriz) + 1;

    	if (ball1.velocity >= ball2.velocity){
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
    	} else {
    		if (quadrant == 1){
	    		ball2.centerPoint.x += x_disp;
	    		ball2.centerPoint.y -= y_disp;
	    	} else if (quadrant == 2){
	    		ball2.centerPoint.x -= x_disp;
	    		ball2.centerPoint.y -= y_disp;
	    	} else if (quadrant == 3){
	    		ball2.centerPoint.x -= x_disp;
	    		ball2.centerPoint.y += y_disp;
	    	} else {
	    		ball2.centerPoint.x += x_disp;
	    		ball2.centerPoint.y += y_disp;
	    	}
    	}
    }

    function cleanseOverlap(ball){
    	var balls = table.getBalls();

    	for (var i=0; i<balls.length; i++){
    		if (balls[i].id == ball.id){
    			continue;
    		}
    		 cleanse(ball, balls[i]);
    	}

    	if (ball.id != 99){
    		cleanse(ball, cueBall);
    	}
    }

    function cleanse(ball, ballI){
    	var cpDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, ballI.centerPoint);
    		var overlap = (ball.radius + ballI.radius) - cpDistance;

    		if (overlap > 0){
    			var quad1=0, quad2=0, quad3=0, quad4=0;
    			var quad1min=-1*Number.MAX_VALUE, quad2min=-1*Number.MAX_VALUE, quad3min=-1*Number.MAX_VALUE, quad4min=-1*Number.MAX_VALUE;
    			var balls = table.getBalls();
    			//perform density scan for best match spot
    			for (var j=0; j<balls.length; j++){
    				if (balls[j].id == ball.id){
    					continue;
    				}
    				var resCpDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, balls[j].centerPoint);
    				var resOverlap = (ball.radius + balls[j].radius) - resCpDistance;

    				if (balls[j].centerPoint.x > ball.centerPoint.x && balls[j].centerPoint.y > ball.centerPoint.y ){
    					quad4++;
    					if (resOverlap > quad4min){
    						quad4min = resOverlap;
    					}
    				} else if (balls[j].centerPoint.x > ball.centerPoint.x && balls[j].centerPoint.y < ball.centerPoint.y ){
    					quad1++;
    					if (resOverlap > quad1min){
    						quad1min = resOverlap;
    					}
    				} else if (balls[j].centerPoint.x < ball.centerPoint.x && balls[j].centerPoint.y > ball.centerPoint.y ){
    					quad3++;
    					if (resOverlap > quad3min){
    						quad3min = resOverlap;
    					}
    				} else if (balls[j].centerPoint.x < ball.centerPoint.x && balls[j].centerPoint.y < ball.centerPoint.y ){
    					quad2++;
    					if (resOverlap > quad2min){
    						quad2min = resOverlap;
    					}
    				} 
    			}

    			var resCpDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint,cueBall.centerPoint);
    			var resOverlap = (ball.radius + cueBall.radius) - resCpDistance;

    			if (ball.id != 99){
    				if (cueBall.centerPoint.x > ball.centerPoint.x && cueBall.centerPoint.y > ball.centerPoint.y ){
    					quad4++;
    					if (resOverlap > quad4min){
    						quad4min = resOverlap;
    					}
    				} else if (cueBall.centerPoint.x > ball.centerPoint.x && cueBall.centerPoint.y < ball.centerPoint.y ){
    					quad1++;
    					if (resOverlap > quad1min){
    						quad1min = resOverlap;
    					}
    				} else if (cueBall.centerPoint.x < ball.centerPoint.x && cueBall.centerPoint.y > ball.centerPoint.y ){
    					quad3++;
    					if (resOverlap > quad3min){
    						quad3min = resOverlap;
    					}
    				} else if (cueBall.centerPoint.x < ball.centerPoint.x && cueBall.centerPoint.y < ball.centerPoint.y ){
    					quad2++;
    					if (resOverlap > quad2min){
    						quad2min = resOverlap;
    					}
    				} 
    			}

    			var min = Math.min(quad1, quad2, quad3, quad4);
    			var minOverlap = Math.min(quad1min, quad2min, quad3min, quad4min);

    			var x_disp = overlap*Math.cos(Math.PI/4) + 1;
    			var y_disp = overlap*Math.sin(Math.PI/4) + 1;

    			if (minOverlap == quad1min){
    				ball.centerPoint.x += x_disp;
	    			ball.centerPoint.y -= y_disp;
    			} else if (minOverlap == quad2min){
    				ball.centerPoint.x -= x_disp;
	    			ball.centerPoint.y -= y_disp;
    			} else if (minOverlap == quad3min){
    				ball.centerPoint.x -= x_disp;
	    			ball.centerPoint.y += y_disp;
    			} else if (minOverlap == quad4min){
    				ball.centerPoint.x += x_disp;
	    			ball.centerPoint.y += y_disp;
    			}  
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
