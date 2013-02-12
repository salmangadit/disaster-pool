function Manipulator(){
	this.manipulating = false;

	this.checkManipulation = function(){
		if (players[0].isplaying && (players[0].score - players[1].score) > 20) {
			this.manipulate();
		} else if (players[1].isplaying && (players[0].score - players[1].score) > 20) {
			this.unmanipulate();
		} else if (players[1].isplaying && (players[1].score - players[0].score) > 20) {
			this.manipulate();
		} else if (players[0].isplaying && (players[1].score - players[0].score) > 20) {
			this.unmanipulate();
		}
	}

	this.check = function(){
		if (players[0].isplaying && (players[0].score - players[1].score) > 20) {
			return false;
		} else if (players[1].isplaying && (players[0].score - players[1].score) > 20) {
			return true;
		} else if (players[1].isplaying && (players[1].score - players[0].score) > 20) {
			return false;
		} else if (players[0].isplaying && (players[1].score - players[0].score) > 20) {
			return true;
		}

		return false;
	}

	this.manipulate = function(){
		if (!this.manipulating){
			this.manipulating = true;
			manipulateFriction(this.manipulating);
		}
	}

	this.unmanipulate = function(){
		if (this.manipulating){
			this.manipulating = false;
			manipulateFriction(this.manipulating);
		}
	}

	function manipulateFriction(manip){
		if (manip){
			table.incrementFriction();
		} else {
			table.decrementFriction();
		}
	}
}