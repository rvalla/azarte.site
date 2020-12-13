let attractor;
let xc = [];
let yc = [];
let x, y, px, py;
let cx, cy, ang;
let colors = [];
let i, ic, cc, active;
let lastclick;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(210,210,190);
	config = getURLParams();
	startConfig(config);
	createColors();
	noLoop();
	printClick();
	print("Strange Attractors v0.60");
}

function draw() {
	print("1");
	translate(cx, cy);
	rotate(ang);
	for (let p = 0; p < 10; p++) {
		if (i < ic && active === true) {
			if (Number.isFinite(x) && Number.isFinite(y)) {
				stroke(random(colors));
				point(x, y);
				getNewCoordinates();
				i ++;
			} else {
				noLoop();
				active = false;
				print("Coordinates are strange...");
				rotate(-ang);
				printError();
			}
		}
	}
}

function getNewCoordinates() {
	px = x;
	py = y;
	switch (attractor) {
		case 0:
			getNewCAttractor0();
			break;
		case 1:
			getNewCAttractor1();
			break;
	}
}

function getNewCAttractor0() {
	x = getNewCoordinate(xc);
	y = getNewCoordinate(yc);
}

function getNewCAttractor1() {
	x = getNewCoordinate(xc);
	y = x * sin(px);
}

function getNewCoordinate(plist) {
	let c = plist[0] + plist[1] * px + plist[2] * py + plist[3] * pow(abs(px), plist[4]) +
					plist[5] * pow(abs(py), plist[6]);
	return c;
}

function mousePressed() {
  if (100 < millis() - lastclick) {
		if (active === false) {
			active = true;
			background(210,210,190);
			loop();
		}
    lastclick = millis();
  }
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

function startConfig(config) {
	i = 0;
	lastclick = 0;
	active = false;
	cx = width / 2;
	cy = height / 2;
	if (cx > cy) {
		ang = 0;
	} else {
		ang = HALF_PI;
	}
	let number = Number(config.type);
  if (typeof(number) === "number" && Number.isInteger(number)) {
		if (number < 2) {
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
		x = 50;
		px = x;
  }
	number = Number(config.oy);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    y = number;
		py = y;
  } else {
		y = 50;
		py = y;
  }
	let string = config.xc;
  if (typeof string === "string") {
    xc = getEqParameters(string.split("_"));
  } else {
		xc = [-0.9,0.2,0.74,-0.75,0.3,1.4,-2.5];
	}
	string = config.yc;
	if (typeof string === "string") {
    yc = getEqParameters(string.split("_"));
  } else {
		yc = [-0.7,-0.6,-0.64,1.55,-0.2,-1.1,-0.4];
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

function printClick() {
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("click", cx, cy);
}

function printError() {
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("error", 0, 0);
}
