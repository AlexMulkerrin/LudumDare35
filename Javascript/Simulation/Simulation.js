var shapeID = {circle:0, triangle:1, square:2, sawtooth:3};

function Simulation() {
	this.faction = [];
	this.faction[0] = new Faction(shapeID.circle, "#000000", window.innerWidth/2, window.innerHeight/2);
	this.faction[1] = new Faction(shapeID.circle, "#00ff00", window.innerWidth*3/4, window.innerHeight/4);
	this.faction[2] = new Faction(shapeID.triangle, "#ff0000", window.innerWidth/4, window.innerHeight*3/4);
	this.faction[3] = new Faction(shapeID.square, "#0000ff", window.innerWidth*3/4, window.innerHeight*3/4);
	this.faction[4] = new Faction(shapeID.sawtooth, "#ffff00", window.innerWidth/4, window.innerHeight/4);


	this.unit = [];
	var player =  new Unit(this.faction[0]);
	player.x = window.innerWidth/2;
	player.y = window.innerHeight/2;
	this.unit.push(player);
	for (var i=0; i<20; i++) {
		var faction = this.faction[random(4)+1];
		var newUnit = new Unit(faction);
		this.unit.push(newUnit);
	}
	this.commands = {};
	this.selected = 0;
}

function Unit(faction) {
	this.faction = faction;
	var colour = colourComponents(faction.colour);
	colour = fuzzColourComponents(colour, 100);
	this.colour = toRGBString(colour[0], colour[1], colour[2]);
	this.size = random(10)+20;
	this.shape = faction.shape;

	this.x = faction.x+(random(4)-2)*50-this.size/2;
	this.y = faction.y+(random(4)-2)*50-this.size/2;
	this.vx = Math.random()*1-0.5;
	this.vy = Math.random()*1-0.5;
	this.angle = Math.random()*2*Math.PI;
	this.vangle = Math.random()*0.1-0.05;
}

function Faction(shape, colour, x, y) {
	this.x = x || Math.random()*window.innerWidth;
	this.y = y || Math.random()*window.innerHeight;
	this.shape = shape;
	this.colour = colour;
}

Simulation.prototype.bufferCommands = function(triggers, selected) {
	this.commands = triggers;
	//this.selected = selected;
}
Simulation.prototype.update = function() {
	this.processCommands();
	for (var i=0; i<this.unit.length; i++) {
		var unit = this.unit[i];
		unit.x += unit.vx;
		if (unit.x<0) unit.x=window.innerWidth;
		if (unit.x>window.innerWidth) unit.x=0;
		unit.y += unit.vy;
		if (unit.y<0) unit.y=window.innerHeight;
		if (unit.y>window.innerHeight) unit.y=0;
		unit.angle += unit.vangle;
	}
}
Simulation.prototype.processCommands = function() {
	var unit = this.unit[this.selected];
	if (this.commands.thrustUp) {
		unit.vy -= 1;
	}
	if (this.commands.thrustDown) {
		unit.vy += 1;
	}
	if (this.commands.thrustLeft) {
		unit.vx -= 1;
	}
	if (this.commands.thrustRight) {
		unit.vx += 1;
	}
	if (this.commands.shoot) {
		//Todo
	}

	if (this.commands.thrustForwards) {
		unit.vx += Math.sin(unit.angle);
		unit.vy -= Math.cos(unit.angle);
	}
	if (this.commands.thrustBackwards) {
		unit.vx -= Math.sin(unit.angle);
		unit.vy += Math.cos(unit.angle);
	}
	if (this.commands.thrustAntiClockwise) {
		unit.vangle-= 0.01;
	}
	if (this.commands.thrustClockwise) {
		unit.vangle+= 0.01;
	}
	this.commands = {};
}
