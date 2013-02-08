function HUD(){
var xpos = 1000;
var ypos = 45;
var balls = table.getBalls();
	this.updateHUD = function()
	{
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
            ctx.font = "bold 20px Iceland";
            if(players[0].isplaying)
            {ctx.fillText("Player 1 Turn", xpos, ypos);}
        	else
        	{
            ctx.fillStyle = "rgba(0, 0, 255, 1)";
            ctx.fillText("Player 2 Turn", xpos, ypos);}		

      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillText("Player 1 score "+players[0].score+":: "+ players[1].score +" Player 2 Score", xpos, (ypos+24));


ctx.fillStyle = "rgba(100,100,100,1)";


var gameover = 1;

for(var i = 0; i < balls.length; i++)
{
  if(!balls[i].potted)
{gameover = 0;}
}




if(players[0].score > players[1].score)
{
  players[0].winning = true;
  players[1].winning = false;
}
else if(players[0].score == players[1].score)
{
    players[0].winning = false;
  players[1].winning = false;
}
else
{
    players[0].winning = false;
  players[1].winning = true;
}

if(players[0].winning)
{
ctx.fillText("Player 1 is leading", xpos, (ypos+48));
}
else if(players[1].winning == players[0].winning)
{
  ctx.fillText("Players are in a TIE", xpos, (ypos+48)); 
}
else
{
ctx.fillText("Player 2 is leading", xpos, (ypos+48)); 
}
              ctx.fillStyle = "rgba(255, 0, 0, 1)";
 ctx.fillText("Player 1 Potted Balls :", xpos, (ypos+72)); 
               ctx.fillStyle = "rgba(0, 0, 255, 1)";
 ctx.fillText("Player 2 Potted Balls :", xpos, 310); 

if(players[0].score > 154)
  {gameover = 1;}
if(players[1].score > 154)
  {gameover = 1;}

if(gameover == 1)
{
              ctx.fillStyle = "rgba(255, 215, 0, 1)";
            ctx.font = "bold 100px Iceland";
            if(players[0].winning)
            {ctx.fillText("Player 1 WINS!!", 170, 270);}
          else if(players[0].winning == players[1].winning)
            {ctx.fillText("It is a TIE", 170, 270);}
          else
          {ctx.fillText("Player 2 WINS!!", 170, 270);}
}





	}




}