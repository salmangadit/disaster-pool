
function Movenhit()
{   

    var notmoving, prevnotmoving;
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
                {cueBall.potted = false;
                cueBall.centerPoint = event;
                //check cueball collision with any ball and if that happens change 
                //cueBall.potted = true and put cueball position to out of screen again
                //alert("Cant place cueball there");
                logger.log(collider.checkIfCollisionPairExists(cueBall,balls[i]));
                for (var i=0;i<balls.length;i++){
                if(collider.checkIfCollisionPairExists(cueBall,balls[i])){
                cueBall.potted = true; 
                cueBall.centerPoint.x=0;
                cueBall.centerPoint.y=600;
                alert("Cant place cueball there");
               }
                }


                }

             //   ctx.clearRect(0, 0, canvas.width, canvas.height);
                //ctx.beginPath();
                //ctx.moveTo(event.x, event.y);

                speed = 0;
                timer = 15;
                startpoint = event;
                item.shooting = true;
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
                      endpoint = event;
                      speed = math.getDistanceBetweenTwoPoints(startpoint,endpoint);
                    //ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                var ang = math.getAngleFromAnyPoint(cueBall,event);
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
  
   prevnotmoving = notmoving;
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
//logger.log(prevnotmoving + "and" + notmoving);

 if(prevnotmoving == true && notmoving == false){       
    canvas.removeEventListener('mousedown',mou2canv);
    canvas.removeEventListener('mousemove',mou2canv);
    canvas.removeEventListener('mouseup',mou2canv); 
logger.log("listener disabled");
prevnotmoving = false;

  }
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

            // activate item's handler.
            var fnc = item[event.type];
            if (fnc) {
                fnc(event);
            }


        }

        
        // item which is cueStick is called later in mou2canv


            item = new cueStick();
            //Event listeners for mousedown, mouseup and mousemove           ADD trigger edge stop to move(disable) and move to stop(enable settimeout)
       var firstcheck = false,secondcheck = false;
for (var i=0;i<balls.length;i++){
if(balls[i].velocity == 0)
{   
    firstcheck = true; 
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
        {this.setevent = setTimeout(function() {canvas.addEventListener('mousedown', mou2canv);
            canvas.addEventListener('mouseup', mou2canv);
            canvas.addEventListener('mousemove', mou2canv);

        },100);
      logger.log("listener enabled");
      prevnotmoving=true;
    }

        


            

            

}
   

}




