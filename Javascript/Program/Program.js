function loadProgram() {
	var program = new Program("ludumDare35Canvas");
	setInterval(function(){program.update();}, program.updateDelay);
}

function Program(canvasName) {
	this.updateDelay = 20;

	this.simulation = new Simulation();

	this.soundSystem = new SoundSystem();
	this.control = new Control(canvasName, this.simulation, this);
	this.display = new Display(canvasName, this.simulation, this.control);
}
Program.prototype.update = function() {
	this.simulation.update();
	this.soundSystem.update();
	this.display.refresh();
	this.control.update();
}
