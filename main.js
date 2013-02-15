  // Globals
  /*const FPS = 30;
  const screenUpdateTime = 1000/FPS;*/
  /*Lionel(A0073872)*/
  //IE does not support const, so must use var
  var FPS = 30;
  var screenUpdateTime = 1000/FPS;
  /*end Lionel(A0073872)*/

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
  var hud = new HUD();

  /*Lionel(A0073872)*/
  var tornado = new Tornado(new Point(500,250), 20);
  var debugMode = false;
  var degree = 0;
  var initialCollision = true;
  var tornadoCurrent = 0;
  var tornadoCtr = 0;
  /*end Lionel(A0073872)*/

  // Players
  var players = new Array();
  players[0] = new Player(1);
  players[1] = new Player(2);
  var showPlayerOne = true;
  var showPlayerTwo = false;

  // Manipulator
  var manipulator = new Manipulator();
  var collider = new Collider();

  /*Lionel(A0073872)*/
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
          })();
  // usage:
  // instead of setInterval(render, 16) ....
  (function animloop(){
    requestAnimFrame(animloop);
    renderingEngine.draw();
  })();
  /*end Lionel(A0073872)*/


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
        renderingEngine.updatePoints();
      }, screenUpdateTime);
      
      setInterval(function () {shoot.loadwindow();}, screenUpdateTime);

    document.addEventListener('keydown', function(event) {
      for(var i=0; i<players.length; i++) { 
        //hurricane input detection
        if((players[i].isplaying) && (players[i].hurrCount == 0)){
          if(event.keyCode == 37) {
            renderingEngine.hurricane(Math.PI);
            players[i].hurrCount++;
          }//end if(event.keyCode == 37)
          if(event.keyCode == 39) {
            renderingEngine.hurricane(0);
            players[i].hurrCount++;
          }//end if(event.keyCode == 39)
          if(event.keyCode == 38) {
            renderingEngine.hurricane(Math.PI*3/2);
            players[i].hurrCount++;
          }//end if(event.keyCode == 38)
          if(event.keyCode == 40) {
            renderingEngine.hurricane(Math.PI/2);
            players[i].hurrCount++;
          }//end if(event.keyCode == 40)
        }//end if((players[i].isplaying) && (players[i].hurrCount == 0))*/
        /*Lionel(A0073872)*/
        //earthquake input detection
        if((players[i].isplaying) && (players[i].quakeCount == 0) && (event.keyCode == 90)) {
          //to trigger earthquake, press Z
          renderingEngine.earthquake();
          setTimeout(function(){physicsEngine.earthquakeEffect();}, 650);
          players[i].quakeCount++;
          //logger.log("Earthquake generated.");
        }//end if((players[i].isplaying) && (players[i].quakeCount == 0) && (event.keyCode == 90))
        /*end Lionel(A0073872)*/
      }//end for(var i=0; i<players.length; i++)
      /*Lionel(A0073872)*/
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
        }//end if(tornado.onScreen == true)
      }//end if(event.keyCode == 88)*/
      /*end Lionel(A0073872)*/
    }/*end function*/);//end addEventListener
    }
  }