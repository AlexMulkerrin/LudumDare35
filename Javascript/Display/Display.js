function Display(canvasName, simulation, control) {
	this.targetSim = simulation;
	this.targetControl = control;

	this.canvas = document.getElementById(canvasName);
	this.canvas.ctx = this.canvas.getContext("2d");
	this.resizeCanvas();
	this.particleManager = new ParticleManager(this.canvas);
	this.refresh();
}
Display.prototype.resizeCanvas = function() {
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;

}
Display.prototype.refresh = function() {
	this.spawnParticles();
	this.clearCanvas();
	this.particleManager.update();
	this.drawUnits();
	this.drawText();
}
Display.prototype.spawnParticles = function() {
	var mouse = this.targetControl.mouse;
	if (mouse.isMoving) {
		this.particleManager.createParticle(mouse.x, mouse.y, "#00ff00");
	}
	if (mouse.isPressed) {
		this.particleManager.createParticle(mouse.x, mouse.y, "#0000ff", 10);
		for (var i=0; i<10; i++) {
			this.particleManager.createParticle(mouse.x, mouse.y, "#00ffff", 0, "fly");
		}
	}
	if (Object.keys(this.targetControl.triggers).length>0) {
		var unit = this.targetSim.unit[this.targetControl.selectedUnit];
		for (var i=0; i<10; i++) {
			this.particleManager.createParticle(unit.x, unit.y, "#ff0000", 0, "fly");
		}
	}
}
Display.prototype.clearCanvas = function() {
	this.canvas.ctx.fillStyle = "#dce5f2";
	this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}
Display.prototype.drawText = function() {
	this.canvas.ctx.fillStyle = "#000000";
	var text = this.targetControl.mouse.x + "," + this.targetControl.mouse.y;
	this.canvas.ctx.fillText(text, 20, 20);
	text = this.targetControl.triggers.thrustForwards;
	this.canvas.ctx.fillText(text, 20, 40);
}
Display.prototype.drawUnits = function() {
	var ctx = this.canvas.ctx;
	for (var i=0; i<this.targetSim.unit.length; i++) {
		var unit = this.targetSim.unit[i];
		ctx.fillStyle = unit.colour;
		ctx.translate(unit.x,unit.y);
		ctx.rotate(unit.angle);

		ctx.fillRect(-unit.size/2, -unit.size/2, unit.size, unit.size);

		ctx.rotate(-unit.angle);
		ctx.translate(-unit.x,-unit.y);
	}
}
