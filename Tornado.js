function Tornado(centerPoint, radius){
	this.centerPoint = centerPoint;
	this.radius = radius;
	this.direction = 0;
	this.strength = 0.03;

    this.setStrength = function (str){
        this.strength = str;
        console.log("Changed tornado strength to " + this.strength);
    }

    this.setRandomStrength = function () {
        this.strength = Math.floor(Math.random() * 11);
        console.log("Changed tornado strength to " + this.strength);
    }
}