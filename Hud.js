function HUD(){
  var xpos = 0;
  var ypos = 20;
  var balls = table.getBalls();
  this.updateHUD = function()
  {
    hudCtx.fillStyle = "rgba(0, 0, 0, 1)";
    hudCtx.fillRect(0, 0, 1000, 100);

    hudCtx.fillStyle = "rgba(255, 0, 0, 1)";
    hudCtx.font = "bold 20px Iceland";
    
    if(players[0].isplaying) {
      hudCtx.fillText("Player 1's Turn", xpos + 430, ypos);
    }
    else {
      hudCtx.fillStyle = "rgba(255, 0, 0, 1)";
      hudCtx.fillText("Player 2's Turn", xpos + 430, ypos);
    }		

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.fillText("Player 1 ---", xpos+350, (ypos+50));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.font = "bold 40px Iceland";
      hudCtx.fillText(players[0].score, xpos+460, (ypos+50));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.fillText("::", xpos+510, (ypos+50));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.fillText(players[1].score, xpos+550, (ypos+50));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.font = "bold 20px Iceland";
      hudCtx.fillText("--- Player 2", xpos+595, (ypos+50));


      hudCtx.fillStyle = "rgba(100,100,100,1)";

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
        hudCtx.fillText("Player 1 is leading", xpos+420, (ypos+70));
      }
      else if(players[1].winning == players[0].winning)
      {
        hudCtx.fillText("Players are in a TIE", xpos+420, (ypos+70)); 
      }
      else
      {
        hudCtx.fillText("Player 2 is leading", xpos+420, (ypos+70)); 
      }
      // hudCtx.fillStyle = "rgba(255, 0, 0, 1)";
      // hudCtx.fillText("Player 1 Potted Balls :", xpos, (ypos+72)); 
      // hudCtx.fillStyle = "rgba(0, 0, 255, 1)";
      // hudCtx.fillText("Player 2 Potted Balls :", xpos, 310); 

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