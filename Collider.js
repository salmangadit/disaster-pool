function Collider(){
	this.detectCollisionWithWalls = function(ball){
		var tableWidth = table.width;
		var tableHeight = table.height;

		if (((ball.centerPoint.x + ball.radius) >= table.width)){
			alert('Ball hit right wall!');
			ball.stop();
		}
		else if (((ball.centerPoint.y + ball.radius) >= table.height)){
			alert('Ball hit bottom wall');
			ball.stop();
		}
		else if (((ball.centerPoint.y - ball.radius) <= 0)){
			alert('Ball hit top wall');
			ball.stop();
		}
		else if (((ball.centerPoint.x - ball.radius) <= 0)){
			alert('Ball hit left wall');
			ball.stop();
		}
	}

	this.detectCollisionWithBalls = function(ball){
		var balls = table.getBalls();

		for (var i=0; i<balls.length; i++){
			var centerPointDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, balls[i].centerPoint);

			if (centerPointDistance != 0 && centerPointDistance <= (ball.radius + balls[i].radius) ){
				alert('ball collision!');
				ball.stop();
				return true;
			}
		}

		// Check with cueball
		var centerPointDistance = math.getDistanceBetweenTwoPoints(ball.centerPoint, cueBall.centerPoint);

		if (centerPointDistance != 0 && centerPointDistance <= (ball.radius + cueBall.radius) ){
			alert('ball collision!');
			ball.stop();
			return true;
		}

		return false;
	}
}