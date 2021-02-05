let attractor;
let xclist = [];
let yclist = [];
let xc = [];
let yc = [];
let x, y, px, py;
let cx, cy, tx, ty, ang;
let colors = [];
let i, ic, cc, active, state;
let thecanvas;

function setup() {
	createCanvas(windowWidth, windowHeight);
	thecanvas = document.getElementsByTagName("canvas")[0];
	thecanvas.addEventListener("mousedown", processEv, false);
	thecanvas.addEventListener("touchend", processEv, false);
	background(210,210,190);
	config = getURLParams();
	startConfig(config);
	createColors();
	noLoop();
	printClick();
	print("Strange Attractors v0.60");
}

function draw() {
	translate(tx, ty);
	rotate(ang);
	for (let p = 0; p < 10; p++) {
		if (i < ic && active === true) {
			if (Number.isFinite(x) && Number.isFinite(y)) {
				stroke(random(colors));
				point(map(x, -3.5, 3.5, -cx, cx), map(y, -3.5, 3.5, -cy, cy));
				getNewCoordinates();
				i ++;
			} else {
				noLoop();
				print("Coordinates are strange...");
				rotate(-ang);
				printError();
				resetAttractor();
				active = false;
			}
		}
	}
}

function getNewCoordinates() {
	px = x;
	py = y;
	switch (attractor) {
		case 0:
			x = getNewCoordinate(xc);
			y = getNewCoordinate(yc);
			break;
		case 1:
			x = getNewCoordinate(xc);
			y = sin(px);
			break;
		case 2:
			x = getNewCoordinate(xc);
			y = x;
	}
}

function getNewCoordinate(plist) {
	let c = plist[0] + plist[1] * px + plist[2] * pow(px, 2) + plist[3] * px * py + plist[4] * py + plist[5] * pow(py, 2);
	return c;
}

function processEv() {
  if (active === false) {
		active = true;
		state = 1;
		background(210,210,190);
		loop();
	} else {
		if (state === 1) {
			noLoop();
			state = 2;
		} else if (state === 2) {
			saveCanvas("AttractorPaint", "png");
			state = 0;
			resetAttractor();
			active = false;
		}
	}
	event.preventDefault();
  return false;
}

function resetAttractor() {
	x = 0;
	y = 0;
	px = x;
	py = y;
	let aux = floor(random(xclist.length));
	xc = xclist[aux];
	yc = yclist[aux];
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
	text("click", cx, cy);
}

function printError() {
	fill(0);
	noStroke();
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("error", 0, 0);
}

function startConfig(config) {
	i = 0;
	active = false;
	cx = width / 2;
	cy = height / 2;
	state = 0;
	buildAttractorList();
	let number = Number(config.type);
  if (typeof(number) === "number" && Number.isInteger(number)) {
		if (number < 3) {
			attractor = number;
		} else {
			attractor = 0;
		}
  } else {
    attractor = 0;
  }
  number = Number(config.iterations);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    ic = number;
  } else {
    ic = 100000;
  }
	number = Number(config.cx);
	if (typeof(number) === "number" && Number.isInteger(number)) {
		tx = number;
	} else {
		tx = width / 2;
	}
	number = Number(config.cy);
	if (typeof(number) === "number" && Number.isInteger(number)) {
		ty = number;
	} else {
		ty = height / 2;
	}
	number = Number(config.colorcount);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    cc = number;
  } else {
    cc = 20;
  }
	number = Number(config.ox);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    x = number;
		px = x;
  } else {
		x = 0;
		px = x;
  }
	number = Number(config.oy);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    y = number;
		py = y;
  } else {
		y = 0;
		py = y;
  }
	number = Number(config.angle);
  if (typeof(number) === "number" && Number.isFinite(number)) {
    ang = number;
  } else {
		if (cx > cy) {
			ang = 0;
		} else {
			ang = HALF_PI;
		}
  }
	let string = config.xc;
	let aux = floor(random(xclist.length));
  if (typeof string === "string") {
    xc = getEqParameters(string.split("_"));
  } else {
		xc = xclist[aux];
	}
	string = config.yc;
	if (typeof string === "string") {
    yc = getEqParameters(string.split("_"));
  } else {
		yc = yclist[aux];
	}
}

function getEqParameters(s) {
	let plist = [0,0,0,0,0,0,0];
	for (let p = 0; p < 7; p++) {
		try {
			plist[p] = Number(s[p]);
		} catch (error) {
			print("That is not a valid parameter...");
		}
	}
	return plist;
}

function buildAttractorList() {
	xclist = [];
	yclist = [];
	xclist[0] = [-1.2,-0.6,-0.5,0.1,-0.7,0.2];
	yclist[0] = [-0.9,0.9,0.1,-0.3,-1,0.3];
	xclist[1] = [1,0,-1.4,0,0.3,0];
	yclist[1] = [0,1,0,0,0,0];
	xclist[2] = [-0.8,-0.1,1.1,-1.2,0.3,1.1]
	yclist[2] = [0,0.3,0.4,0.2,-1.1,0.7]
}
