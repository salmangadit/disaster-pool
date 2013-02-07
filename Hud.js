function HUD(){
var xpos = 1000;
var ypos = 45;
	this.updateHUD = function()
	{
            ctx.fillStyle = "rgba(0, 0, 255, 1)";
            ctx.font = "bold 20px Iceland";
            if(players[0].isplaying)
            {ctx.fillText("Player 1 Turn", xpos, ypos);}
        	else
        	{ctx.fillText("Player 2 Turn", xpos, ypos);}		

      ctx.fillStyle = "rgba(255,0,0,1)";
      ctx.fillText("Player 1 score "+players[0].score+":: "+ players[1].score +" Player 2 Score", xpos, (ypos+24));
	}




}