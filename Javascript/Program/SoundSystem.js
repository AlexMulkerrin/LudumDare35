function SoundSystem() {
	this.ctx = new AudioContext();
	this.tone = [];
	for (var i=0; i<1; i++) {
		var note = random(88);
		this.tone[i] = new Tone(this.ctx, note);
	}

}
SoundSystem.prototype.update = function() {
	for (var i=0; i<this.tone.length; i++) {
		if (this.tone[i].isPlaying) {
			this.tone[i].fade();
		}
	}
	if (Math.random()>0.99 && this.tone.length<10) {
		var note = random(7)*12;
		this.tone.push(new Tone(this.ctx, note));
	}
	// remove finished tones
	var newTone = [];
	for (var i=0; i<this.tone.length; i++) {
		if (this.tone[i].isPlaying) {
			newTone.push(this.tone[i]);
		}
	}
	this.tone = newTone;

}

function Tone(context, noteID) {
	this.oscillator = context.createOscillator();
	this.oscillator.type = "triangle";
	this.oscillator.frequency.value = noteFrequency(noteID);
	this.oscillator.start();
	this.gainNode = context.createGain();
	this.gainNode.gain.value = 0.2;
	this.oscillator.connect(this.gainNode);
	this.gainNode.connect(context.destination);
	this.isPlaying = true;

}
Tone.prototype.fade = function() {
	this.gainNode.gain.value /= 1.2;
	if (this.gainNode.gain.value < 0.0001) {
		this.isPlaying = false;
		this.gainNode.disconnect();
		console.log("gone");
	}
}


function noteFrequency(note) {
	return Math.pow(2, ((note - 49)/12)) * 440;
}
