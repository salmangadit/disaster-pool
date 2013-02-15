/*Salman (U095146E)*/
function Player(playerNum){
	this.playerNumber = playerNum;
	this.score = 0;
	this.isplaying = false;
	this.ballsPotted = new Array();
	this.hurrCount = 0;
	this.quakeCount = 0;
	this.prevpottedlength = 0;
	this.winning = false;
	this.ballplacingoffsetx = 0;
	this.ballplacingoffsety = 0;
}