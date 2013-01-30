  // Globals
  const FPS = 30;
  const screenUpdateTime = 1000/FPS;

  // Canvas
  var canvas;
  var ctx;
  var logDiv;

  // Objects
  var logger = new Logger();
  var table = new Table();
  var math = new Maths();
  var renderingEngine = new Renderer();
  var physicsEngine = new Physics();
  var collider = new Collider();
  var cueBall = new Ball(new Point(100,100), 23, 2);
  var shoot = new Movenhit();
  var tornadoTest = new Tornado(new Point(500,250), 25);
  var debugMode = false;
  

  function init(){
    logDiv = document.getElementById('logger');
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
      setInterval(function () {shoot.loadwindow();}, screenUpdateTime);

  		

      // Ball - Force - Angle of hitting
  		//cueBall = physicsEngine.applyForceAtAngle(cueBall, 400,0.1);
  	}
  }