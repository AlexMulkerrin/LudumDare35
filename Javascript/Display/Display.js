function Display(canvasName) {
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
	this.clearCanvas();
	this.particleManager.update();
}
Display.prototype.clearCanvas = function() {
	this.canvas.ctx.fillStyle = "#dce5f2";
	this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}
