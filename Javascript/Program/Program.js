function loadProgram() {
	var program = new Program("ludumDare35Canvas");
	setInterval(function(){program.update();}, program.updateDelay);
}

function Program(canvasName) {
	this.updateDelay = 20;

	this.display = new Display(canvasName);
}
Program.prototype.update = function() {
	this.display.refresh();
}
