let behavior, state, ox, oy, ang;
let x = [];
let y = [];
let cx, cy;
let colors = [];
let p, ic, cc, active;
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
	buildPoints();
	noLoop();
	printClick();
	print("Random paths v0.50");
}

function draw() {
	if (active) {
		rotate(ang);
		for (let n = 0; n < p; n++) {
			switch (behavior) {
				case 0:
					x[n] += getRandomMotion();
					y[n] += getRandomMotion();
					break;
				case 1:
					x[n] += getRandomMotion();
					y[n] += getRandomToLimit(y[n], cy);
					break;
				case 2:
					x[n] += getRandomAttraction(x[n], cx);
					y[n] += getRandomAttraction(y[n], cy);
					break;
			}
			stroke(random(colors));
			point(x[n], y[n]);
		}
	}
}

function getRandomMotion() {
	return random(6) - 3;
}

function getRandomToLimit(c, center) {
	if (c > center) {
		return random(6) - 3;
	} else {
		return random(6);
	}
}

function getRandomAttraction(c, center) {
	let d = center - c;
	let f = map(d, -center, center, -1, 1);
	return random(4) * f;
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
			saveCanvas("RandomPaint", "png");
			state = 0;
			active = false;
		}
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
	state = 0;
	let number = Number(config.type);
  if (typeof(number) === "number" && Number.isInteger(number)) {
		if (number < 3) {
			behavior = number;
		} else {
			behavior = 0;
		}
  } else {
    behavior = 0;
  }
	number = Number(config.points);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    p = number;
  } else {
    p = 100;
  }
	number = Number(config.cx);
	if (typeof(number) === "number" && Number.isInteger(number)) {
		cx = number;
	} else {
		cx = width / 2;
	}
	number = Number(config.cy);
	if (typeof(number) === "number" && Number.isInteger(number)) {
		cy = number;
	} else {
		cy = height / 2;
	}
	number = Number(config.angle);
  if (typeof(number) === "number" && Number.isFinite(number)) {
    ang = number;
  } else {
    ang = 0;
  }
  number = Number(config.iterations);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    ic = number;
  } else {
    ic = 10000;
  }
	number = Number(config.colorcount);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    cc = number;
  } else {
    cc = 20;
  }
	let string = config.ox;
  if (typeof string === "string") {
    ox = getOrigins(string.split("_"));
  } else {
		ox = [cx - round(random(cx)), cx + round(random(100) - 50), cx + round(random(cx))];
	}
	string = config.oy;
	if (typeof string === "string") {
    oy = getOrigins(string.split("_"));
  } else {
		oy = [cy -  round(random(cy)), cy + round(random(100) - 50), cy + round(random(cy))];
	}
}

function getOrigins(s) {
	plist = [];
	for (let p = 0; p < s.length; p++) {
		try {
			plist[p] = Number(s[p]);
		} catch (error) {
			plist[p] = cx;
			print("That is not a valid parameter...");
		}
	}
	return plist;
}

function buildPoints() {
	x = [];
	y = [];
	let group = floor(p / ox.length);
	for (let g = 0; g < ox.length; g++) {
		for (let n = 0; n < group; n++) {
			x[n+g*group] = ox[g];
			y[n+g*group] = oy[g];
		}
	}
}
