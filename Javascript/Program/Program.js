function loadProgram() {
	var program = new Program("ludumDare35Canvas");
	setInterval(function(){program.update();}, program.updateDelay);
}

function Program(canvasName) {
	this.updateDelay = 20;

	this.soundSystem = new SoundSystem();
	this.control = new Control(canvasName, this);
	this.display = new Display(canvasName, this.control);
}
Program.prototype.update = function() {
	this.soundSystem.update();
	this.display.refresh();
	this.control.update();
}
