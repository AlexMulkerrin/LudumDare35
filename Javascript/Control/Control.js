function Control(canvasName, program) {
	this.targetProgram = program;
	this.targetCanvas = document.getElementById(canvasName);
	this.targetDisplay;

	this.mouse = new Mouse();

	this.createCanvasEventHandlers();
}
Control.prototype.createCanvasEventHandlers = function() {
	var t = this;
	this.targetCanvas.onmousemove = function (event) {t.mouseUpdateCoords(event);};
	this.targetCanvas.onmousedown = function (event) { t.mousePressed(event); };
}
Control.prototype.update = function() {
	this.mouse.isMoving = false;
	this.mouse.isPressed = false;
}

function Mouse() {
	this.x = 10;
	this.y = 0;
	this.isMoving = false;
	this.buttonPressed = 0;
    this.isPressed = false;
}
Control.prototype.mouseUpdateCoords = function (event) {
    var rect = this.targetCanvas.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
	this.mouse.isMoving = true;
}
Control.prototype.mousePressed = function (event) {
    this.mouse.buttonPressed = event.which;
    this.mouse.isPressed = true;
	this.targetProgram.soundSystem.createHarmonicNote();
}
