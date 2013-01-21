  // Globals
  const FPS = 30;
  const screenUpdateTime = 1000/FPS;

  // Canvas
  var canvas;
  var ctx;

  // Objects
  var table = new Table();
  var renderingEngine = new Renderer();
  var cueBall = new Ball(new Point(100,100), 10, 1);
  
  function init(){
  	canvas = document.getElementById('gameCanvas');
  	if (canvas.getContext){
  		ctx = canvas.getContext('2d');
  		renderingEngine.drawTable();
  		setInterval(function () {
  			renderingEngine.draw();
  		}, screenUpdateTime);
  		setInterval(function () {
  			renderingEngine.updatePoints();
  		}, screenUpdateTime);

  		var physics = new Physics();
  		cueBall = physics.applyForceAtAngle(cueBall, 20, 0);
  	}
  }