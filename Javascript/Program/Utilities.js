function random(integer) {
	return Math.floor(Math.random() * integer);
}

function randomChoice(options) {
	var pick = random(options.length);
	return options[pick];
}

function randomRGBString() {
    var colourString="#";
    for (var i=0; i<6; i++) {
        var hexDigit = random(16);
        colourString += hexDigit.toString(16);
    }
    return colourString;
}
