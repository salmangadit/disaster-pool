  // Globals
  const FPS = 30;
  const screenUpdateTime = 1000/FPS;

  // Canvas
  var canvas;
  var ctx;

  // Objects
  var table = new Table();
  var math = new Maths();
  var renderingEngine = new Renderer();
  var physicsEngine = new Physics();
  var collider = new Collider();
  var cueBall = new Ball(new Point(100,100), 10, 1);
  //var tornadoTest = new Tornado(new Point(500,250), 50);

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

  		

      // Ball - Force - Angle of hitting
  		cueBall = physicsEngine.applyForceAtAngle(cueBall, 400,0.1);
  	}
  }