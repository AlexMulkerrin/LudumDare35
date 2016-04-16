function Simulation() {
	this.unit = [];
	for (var i=0; i<10; i++) {
		this.unit.push( new Unit());
	}
	this.commands = {};
	this.selected = 0;
}

function Unit() {
	this.colour = randomRGBString();
	this.size = random(10)+5;

	this.x = Math.random()*window.innerWidth;
	this.y = Math.random()*window.innerHeight;
	this.vx = 0;
	this.vy = 0;
	this.angle = Math.random()*2*Math.PI;
	this.vangle =0;// Math.random()*0.1-0.05;
}

Simulation.prototype.bufferCommands = function(triggers, selected) {
	this.commands = triggers;
	this.selected = selected;
}
Simulation.prototype.update = function() {
	this.processCommands();
	for (var i=0; i<this.unit.length; i++) {
		var unit = this.unit[i];
		unit.x += unit.vx;
		unit.y += unit.vy;
		unit.angle += unit.vangle;
	}
}
Simulation.prototype.processCommands = function() {
	var unit = this.unit[this.selected];
	if (this.commands.thrustForwards) {
		unit.vx += Math.sin(unit.angle);
		unit.vy += Math.cos(unit.angle);
	}
	if (this.commands.thrustBackwards) {
		unit.vx -= Math.sin(unit.angle);
		unit.vy -= Math.cos(unit.angle);
	}
	if (this.commands.thrustAntiClockwise) {
		unit.vangle-= 0.01;
	}
	if (this.commands.thrustClockwise) {
		unit.vangle+= 0.01;
	}
	this.commands = {};
}
