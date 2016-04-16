function random(integer) {
	return Math.floor(Math.random() * integer);
}

function randomChoice(options) {
	var pick = random(options.length);
	return options[pick];
}
