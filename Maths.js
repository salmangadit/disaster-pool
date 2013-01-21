function Maths(){
	this.calculatePointInCircumference = function(ball, angularPoint){
		var resultPoint = new Point(0,0);

		var angleInQuadrant = this.getAngleWithQuadrant(angularPoint);
		var quadrant = this.getQuadrantByAngle(angularPoint);

		var displace_x = ball.radius*Math.cos(angleInQuadrant);
		var displace_y = ball.radius*Math.sin(angleInQuadrant);

		if (quadrant == 1){
			resultPoint.x = ball.centerPoint.x + displace_x;
			resultPoint.y = ball.centerPoint.y - displace_y;
		} else if (quadrant == 2){
			resultPoint.x = ball.centerPoint.x - displace_x;
			resultPoint.y = ball.centerPoint.y - displace_y;
		} else if (quadrant == 3){
			resultPoint.x = ball.centerPoint.x - displace_x;
			resultPoint.y = ball.centerPoint.y + displace_y;
		} else {
			resultPoint.x = ball.centerPoint.x + displace_x;
			resultPoint.y = ball.centerPoint.y + displace_y;
		}

		resultPoint = this.roundPoint(resultPoint);

		return resultPoint;
	}

	this.getAngleFromCollisionPoint = function(ball, point){
		var quadrant = this.getQuadrantByPoint(ball.centerPoint.x - point.x, ball.centerPoint.y - point.y);
		var angle;
		if (quadrant == 1 || quadrant == 4){
			angle = Math.asin((point.x-ball.centerPoint.x)/ball.radius);
		}
		else{
			angle = Math.asin((ball.centerPoint.x-point.x)/ball.radius);
		}

		angle = Math.round(angle*100)/100;
		return angle;
	}

	this.getQuadrantByPoint = function(xDiff,yDiff){
		if (xDiff >= 0){
			if (yDiff >= 0){
				return 4;
			}
			else if (yDiff < 0){
				return 1;
			}
		}
		else{
			if (yDiff >= 0){
				return 3;
			}
			else if (yDiff < 0){
				return 2;
			}
		}
	}

	this.roundPoint = function(point, dp){
		var rounded = new Point(0,0);
		rounded.x = Math.round(point.x*100)/100;
		rounded.y = Math.round(point.y*100)/100;
		return rounded;
	}

	this.getAngleWithQuadrant = function(angle){
		if (angle >= 0 && angle <= Math.PI/2){
			return angle;
		}
		else if (angle > Math.PI/2 && angle <= Math.PI){
			return Math.PI-angle;
		}
		else if (angle > Math.PI && angle <= (3*Math.PI)/2){
			return angle - Math.PI;
		}
		else {
			return (2*Math.PI) - angle;
		}
	}

	this.getQuadrantByAngle = function(angle){
		if (angle >= 0 && angle <= Math.PI/2){
			return 4;
		}
		else if (angle > Math.PI/2 && angle <= Math.PI){
			return 3;
		}
		else if (angle > Math.PI && angle <= (3*Math.PI)/2){
			return 2;
		}
		else {
			return 1;
		}
	}
}