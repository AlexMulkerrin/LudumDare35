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

function toRGBString(red, green, blue) {
    var colourString = '#';
    if (red < 16) colourString += '0';
    colourString += red.toString(16);
    if (green < 16) colourString += '0';
    colourString += green.toString(16);
    if (blue < 16) colourString += '0';
    colourString += blue.toString(16);
    return colourString;
}

function InvertRGBString(colourstring) {
	var comp = colourComponents(colourstring);
	var red = 255-comp[0];
	var green = 255-comp[1];
	var blue = 255-comp[2];
	return toRGBString(red, green, blue);
}

function colourComponents(colour) {
	var components=[], string;
	for (var i=0; i<3; i++) {
		// "#rrggbb"
		string = colour[1+i*2]+colour[2+i*2];
		components[i]=parseInt(string,16);
	}
	return components;
}

function fuzzColourComponents(colourComponents, fuzzFactor) {
	for (var i=0; i<3; i++) {
		// never more than 255 or less than 0
		colourComponents[i] += random(fuzzFactor*2)-fuzzFactor;
		if (colourComponents[i] < 0) colourComponents[i] = 0;
		if (colourComponents[i] > 255) colourComponents[i] = 255;
	}
	return colourComponents;
}
