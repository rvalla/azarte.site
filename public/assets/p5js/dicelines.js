let state;
let colors, linew, behavior, cleaning, scale;
let px, py, x, y, segments;
let thecanvas;

function setup() {
	createCanvas(windowWidth, windowHeight);
	thecanvas = document.getElementsByTagName("canvas")[0];
	thecanvas.addEventListener("mouseup", processEv, false);
	thecanvas.addEventListener("touchend", processEv, false);
	background(210,210,190);
	config = getURLParams();
	startConfig(config);
	noLoop();
	printClick();
	print("Dice lines v0.50");
}

function processEv() {
	if (state === -1) {
		state = 1;
		background(210,210,190);
		stroke(random(colors));
		strokeWeight(linew);
		drawLine();
	} else if (state == 0) {
		state = 1;
		if (cleaning) {
			background(210,210,190);
		}
		stroke(random(colors));
		strokeWeight(linew);
		drawLine();
	} else if (state === 2) {
		state = 0;
		setOrigin();
		saveCanvas("DiceLine", "png");
	}
	event.preventDefault();
  return false;
}

function drawLine() {
	while (isXinCanvas() && isYinCanvas()) {
		if (behavior === 0) {
			getNewCoordinatesA();
		} else if (behavior === 1) {
			getNewCoordinatesB();
		}
		line(x, y, px, py);
		segments += 1;
	}
	state = 2;
	print(segments + " segments were drawn...");
}

function getNewCoordinatesA() {
	let d1 = throwDice();
	let d2 = throwDice();
	switch (d1) {
		case 1:
			px = x;
			x += d2 * scale;
			py = y;
			break;
		case 2:
			px = x;
			x += d2 * scale;
			py = y;
			y -= d2 * scale;
			break;
		case 3:
			px = x;
			x -= d2 * scale;
			py = y;
			y -= d2 * scale;
			break;
		case 4:
			px = x;
			x -= d2 * scale;
			py = y;
			break;
		case 5:
			px = x;
			x -= d2 * scale;
			py = y;
			y += d2 * scale;
			break;
		case 6:
			px = x;
			x += d2 * scale;
			py = y;
			y += d2 * scale;
			break;
	}
}

function getNewCoordinatesB() {
	let d1 = throwDice();
	let d2 = throwDice();
	if (d1 % 2 === 0) {
		px = x;
		x += d2 * scale;
		py = y;
	} else {
		py = y;
		y -= d2 * scale;
		px = x;
	}
}

function isXinCanvas() {
	return x >= 0 && x < width;
}

function isYinCanvas() {
	return y >= 0 && y < height;
}

function throwDice() {
	return random([1,2,3,4,5,6]);
}

function printClick() {
	fill(0);
	noStroke();
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("click", width / 2, height / 2);
}

function startConfig(config) {
	state = -1;
	colors = [];
	let number = Number(config.type);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    behavior = number;
  } else {
    behavior = 0;
  }
	number = Number(config.linew);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    linew = number;
  } else {
    linew = 2;
	}
	number = Number(config.scale);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    scale = number;
  } else {
    scale = 5;
	}
	let string = config.clean;
	if (typeof(string) === "string" && string === "false") {
    cleaning = false;
  } else {
    cleaning = true;
	}
	setOrigin();
	createColors();
}

function createColors() {
	let br = map(second(), 0, 59, 0, 75);
	let bg = map(minute(), 0, 59, 0, 75);
	let bb = map(hour(), 0, 23, 0, 75);
	for (let c = 0; c < 10; c++) {
		colors.push(createColor(br, bg, bb));
	}
}

function createColor(br, bg, bb) {
	let r = br + random(75);
  let g = bg + random(75);
  let b = bb + random(75);
  return color(r, g, b);
}

function setOrigin() {
	if (behavior === 0) {
		x = width / 2;
		px = x;
		y = height / 2;
		py = y;
	} else if (behavior === 1) {
		x = 5;
		px = x;
		y = height - 5;
		py = y;
	}
	segments = 0;
}
