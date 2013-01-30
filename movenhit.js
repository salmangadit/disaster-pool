
function Movenhit()
{   

     this.loadwindow = function(){

        var item,realtimer1=0,realtimer2=0;
 
        // cueStick function
        function cueStick() {
            var item = this;
            var speed, timer;
            this.shooting = false;
        
            // Starts shooting/drawing when mouse is pressed
            this.mousedown = function (event) {
             //   ctx.clearRect(0, 0, canvas.width, canvas.height);
                //ctx.beginPath();
                //ctx.moveTo(event.x, event.y);
                speed = 0;
                timer = 15;

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
                    //ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                var ang = math.getAngleFromAnyPoint(cueBall,event);
               cueBall = physicsEngine.applyForceAtAngle(cueBall,speed,ang);
               speed+=50;
               if(speed >= 270)
                {speed = 270;}

                if((realtimer1-realtimer2) >30 && (realtimer1-realtimer2) < 100000)
                    {item.shooting=false;}
               console.log("Time difference = "+(realtimer1-realtimer2));
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
            //Event listeners for mousedown, mouseup and mousemove
            canvas.addEventListener('mousedown', mou2canv, false);
            canvas.addEventListener('mouseup', mou2canv, false);
            canvas.addEventListener('mousemove', mou2canv, false);

    }

   

}




