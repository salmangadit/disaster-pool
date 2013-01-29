function Renderer(){
	var ballsPosXToClear = new Array();
	var ballsPosYToClear = new Array();
	var ballsRadToClear = new Array();

	this.updatePoints = function(){
		var balls = table.getBalls();
		ballsPosXToClear.length = 0;
		ballsPosYToClear.length = 0;
		ballsRadToClear.length = 0;

		for (var i=0;i<balls.length;i++){
			//this.clearBall(balls[i]);
			ballsPosXToClear.push(balls[i].centerPoint.x);
			ballsPosYToClear.push(balls[i].centerPoint.y);
			ballsRadToClear.push(balls[i].radius);
			balls[i] = physicsEngine.updatePoint(balls[i]);
			collider.detectCollisionWithWalls(balls[i]);
			collider.detectCollisionWithBalls(balls[i]);
			collider.detectCollisionWithTornado(tornadoTest);
		}

		table.setBalls(balls);

		// Cue ball
		//this.clearBall(cueBall);
		ballsPosXToClear.push(cueBall.centerPoint.x);
		ballsPosYToClear.push(cueBall.centerPoint.y);
		ballsRadToClear.push(cueBall.radius);
		cueBall = physicsEngine.updatePoint(cueBall);
		collider.detectCollisionWithWalls(cueBall);
		collider.detectCollisionWithBalls(cueBall); 
	}

	this.drawTable = function (){
		canvas.width = table.width;
		canvas.height = table.height;
	}

	this.clearBall = function(x, y, radius){
		ctx.clearRect(x - radius - 1, 
			y - radius - 1, radius * 2 + 2, radius * 2 + 2);
	}

	this.clearBalls = function(){
		for (var i = 0; i<ballsPosXToClear.length; i++){
			this.clearBall(ballsPosXToClear[i],ballsPosYToClear[i],ballsRadToClear[i]);
		}
	}

	this.draw = function(){
		//this.clearBalls();
		this.drawTable();
		this.drawBalls();

		// Draw cue ball
		this.drawBall(cueBall);

        //Draw tornado
	    this.drawTornado(tornadoTest);
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

		if(debugMode == true){
	    	var stringToSend = "Vel:"+ball.velocity;
	    	var ballX = ball.centerPoint.x + ball.radius;
	    	var ballY = ball.centerPoint.y;
	    	var pointToDisplay = new Point(ballX, ballY);
	    	this.writeText(stringToSend, pointToDisplay);
	    	pointToDisplay.y += 10;
	    	stringToSend = "Dir:"+ball.direction;
	    	this.writeText(stringToSend, pointToDisplay);
	    	pointToDisplay.y += 10;
	    	stringToSend = "Acc:"+ball.acceleration;
	    	this.writeText(stringToSend, pointToDisplay);
	    	pointToDisplay.y += 10;
	    	stringToSend = "Spin:"+ball.tornadoEffect;
	    	this.writeText(stringToSend, pointToDisplay);
	    }

		console.log("Drew Ball, center "+ ball.centerPoint.toString() + ", radius "+ ball.radius);
	}

    this.drawTornado = function (tornado) {
	    //alert('Drawing tornado!');
	    ctx.beginPath();
	    ctx.arc(tornado.centerPoint.x, tornado.centerPoint.y, tornado.radius, 0, 2 * Math.PI, false);

	    // create radial gradient
	    var grd = ctx.createRadialGradient(tornado.centerPoint.x, tornado.centerPoint.y, 0, tornado.centerPoint.x, tornado.centerPoint.y, tornado.radius);
	    grd.addColorStop(0, 'ghostwhite');
	    grd.addColorStop(0.2, 'dimgray');
	    grd.addColorStop(0.4, 'grey');
	    grd.addColorStop(1, 'lightsteelblue');

	    ctx.fillStyle = grd;
	    ctx.fill();

	    if(debugMode == true){
	    	var stringToSend = "Str:"+tornado.strength;
	    	var tornadoX = tornado.centerPoint.x + tornado.radius;
	    	var tornadoY = tornado.centerPoint.y;
	    	var pointToDisplay = new Point(tornadoX, tornadoY);
	    	this.writeText(stringToSend, pointToDisplay);
	    }

        console.log("Drew Tornado, center "+ tornado.centerPoint.toString() + ", radius "+ tornado.radius);
	}

	this.writeText = function (myString, myPoint) {
		ctx.fillStyle = "black";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}
}