let state, speedset, setx, sety, ap;
let cx, cy, bco;
let sn, an, G;
let g, gs, b;
let thecanvas;

function setup() {
  createCanvas(windowWidth, windowHeight);
	thecanvas = document.getElementsByTagName("canvas")[0];
	thecanvas.addEventListener("mousedown", processEv, false);
	thecanvas.addEventListener("touchend", processEv, false);
	strokeWeight(5);
  frameRate(50);
  config = getURLParams();
  startConfig(config);
	background(bco);
	g = new gravity(sn, an, cx, cy, G, false);
	ap = g.getAsteroidPosition(0);
  print("orbital paint: v0.50");
}

function draw() {
	ap = g.getAsteroidPosition(0);
	switch (state) {
		case 0:
			preFrame();
			break;
		case 1:
			paintFrame();
			break;
	}
}

function preFrame() {
	background(bco);
	stroke(255,0,0,255);
	if (speedset === false) {
		setx = mouseX;
		sety = mouseY;
	}
	line(ap.x, ap.y, setx, sety);
	noStroke();
	g.display();
	b.display(mouseX, mouseY);
}

function paintFrame() {
	g.display();
}

function processEv() {
  switch (state) {
    case 0:
			if (b.contains(mouseX, mouseY)) {
				play();
			} else {
				setx = mouseX;
				sety = mouseY;
				setSpeed(setx, sety);
			}
      break;
		case 1:
			stop();
			break;
		case 2:
			saveCanvas("GracityPaint", ".png");
			state = 0;
			break;
  }
	event.preventDefault();
  return false;
}

function play() {
	g.play();
	background(bco);
	state = 1;
	speedset = false;
}

function stop() {
	g.stop();
	state = 2;
}

function setSpeed(x, y) {
	g.setAsteroidsSpeed(x, y);
	speedset = true;
}

function startConfig(config) {
	b = new button(65, height - 65, 35, color(250,60,30), color(125,30,15), "", color(255));
	state = 0;
	speedset = false;
	setx = 0;
	sety = 0;
	bco = color(210,210,190);
  let number = Number(config.sn);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    sn = number;
  } else {
    sn = 1;
  }
	number = Number(config.an);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    an = number;
  } else {
    an = 1;
  }
	number = Number(config.cx);
  if (typeof(number) === "number" && Number.isInteger(number) && number < width) {
    cx = number;
  } else {
    cx = width / 2;
  }
	number = Number(config.cy);
  if (typeof(number) === "number" && Number.isInteger(number) && number < height) {
    cy = number;
  } else {
    cy = height / 2;
  }
	number = Number(config.g);
  if (typeof(number) === "number" && Number.isFinite(number)) {
    G = number;
  } else {
    G = 15;
  }
}
