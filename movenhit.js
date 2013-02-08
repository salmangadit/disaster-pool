
function Movenhit()
{   

    var notmoving=true, prevnotmoving=false,turn=0;
    this.setupmnh = function(pnm,nm)
    {notmoving = nm; prevnotmoving=pnm;}
     this.loadwindow = function(){
        
        var item,realtimer1=0,realtimer2=0;
        var balls = table.getBalls();



 
        // cueStick function
        function cueStick() {
            var item = this;
            var speed, timer;
            this.shooting = false;
            var startpoint,endpoint;
        
            // Starts shooting/drawing when mouse is pressed
            this.mousedown = function (event) {
             // logger.log(notmoving);

              // do ball with cueball check
              if(cueBall.potted && notmoving)
                {

                var stillplacingcue = false;
                var dummyball = new Ball(new Point(0,700), 23, 2);
                dummyball.centerPoint = event;
                //check cueball collision with any ball and if that happens change 
                //cueBall.potted = true and put cueball position to out of screen again
                //alert("Cant place cueball there");



       
                for (var i=0;i<balls.length;i++){
      if (collider.detectBallToBallCollision(balls[i],dummyball)){
                alert("Can't place cueball there");
                stillplacingcue = true;
      }
                                                }
              if(!stillplacingcue)
              {

                cueBall.potted = false;
                cueBall.centerPoint = event;
              }       
                
                }

             //   ctx.clearRect(0, 0, canvas.width, canvas.height);
                //ctx.beginPath();
                //ctx.moveTo(event.x, event.y);
                if(!cueBall.potted && notmoving)
                {
                speed = 0;
                timer = 35;
                startpoint = event;
                item.shooting = true;
                }


              
            };

            // Funtion to check whether mouse moves and only activated if shooting
            this.mousemove = function (event) {

                if (item.shooting) {

                var realtimer1 = new Date().getTime();
                 //   ctx.lineTo(event.x, event.y);
                 //   ctx.stroke();
                 timer--;
                 if(timer <= 0)
                    {item.shooting = false;
                      endpoint.x = event;
                      speed = math.getDistanceBetweenTwoPoints(startpoint,endpoint);
                    //ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    endpoint = event;
                var ang = math.getAngleFromAnyPoint(cueBall,event);
                  ctx.beginPath();
                  ctx.moveTo(startpoint.x,startpoint.y);
                  ctx.lineTo(endpoint.x,endpoint.y);
                  ctx.stroke();
                //if(timer<12)
                 //{speed+=20;}
               if(speed >= 270)
                {speed = 270;}

              //  if((realtimer1-realtimer2) >190 && (realtimer1-realtimer2) < 700)
              //  {
              //     // item.shooting=false;
              //  }
              //  else if((realtimer1-realtimer2)<191)
              //  {speed += (190 - (realtimer1-realtimer2))/3;}
              
               this.cueBall = physicsEngine.applyForceAtAngle(cueBall,speed,ang);


              


             //  console.log("Time difference = "+(realtimer1-realtimer2));

               //logger.log("Timer = "+timer);
              // renderingEngine.writeText((realtimer1-realtimer2),event);
               // table.drawTable();
               // ctx.font = '10pt Calibri';
               // ctx.fillStyle = 'black';
               // ctx.fillText("Timer1: " + realtimer1 + "Timer2: " + (realtimer2-realtimer1), 10, 25);
                realtimer2 = new Date().getTime();
                }
                

            };

            // Function where the user releases mouse button
            this.mouseup = function (event) {
                if (item.shooting) {
                    item.mousemove(event);
                    item.shooting = false;
                     endpoint = event;
                     var ang = math.getAngleFromAnyPoint(cueBall,event);
                    speed = math.getDistanceBetweenTwoPoints(startpoint,endpoint);
                    this.cueBall = physicsEngine.applyForceAtAngle(cueBall,speed,ang);
                    //speed=0;

                   //console.log("X: " + event.x + ", y: " + event.y);

              // table.drawTable();
             //   ctx.font = '18pt Calibri';
             //   ctx.fillStyle = 'black';
                //ctx.fillText("X: " + event.x + ", y: " + event.y, 10, 25);
                //ctx.fillText("X: " + cueBall.centerPoint.x + ", y: " + cueBall.centerPoint.y, 200, 25);
                }
            };
        }

        // Function to get mouse postition relative to canvas
        function mou2canv(event) {
  
 


var rect = canvas.getBoundingClientRect();
            // For firefox browser
            if (event.layerX || event.layerX == 0) {
                event.x = event.layerX;
                event.y = event.layerY;
            }
                // For opera browser, if anyone even uses it LOL
            else if (event.offsetX || event.offsetX == 0) {
                event.x = event.offsetX;
                event.y = event.offsetY;
            }
            else
            {
              event.x = event.clientX - rect.left;
              event.x = event.clientY - rect.top;
            }

            // activate item's handler.
            var fnc = item[event.type];
            if (fnc) {
                fnc(event);
            }

                if(cueBall.potted && notmoving){
                var dummyball = new Ball(new Point(0,700), 23, 2);
                dummyball.centerPoint = event;                
                ctx.beginPath();
                ctx.arc(dummyball.centerPoint.x, dummyball.centerPoint.y, dummyball.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle =  "rgba(1, 1, 1, 0.5)";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#000000';
                ctx.stroke();
                                              }


        }

        // item which is cueStick is called later in mou2canv


            item = new cueStick();
            //Event listeners for mousedown, mouseup and mousemove  



 //need to find a way to put this outside
   notmoving = true;
for (var i=0;i<balls.length;i++){
if(balls[i].velocity > 0)
{   
    notmoving = false; 
}
}
if(cueBall.velocity > 0)
{
notmoving = false;
}

 if(prevnotmoving == true && notmoving == false){       
    canvas.removeEventListener('mousedown',mou2canv);
    canvas.removeEventListener('mousemove',mou2canv);
    canvas.removeEventListener('mouseup',mou2canv); 
logger.log("listener disabled");
prevnotmoving = false;

  }//end for (var i=0;i<balls.length;i++)



       var firstcheck = true,secondcheck = false;
for (var i=0;i<balls.length;i++){
if(balls[i].velocity > 0)
{   
    firstcheck = false; 
}
}
if(cueBall.velocity == 0)
{
 secondcheck = true;
}
if(firstcheck && secondcheck)
  {notmoving = true;}





//logger.log(prevnotmoving + "and" + notmoving);

       if(prevnotmoving == false && notmoving == true)
        {

          canvas.addEventListener('mousedown', mou2canv);
            canvas.addEventListener('mouseup', mou2canv);
            canvas.addEventListener('mousemove', mou2canv);
      logger.log("listener enabled");
      prevnotmoving=true;

//check placement of function, it is wrong i think
          
          for(var i=0;i<players.length;i++){
        if(players[i].isplaying && turn)
        {
          if(players[i].ballsPotted.length == players[i].prevpottedlength || cueBall.potted)
          {

          if(i == 0)
          {
            logger.log("switch1");
          players[i].isplaying = !(players[i].isplaying);
          players[i+1].isplaying = !(players[i+1].isplaying);
          if(cueBall.potted)
          {players[i].prevpottedlength = players[i].ballsPotted.length;}
break;
          }
          else //i=1
          {
            logger.log("switch2");
          players[i].isplaying = !(players[i].isplaying);
          players[i-1].isplaying = !(players[i-1].isplaying);
          if(cueBall.potted)
          {players[i].prevpottedlength = players[i].ballsPotted.length;}
break;
          }

          }
          else
          {

          players[i].prevpottedlength = players[i].ballsPotted.length;
break;
          }

        }
                                            }      

        if(players[0].isplaying)
          {logger.log("player 1 is playing");}
        else
          {logger.log("player 2 is playing");}
        turn++;

players[0].score = 0;
players[1].score = 0;

     for(var i=0;i<players[0].ballsPotted.length;i++){
         players[0].score += balls[players[0].ballsPotted[i]].radius;
        }
         for(var i=0;i<players[1].ballsPotted.length;i++){
         players[1].score += balls[players[1].ballsPotted[i]].radius;
        }
logger.log("Player 1 score "+players[0].score+":: "+ players[1].score +" Player 2 Score");





    }  //end if of prenotmoving false and notmoving true



            

            

}
   

}




