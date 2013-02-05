function Tornado(centerPoint, radius){
	this.centerPoint = centerPoint;
	this.radius = radius;
	this.direction = 0;
	this.strength = 0.07;
    this.addForce = 80;
    this.onScreen = false;

    /*to set the strength of the tornado*/
    this.setStrength = function (str){
        this.strength = str;
        console.log("Changed tornado strength to " + this.strength);
    }//end setStrength*/
    
    /*to set the strength of the tornado randomly*/
    this.setRandomStrength = function () {
        this.strength = Math.floor(Math.random() * 11);
        console.log("Changed tornado strength to " + this.strength);
    }//end setRandomStrength*/
}