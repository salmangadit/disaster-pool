
function Movenhit()
{   
var posx = 0;
var posy = 0;
var notmoving=true, prevnotmoving=false,turn=0;
var eventonce = true;
this.setupmnh = function(pnm,nm)
  {
  notmoving = nm; prevnotmoving=pnm;
  }
this.loadwindow = function()
  {        
     var item,realtimer1=0,realtimer2=0;
     var balls = table.getBalls();
     var maxspeed = 350;
     var speedmodifier = 0.8;

        // cueStick function
        function cueStick() 
        {
        var item = this;
        var speed, timer;
        this.shooting = false;
        var startpoint = new Point(0, 0);
        var endpoint = new Point(0, 0);
        
            // Starts shooting/drawing when mouse is pressed
            this.mousedown = function (event) 
            {
            editevent(event);
            // logger.log(notmoving);

            // do ball with cueball check
            if(cueBall.potted && notmoving)
                {
                var stillplacingcue = false;
                var dummyball = new Ball(new Point(0,700), 23, 2);
                dummyball.centerPoint.x = posx;
                dummyball.centerPoint.y = posy;

                //check cueball collision with any ball and if that happens change 
                //cueBall.potted = true and put cueball position to out of screen again
                //alert("Cant place cueball there");
                for (var i=0;i<balls.length;i++)
                  {
                  if (collider.detectBallToBallCollision(balls[i],dummyball))
                    {
                    alert("Can't place cueball there");
                    stillplacingcue = true;
                    }                                                
                  }
                if(!stillplacingcue)
                  {
                  cueBall.potted = false;
                  cueBall.centerPoint.x = posx;
                  cueBall.centerPoint.y = posy;
                  }       
                
                }

                if(!cueBall.potted && notmoving)
                  {
                  speed = 0;
                  timer = 35;
                  startpoint.x = posx;
                  startpoint.y = posy;
                  item.shooting = true;
                  }
              
            };

            // Funtion to check whether mouse moves and only activated if shooting
            this.mousemove = function (event) 
            {
            editevent(event);
            if (item.shooting) 
              {
              timer--;
              if(timer <= 0)
                {
                item.shooting = false;
                endpoint.x = posx;
                endpoint.y = posy;
                speed = speedmodifier * math.getDistanceBetweenTwoPoints(startpoint,endpoint);              
                if(speed >= maxspeed)
                  {
                  speed = maxspeed;
                  if(turn < 3)
                    {
                      speed = maxspeed - 120;
                    }
                  }                      
                var ang = math.getAngleFromAnyPoint(cueBall,endpoint);
                this.cueBall = physicsEngine.applyForceAtAngle(cueBall,speed,ang);
                }


              endpoint.x = posx;
              endpoint.y = posy;                 
              //line draw to indicate power
              ctx.beginPath();
              ctx.moveTo(startpoint.x,startpoint.y);
              ctx.lineTo(endpoint.x,endpoint.y);
              ctx.stroke();
              }                
            };

            // Function where the user releases mouse button
            this.mouseup = function (event) 
            {
            editevent(event);
            if (item.shooting) 
              {
              item.mousemove(event);
              editevent(event);
              item.shooting = false;
              endpoint.x = posx;
              endpoint.y = posy;
              var ang = math.getAngleFromAnyPoint(cueBall,endpoint);
              speed = speedmodifier * math.getDistanceBetweenTwoPoints(startpoint,endpoint);
              if(speed >= maxspeed)
                {
                speed = maxspeed;
                  if(turn < 3)
                    {
                      speed = maxspeed - 120;
                    }                
                }                    
              this.cueBall = physicsEngine.applyForceAtAngle(cueBall,speed,ang);              
              }
            };
        }

        function editevent(event) 
        {
        if (!event) 
          {
          var event = window.event;
          }
        if (event.pageX || event.pageY) 
          {
          posx = event.pageX;
          posy = event.pageY;
          }
        else if (event.clientX || event.clientY) 
                {
                posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }
        //offset due to top canvas        
        posy -= 115;
        posx -= 8;
        }

        // Function to get mouse postition relative to canvas
        function mou2canv(event) 
        {  
        editevent(event);
        // activate item's handler.
        var fnc = item[event.type];
        if (fnc) 
          {
          fnc(event);
          }

        if(cueBall.potted && notmoving)
          {
          var dummyball = new Ball(new Point(0,700), 23, 2);
          dummyball.centerPoint.x = posx;
          dummyball.centerPoint.y = posy;
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
        notmoving = true;
        //check for all ball except cueball velocity if they are moving
        for (var i=0;i<balls.length;i++)
          {
          if(balls[i].velocity > 0)
            {   
            notmoving = false; 
            }
          }
        if(cueBall.velocity > 0)
          {
          notmoving = false;
          }
        if(prevnotmoving == true && notmoving == false)
        {       
        prevnotmoving = false;
        }//end if (prevnotmoving == true && notmoving == false)



        var firstcheck = true,secondcheck = false;
        for (var i=0;i<balls.length;i++)
          {
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
          {
            notmoving = true;
          }

        if(prevnotmoving == false && notmoving == true)
          {
            initialCollision = true;
            tornado.onScreen = false;
            //Event listeners for mousedown, mouseup and mousemove  
            if(eventonce)
              { 
                canvas.addEventListener('mousedown', mou2canv);
                canvas.addEventListener('mouseup', mou2canv);
                canvas.addEventListener('mousemove', mou2canv);
                eventonce = false;
              }
            prevnotmoving=true;

            for(var i=0;i<players.length;i++)
              {
                if(players[i].isplaying && turn)
                  {
                    if(players[i].ballsPotted.length == players[i].prevpottedlength || cueBall.potted)
                      {
                        if(i == 0)
                          {
                            //logger.log("switch1");
                            players[i].isplaying = !(players[i].isplaying);
                            players[i+1].isplaying = !(players[i+1].isplaying);
                            if(cueBall.potted)
                              {
                                players[i].prevpottedlength = players[i].ballsPotted.length;
                              }
                            break;
                          }
                        else //i=1
                          {
                            //logger.log("switch2");
                            players[i].isplaying = !(players[i].isplaying);
                            players[i-1].isplaying = !(players[i-1].isplaying);
                            if(cueBall.potted)
                              {
                                players[i].prevpottedlength = players[i].ballsPotted.length;
                              }
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
          {
            logger.log("player 1 is playing");
          }
        else
          {
            logger.log("player 2 is playing");
          }
        turn++;
        players[0].score = 0;
        players[1].score = 0;
        for(var i=0;i<players[0].ballsPotted.length;i++)
          {
            players[0].score += balls[players[0].ballsPotted[i]].radius;
          }
        for(var i=0;i<players[1].ballsPotted.length;i++)
          {
            players[1].score += balls[players[1].ballsPotted[i]].radius;
          }
        logger.log("Player 1 score "+players[0].score+":: "+ players[1].score +" Player 2 Score");

    }  //end if of prenotmoving false and notmoving true       
  }
}




