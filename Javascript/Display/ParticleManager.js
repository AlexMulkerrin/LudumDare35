function ParticleManager(canvas) {
	this.targetCanvas = canvas;
	this.particle = [];
	for (var i=0; i<1000; i++) {
		this.particle[i] = new Particle();
		this.particle[i].isEternal = true;
	}
}

function Particle(colour, size, x, y) {
	this.colour = colour || "#ffffff";
	this.size = size || random(10);
	this.isEternal = false;
	this.isPresent = true;
	this.x = x || random(window.innerWidth);
	this.y = y || random(window.innerHeight);
	this.vx = 0;
	this.vy = Math.random();
}

ParticleManager.prototype.createParticle = function(x, y, colour, size) {
	x += random(10)-5;
	y += random(10)-5;
	size = size || random(4)+3;
	var newParticle = new Particle(colour, size, x, y);
	newParticle.vx = Math.random()-0.5;
	newParticle.vy = Math.random()+1;
	this.particle.push(newParticle);
}

ParticleManager.prototype.update = function () {
	var regenRequired = false;
	for (var i=0; i<this.particle.length; i++) {
		var part = this.particle[i];
		part.x += part.vx;
		part.y += part.vy;
		if (part.y> this.targetCanvas.height) {
			if (part.isEternal) {
				 part.y=0;
			} else {
				part.isPresent = false;
				regenRequired = true;
			}
		}
	}
	if (regenRequired) this.regenParticleArray();
	this.draw();
}

ParticleManager.prototype.regenParticleArray = function() {
	var newParticle = [];
	for (var i=0; i<this.particle.length; i++) {
		if (this.particle[i].isPresent) {
			newParticle.push(this.particle[i]);
		}
	}
	this.particle = newParticle;
}

ParticleManager.prototype.draw = function() {
	for (var i=0; i<this.particle.length; i++) {
		var part = this.particle[i];
		this.targetCanvas.ctx.fillStyle = part.colour;
		this.targetCanvas.ctx.fillRect(part.x, part.y, part.size, part.size);
	}
}
