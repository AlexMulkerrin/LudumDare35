function Control(canvasName, simulation, program) {
	this.targetSim = simulation;
	this.targetProgram = program;
	this.targetCanvas = document.getElementById(canvasName);
	this.targetDisplay;

	this.triggers = {};
	this.selectedUnit = 0;

	this.mouse = new Mouse();

	this.createKeyboardEventHandlers();
	this.createCanvasEventHandlers();
}
Control.prototype.createKeyboardEventHandlers = function() {
	var t = this;
	document.onkeydown = function (event) {
		var keyCode;
		if (event === null) {
			keyCode = window.event.keyCode;
		} else {
			keyCode = event.keyCode;
		}

		switch (keyCode) {
			case 87: // w
				t.triggers.thrustForwards=true;
				break;
			case 65: // a
				t.triggers.thrustAntiClockwise=true;
				break;
			case 83: // s
				t.triggers.thrustBackwards=true;
				break;
			case 68: // d
				t.triggers.thrustClockwise=true;
				break;
		}
		t.targetSim.bufferCommands(t.triggers, t.selectedUnit);
	}
}

Control.prototype.createCanvasEventHandlers = function() {
	var t = this;
	this.targetCanvas.onmousemove = function (event) {t.mouseUpdateCoords(event);};
	this.targetCanvas.onmousedown = function (event) { t.mousePressed(event); };
}
Control.prototype.update = function() {
	this.mouse.isMoving = false;
	this.mouse.isPressed = false;
	this.triggers = {};
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
	this.targetProgram.soundSystem.createHarmonicNote(1);
}
