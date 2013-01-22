function Renderer(){
	this.updatePoints = function(){
		var balls = table.getBalls();

		for (var i=0;i<balls.length;i++){
			balls[i] = physicsEngine.updatePoint(balls[i]);
			collider.detectCollisionWithWalls(balls[i]);
			collider.detectCollisionWithBalls(balls[i]);  
		}

		table.setBalls(balls);

		// Cue ball
		cueBall = physicsEngine.updatePoint(cueBall);
		collider.detectCollisionWithWalls(cueBall);
		collider.detectCollisionWithBalls(cueBall); 
	}

	this.drawTable = function (){
		canvas.width = table.width;
		canvas.height = table.height;
	}

	this.draw = function(){
		this.drawBalls();

		// Draw cue ball
		this.drawBall(cueBall);
	}

	this.drawBalls = function(){
		var balls = table.getBalls();

		for (var i=0;i<balls.length;i++){
			this.drawBall(balls[i]);  
		}

		console.log("Drew "+ balls.length + " balls");
	}

	this.drawBall = function(ball){
		ctx.beginPath();
		ctx.arc(ball.centerPoint.x, ball.centerPoint.y, ball.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = ball.color;
		ctx.fill();
		ctx.lineWidth = 1;

		ctx.strokeStyle = '#000000';
		ctx.stroke();

		console.log("Drew Ball, center "+ ball.centerPoint.toString() + ", radius "+ ball.radius);
	}
}