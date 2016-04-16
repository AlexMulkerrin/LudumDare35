function ParticleManager(canvas) {
	this.targetCanvas = canvas;
	this.particle = [];
	for (var i=0; i<1000; i++) {
		this.particle[i] = new Particle(this.targetCanvas);
	}
}

function Particle(canvas) {
	this.colour = "#ffffff";
	this.size = random(10);
	this.x = random(canvas.width);
	this.y = random(canvas.height);
	this.vx = 0;
	this.vy = Math.random();
}

ParticleManager.prototype.update = function () {
	for (var i=0; i<this.particle.length; i++) {
		var part = this.particle[i];
		part.x += part.vx;
		part.y += part.vy;
		if (part.y> this.targetCanvas.height) part.y=0;
	}
	this.draw();
}
ParticleManager.prototype.draw = function () {
	for (var i=0; i<this.particle.length; i++) {
		var part = this.particle[i];
		this.targetCanvas.ctx.fillStyle = part.colour;
		this.targetCanvas.ctx.fillRect(part.x, part.y, part.size, part.size);
	}
}
