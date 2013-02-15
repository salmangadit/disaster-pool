
function Renderer(){
	var ballsPosXToClear = new Array();
	var ballsPosYToClear = new Array();
	var ballsRadToClear = new Array();
	var ctr = 0;

	this.updatePoints = function(){
		var balls = table.getBalls();
		ballsPosXToClear.length = 0;
		ballsPosYToClear.length = 0;
		ballsRadToClear.length = 0;

		manipulator.checkManipulation();

		for (var i=0;i<balls.length;i++){
			//this.clearBall(balls[i]);

			if(!balls[i].potted) {
				ballsPosXToClear.push(balls[i].centerPoint.x);
				ballsPosYToClear.push(balls[i].centerPoint.y);
				ballsRadToClear.push(balls[i].radius);

				balls[i] = physicsEngine.updatePoint(balls[i]);


				collider.detectCollisionWithWalls(balls[i]);
				collider.detectCollisionWithBalls(balls[i]);
				collider.detectPotting(balls[i]);
			}
		}

		table.setBalls(balls);

		// Cue ball
		//this.clearBall(cueBall);
		if(!cueBall.potted) {
			ballsPosXToClear.push(cueBall.centerPoint.x);
			ballsPosYToClear.push(cueBall.centerPoint.y);
			ballsRadToClear.push(cueBall.radius);
			cueBall = physicsEngine.updatePoint(cueBall);

			collider.detectCollisionWithWalls(cueBall);
			collider.detectCollisionWithBalls(cueBall); 
			collider.detectCollisionWithTornado(tornado);
			collider.detectPotting(cueBall);
		}

		/*Lionel(A0073872)*/
		if (physicsEngine.ballsAtRest() == true) {
			initialCollision = true;
			tornado.onScreen = false;
		}
		/*end Lionel(A0073872)*/
	}

	this.drawTable = function (){
		canvas.width = table.width;
		canvas.height = table.height;

		/*Lionel(A0073872)*/
		/*for earthquake*/
		// move registration point to the center of the canvas
		ctx.translate(table.width/2, table.height/2);
		// rotate canvas by set degree[s]
		ctx.rotate(degree);
		// move registration point back to the top left corner of canvas
		ctx.translate(-table.width/2, -table.height/2);
		/*Lionel(A0073872)*/

		for (var i = 0; i<table.regions.length; i++){
			ctx.fillStyle = table.regions[i].color;
			ctx.fillRect(table.regions[i].x, table.regions[i].y, table.regions[i].width, table.regions[i].height);
		}

		//drawing holes
		var holes = table.getHoles();

		for (var i=0; i<holes.length; i++) {
			this.drawHole(holes[i]);
		}

		//drawing the starting line
		ctx.beginPath();
		ctx.moveTo(300, 0);
		ctx.lineTo(300, 500);
		ctx.stroke();
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#0B3B0B";
		ctx.stroke();
	}

	this.drawHole = function(hole){
		ctx.beginPath();
		ctx.arc(hole.centerPoint.x, hole.centerPoint.y, hole.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = hole.color;
		ctx.fill();
		ctx.lineWidth = 1;

		ctx.strokeStyle = '#000000';
		ctx.stroke();

	}

	this.drawHoles = function(){
		var holes = table.getHoles();

		for (var i=0;i<holes.length;i++){
			this.drawHole(holes[i]);  
		}
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
		this.drawHoles();
		this.drawBalls();
		hud.updateHUD();

		// Draw cue ball
		if(!cueBall.potted){
			this.drawBall(cueBall);
		}

        /*Lionel(A0073872)*/
        //Draw tornado
        if(tornado.onScreen == true){
        	this.drawTornado(tornado);
	    }//end if

	    if(showPlayerOne == true && players[0].isplaying == true){
	    	ctx.fillStyle = "coral";
	    	ctx.font = "bold 100px Iceland";
	    	ctx.fillText("P1 turn", 320, 250);
	    	setTimeout(function(){
	    		showPlayerOne = false;
	    		showPlayerTwo = true;
	    	}, 1000);
	    } else if(showPlayerTwo == true && players[1].isplaying == true){
	    	ctx.fillStyle = "cadetblue";
	    	ctx.font = "bold 100px Iceland";
	    	ctx.fillText("P2 turn", 350, 250);
	    	setTimeout(function(){
	    		showPlayerOne = true;
	    		showPlayerTwo = false;
	    	}, 1000);
	    }//end if-else
	    /*end Lionel(A0073872)*/
	}

	this.drawBalls = function(){
		var balls = table.getBalls();

		for (var i=0;i<balls.length;i++){
			this.drawBall(balls[i]);  
		}

		//console.log("Drew "+ balls.length + " balls");
	}

	this.drawBall = function(ball){
		if(!ball.potted || ball.id == 99){
		ctx.beginPath();
		ctx.arc(ball.centerPoint.x, ball.centerPoint.y, ball.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = ball.color;
		ctx.fill();
		ctx.lineWidth = 1;

		ctx.strokeStyle = '#000000';
		ctx.stroke();
						}
		else
		{
		potCtx.beginPath();
		potCtx.arc(ball.centerPoint.x-2000, ball.centerPoint.y+50, ball.radius*0.7, 0, 2 * Math.PI, false);
		potCtx.fillStyle = ball.color;
		potCtx.fill();
		potCtx.lineWidth = 1;

		potCtx.strokeStyle = '#000000';
		potCtx.stroke();

		}
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
			stringToSend = "Spin:"+ball.spin;
			this.writeText(stringToSend, pointToDisplay);

			pointToDisplay.y = ball.centerPoint.y-3;
			pointToDisplay.x = ball.centerPoint.x-4;
			stringToSend = ball.id;
			this.writeText(stringToSend, pointToDisplay);
	    	// Draw arrow of velocity

	    	var endX = ball.centerPoint.x + ball.velocity * Math.cos(ball.direction);
	    	var endY = ball.centerPoint.y + ball.velocity * Math.sin(ball.direction);
	    	ctx.beginPath();
	    	ctx.moveTo(ball.centerPoint.x,ball.centerPoint.y);
	    	ctx.lineTo(endX,endY);
	    	ctx.lineWidth = 5;
	    	ctx.strokeStyle = 'red';
	    	ctx.stroke();

	    	var horizX = ball.centerPoint.x - 45;
	    	var horizY = ball.centerPoint.x + 45;
	    	ctx.beginPath();
	    	ctx.moveTo(horizX,ball.centerPoint.y);
	    	ctx.lineTo(horizY,ball.centerPoint.y);
	    	ctx.lineWidth = 1;
	    	ctx.strokeStyle = 'black';
	    	ctx.stroke();

	    	var vertX = ball.centerPoint.y - 45;
	    	var vertY = ball.centerPoint.y + 45;
	    	ctx.beginPath();
	    	ctx.moveTo(ball.centerPoint.x,vertX);
	    	ctx.lineTo(ball.centerPoint.x,vertY);
	    	ctx.lineWidth = 0.5;
	    	ctx.strokeStyle = 'blue';
	    	ctx.stroke();
	    }//end if(debugMode == true)

		//console.log("Drew Ball, center "+ ball.centerPoint.toString() + ", radius "+ ball.radius);
	}

	/*Lionel(A0073872)*/
	/*drawTornado function using png file*/
	this.drawTornado = function (tornado) {
		var imgX = tornado.centerPoint.x - tornado.radius;
		var imgY = tornado.centerPoint.y - tornado.radius;
		var imgSize = tornado.radius * 2;
		var drawing = new Image();
		drawing.src = "tornado_v2.png";
		ctr = this.tornadoRotation(ctr);
		//to create spinning effect of tornado
		this.drawImageRot(drawing, imgX, imgY, imgSize, imgSize, ctr);
	    //tornado stats for debug mode
	    if(debugMode == true){
	    	var stringToSend = "Str:"+tornado.strength;
	    	var tornadoX = tornado.centerPoint.x + tornado.radius;
	    	var tornadoY = tornado.centerPoint.y;
	    	var pointToDisplay = new Point(tornadoX, tornadoY);
	    	this.writeText(stringToSend, pointToDisplay);
	    }
	}//end drawTornado*/

	/*rotate image function*/
	this.drawImageRot = function(img,x,y,width,height,deg){
		var rad = deg * Math.PI / 180;
	    //Set the origin to the center of the image
	    ctx.translate(x + width / 2, y + height / 2);
	    //Rotate the canvas around the origin
	    ctx.rotate(rad);
	    //draw the image    
	    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
	    //reset the canvas  
	    ctx.rotate(rad * ( -1 ) );
	    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
	}//end drawImageRot*/

	/*to control the spinning rate of the tornado*/
	this.tornadoRotation = function(ctr){
		if(ctr == 360){
			ctr = 0;
		} else {
	    	//increment ctr more to speed up tornado
	    	ctr += 10;
	    }//end if-else
	    return ctr;
	}//end tornadoRotation*/

	/*write text to the canvas*/
	this.writeText = function (myString, myPoint) {
		ctx.fillStyle = "black";
		ctx.font = "bold 10px Arial";
		ctx.fillText(myString, myPoint.x, myPoint.y);
	}//end writeText*/

	/*generates the earthquake*/
	this.earthquake = function () {
		//for creating shaking movement
		var oneDegree = (Math.PI/180);
		setTimeout(function(){
			degree = oneDegree*20;
			setTimeout(function(){
				degree = oneDegree*340;
				setTimeout(function(){
					degree = oneDegree*20;
					setTimeout(function(){
						degree = oneDegree*340;
						setTimeout(function(){
							degree = oneDegree*20;
							setTimeout(function(){
								degree = oneDegree*340;
								setTimeout(function(){
									degree = oneDegree*20;
									setTimeout(function(){
										degree = oneDegree*0;
									}, 50);
								}, 50);
							}, 50);
						}, 50);
					}, 50);
				}, 50);
			}, 50);
		}, 500);
	}//end earthquake*/
	/*end Lionel(A0073872)*/

	this.hurricane = function (direction) {

		var balls = table.getBalls();

		//big and medium balls
		for (var i=0; i<=8; i++) {
			balls[i] = physicsEngine.applyForceAtAngle(balls[i], 150, direction);
		}

		//small balls
		for (i=9; i<balls.length; i++) {
			balls[i] = physicsEngine.applyForceAtAngle(balls[i], 120, direction);
		}


		cueBall = physicsEngine.applyForceAtAngle(cueBall, 150, direction);

		//console.log("Hurricane is applied at " + direction);
	}
}