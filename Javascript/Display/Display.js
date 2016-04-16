function Display(canvasName, control) {
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
	this.drawText();
}
Display.prototype.spawnParticles = function() {
	var mouse = this.targetControl.mouse;
	if (mouse.isMoving) {
		this.particleManager.createParticle(mouse.x, mouse.y, "#00ff00");
	}
	if (mouse.isPressed) {
		this.particleManager.createParticle(mouse.x, mouse.y, "#0000ff", 10);
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
}
