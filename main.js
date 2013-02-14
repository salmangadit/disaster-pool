  // Globals
  /*const FPS = 30;
  const screenUpdateTime = 1000/FPS;*/
  //IE does not support const, so must use var
  var FPS = 30;
  var screenUpdateTime = 1000/FPS;

  // Canvas
  var canvas;
  var ctx;
  var logDiv;

  var hudCanvas;
  var hudCtx;

  var potCanvas;
  var potCtx;

  // Objects
  var logger = new Logger();
  var table = new Table();
  var math = new Maths();
  var renderingEngine = new Renderer();
  var physicsEngine = new Physics();
  var cueBall = new Ball(new Point(100,100), 23, 2);
  cueBall.id = 99;
  var shoot = new Movenhit();
  var tornado = new Tornado(new Point(500,250), 20);
  var debugMode = false;
  var degree = 0;
  var initialCollision = true;
  var hud = new HUD();

  // Players
  var players = new Array();
  players[0] = new Player(1);
  players[1] = new Player(2);

  // Manipulator
  var manipulator = new Manipulator();
  var collider = new Collider();

  function init(){
    logDiv = document.getElementById('logger');
    canvas = document.getElementById('gameCanvas');
    hudCanvas = document.getElementById('hudCanvas');
    potCanvas = document.getElementById('potCanvas');


    if (hudCanvas.getContext){
      hudCtx = hudCanvas.getContext('2d');
    }

    if (potCanvas.getContext){
      potCtx = potCanvas.getContext('2d');
    }    

    if (canvas.getContext){
      ctx = canvas.getContext('2d');
      renderingEngine.drawTable();
      players[0].isplaying = true;
      players[1].isplaying = false;
      shoot.setupmnh(false,true);
      setInterval(function () {
        renderingEngine.draw();
      }, screenUpdateTime);
      setInterval(function () {
        renderingEngine.updatePoints();
      }, screenUpdateTime);
      setInterval(function () {
        if (physicsEngine.ballsAtRest() == true) {
          initialCollision = true;
          tornado.onScreen = false;
        }
      }, screenUpdateTime);

      
      
      setInterval(function () {shoot.loadwindow();}, screenUpdateTime);

    document.addEventListener('keydown', function(event) {
      for (var i=0; i<players.length; i++) { 
        if((players[i].isplaying) && (players[i].hurrCount == 0) && (event.keyCode == 37)) {
          renderingEngine.hurricane(Math.PI);
          players[i].hurrCount++;
        } else if((players[i].isplaying) && (players[i].hurrCount == 0) && (event.keyCode == 39)) {
          renderingEngine.hurricane(0);
          players[i].hurrCount++;
        } else if((players[i].isplaying) && (players[i].hurrCount == 0) && (event.keyCode == 38)) {
          renderingEngine.hurricane(Math.PI*3/2);
          players[i].hurrCount++;
        }  else if((players[i].isplaying) && (players[i].hurrCount == 0) && (event.keyCode == 40)) {
          renderingEngine.hurricane(Math.PI/2);
          players[i].hurrCount++;
        } else if((players[i].isplaying) && (players[i].quakeCount == 0) && (event.keyCode == 90)) {
          //to trigger earthquake, press Z
          renderingEngine.earthquake();
          setTimeout(function(){physicsEngine.earthquakeEffect();}, 650);
          players[i].quakeCount++;
          //logger.log("Earthquake generated.");
        }
      }//end for
      /*keycode check for testing tornado*/
      if(event.keyCode == 88 && debugMode == true) {
        //to trigger tornado ON/OFF, press X
        if(tornado.onScreen == true){
          tornado.onScreen = false;
         // logger.log("Tornado shut off.");
        } else {
          //tornado.onScreen = true;
          //tornado generate on impluse test
          physicsEngine.tornadoGen(50, new Point(200, 100));
          logger.log("Drew Tornado, center "+ tornado.centerPoint.toString() + ", radius "+ tornado.radius);
        }
      }//end if(event.keyCode == 88)*/
    }/*end function*/);//end addEventListener
    }
  }