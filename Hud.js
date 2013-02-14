function HUD(){
  var xpos = 0;
  var ypos = 20;
  var balls = table.getBalls();
  this.updateHUD = function()
  {
    hudCtx.fillStyle = "rgba(0, 0, 0, 1)";
    hudCtx.fillRect(0, 0, 1000, 100);

    hudCtx.fillStyle = "rgba(255, 0, 0, 1)";
    hudCtx.font = "bold 30px Iceland";

    if(players[0].isplaying) {
      hudCtx.fillText("Player 1's Turn", xpos + 410, ypos + 10);
    }
    else {
      hudCtx.fillStyle = "rgba(0, 0, 255, 1)";
      hudCtx.fillText("Player 2's Turn", xpos + 410, ypos + 10);
    }		

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.font = "bold 20px Iceland";
      hudCtx.fillText("Player 1 ---", xpos+90, (ypos+10));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.font = "bold 40px Iceland";
      hudCtx.fillText(players[0].score, xpos+240, (ypos+15));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.fillText(players[1].score, xpos+745, (ypos+15));

      hudCtx.fillStyle = "rgba(255,255,0,1)";
      hudCtx.font = "bold 20px Iceland";
      hudCtx.fillText("--- Player 2", xpos+820, (ypos+10));



      hudCtx.fillStyle = "#00FFFF";
      hudCtx.font = "bold 20px Iceland";

      if (players[0].hurrCount == 0) {
        hudCtx.fillText("Hurricane x1", xpos + 130, ypos + 40);
      } else {
        hudCtx.fillText("Hurricane x0", xpos + 130, ypos + 40);
      }
      if (players[0].quakeCount == 0) {
        hudCtx.fillText("Earthquake x1", xpos + 130, ypos + 58);
      } else {
        hudCtx.fillText("Earthquake x0", xpos + 130, ypos + 58);
      }

      if (players[1].hurrCount == 0) {
        hudCtx.fillText("Hurricane x1", xpos + 745, ypos + 40);
      } else {
        hudCtx.fillText("Hurricane x0", xpos + 745, ypos + 40);
      }
      if (players[1].quakeCount == 0) {
        hudCtx.fillText("Earthquake x1", xpos + 745, ypos + 58);
      } else {
        hudCtx.fillText("Earthquake x0", xpos + 745, ypos + 58);
      }

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
        hudCtx.fillText("Player 1 is winning", xpos+420, (ypos+70));
      }
      else if(players[1].winning == players[0].winning)
      {
        hudCtx.fillText("Scores are TIED", xpos+420, (ypos+70)); 
      }
      else
      {
        hudCtx.fillText("Player 2 is winning", xpos+420, (ypos+70)); 
      }


       potCtx.font = "bold 30px Iceland";      
       potCtx.fillStyle = "rgba(255, 0, 0, 1)";
       potCtx.fillText("P1", 15, 15); 
       potCtx.fillStyle = "rgba(0, 0, 255, 1)";
       potCtx.fillText("P2", 85, 15); 
       potCtx.beginPath();
       potCtx.moveTo(70,0);
       potCtx.lineTo(70,500);
       potCtx.stroke();       

      if(players[0].score > 154)
        {gameover = 1;}
      if(players[1].score > 154)
        {gameover = 1;}

      if(gameover == 1)
      {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
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