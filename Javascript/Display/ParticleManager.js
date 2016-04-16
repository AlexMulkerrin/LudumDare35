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
	this.size = size || random(2)+1;
	this.isEternal = false;
	this.isPresent = true;
	this.duration = 0;
	this.timeSpent = 0;

	this.x = x || random(window.innerWidth);
	this.y = y || random(window.innerHeight);
	this.vx =  Math.random()-0.5;
	this.vy = 0;
	this.angle = Math.random()*2*Math.PI;
	this.vangle = Math.random()*0.1-0.05;
}

ParticleManager.prototype.createParticle = function(x, y, colour, size, type, vx, vy) {
	x += random(10)-5;
	y += random(10)-5;
	size = size || random(2)+1;
	var newParticle = new Particle(colour, size, x, y);
	newParticle.duration =  Math.random()*50+50;
	if (type === "propellant") {
		newParticle.colour = InvertRGBString(colour);
		newParticle.vx = -vx;
		newParticle.vy = -vy;
	}
	if (type === "fall") {
		newParticle.vx = Math.random()-0.5;
		newParticle.vy = Math.random()+1;
	}
	if (type === "fly") {
		newParticle.vx = Math.random()*2-1;
		newParticle.vy = Math.random()*2-1;
	}

	this.particle.push(newParticle);
}

ParticleManager.prototype.update = function () {
	var regenRequired = false;
	for (var i=0; i<this.particle.length; i++) {
		var part = this.particle[i];
		part.timeSpent++;
		part.x += part.vx;
		part.y += part.vy;
		part.angle += part.vangle;
		if (part.y> this.targetCanvas.height) {
			if (part.isEternal) {
				 part.y=0;
			} else {
				part.isPresent = false;
				regenRequired = true;
			}
		}
		if (part.duration>0 && part.timeSpent>part.duration) {
			part.isPresent = false;
			regenRequired = true;
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
	var ctx = this.targetCanvas.ctx;
	ctx.setTransform(1,0,0,1,0,0);
	for (var i=0; i<this.particle.length; i++) {
		var part = this.particle[i];
		ctx.fillStyle = part.colour;
		ctx.translate(part.x,part.y);
		ctx.rotate(part.angle);

		ctx.fillRect(-part.size/2, -part.size/2, part.size, part.size);

		ctx.rotate(-part.angle);
		ctx.translate(-part.x,-part.y);
	}
	ctx.setTransform(1,0,0,1,0,0);
}
