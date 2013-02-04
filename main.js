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
  cueBall.id = 99;
  var shoot = new Movenhit();
  var tornado = new Tornado(new Point(500,250), 25);
  var debugMode = false;
  var degree = 0;
  

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
      shoot.setupmnh(false,true);
      setInterval(function () {shoot.loadwindow();}, screenUpdateTime);
      
      //setTimeout(function(){degree = (Math.PI/180)*340;}, 50);
      setTimeout(function(){
        renderingEngine.earthquake();
      }, 500);

      // to test if tornado will disappear after it comes out
      //setTimeout(function () {tornado.onScreen=true;}, 3000);

      // Ball - Force - Angle of hitting
      //cueBall = physicsEngine.applyForceAtAngle(cueBall, 80,0);


    //to trigger the hurricane
    document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        renderingEngine.hurricane(Math.PI);
    }
    else if(event.keyCode == 39) {
        alert('Right was pressed');
    }
    else if(event.keyCode == 38) {
        alert('Up was pressed');
    }
    else if(event.keyCode == 40) {
        alert('Down was pressed');
    }
    });
    }
  }