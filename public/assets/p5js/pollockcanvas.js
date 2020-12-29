let colors = [];
let cc, active;
let brush, biterations, bsize;
let thecanvas;

function setup() {
	createCanvas(windowWidth, windowHeight);
	thecanvas = document.getElementsByTagName("canvas")[0];
	thecanvas.addEventListener("mousedown", processEv, false);
	thecanvas.addEventListener("touchstart", processEv, false);
	background(210,210,190);
	config = getURLParams();
	startConfig(config);
	frameRate(24);
	brush = new pollockbrush(bsize, biterations);
	createColors();
	printClick();
	print("Pollock canvas v0.50");
}


function processEv() {
	if (active === true) {
		fill(random(colors));
		noStroke();
	  brush.paint(mouseX, mouseY, pmouseX, pmouseY);
	} else {
		active = true;
		background(210,210,190);
	}
	event.preventDefault();
  return false;
}

function createColors() {
	let br = map(second(), 0, 59, 0, 75);
	let bg = map(minute(), 0, 59, 0, 75);
	let bb = map(hour(), 0, 23, 0, 75);
	for (let c = 0; c < cc; c++) {
		colors.push(createColor(br, bg, bb));
	}
}

function createColor(br, bg, bb) {
	let r = br + random(75);
  let g = bg + random(75);
  let b = bb + random(75);
  return color(r, g, b);
}

function printClick() {
	fill(0);
	noStroke();
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("click", width / 2, height / 2);
}

function printError() {
	fill(0);
	noStroke();
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("error", width / 2, height / 2);
}

function startConfig(config) {
	active = false;
	let number = Number(config.iterations);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    biterations = number;
  } else {
    biterations = 30;
  }
	number = Number(config.colorcount);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    cc = number;
  } else {
    cc = 20;
  }
	number = Number(config.brushsize);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    bsize = number;
  } else {
    bsize = 20;
  }
}
