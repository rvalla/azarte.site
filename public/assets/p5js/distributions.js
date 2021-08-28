let bc, rc;
let algorithm, state, delay;
let h;
let times, steps, w;
let data, options;

function setup() {
	createCanvas(windowWidth, windowHeight);
	thecanvas = document.getElementsByTagName("canvas")[0];
	thecanvas.addEventListener("mousedown", processEv, false);
	thecanvas.addEventListener("touchstart", processEv, false);
	config = getURLParams();
	startConfig(config);
	background(bc);
	noLoop();
	h = new histogram(0, 0, windowWidth, windowHeight, color(64,140,240), w);
	print("Testing histograms v0.50");
}

function run(t) {
	update();
	h.update(data);
	background(bc);
	h.display();
	if (t < times) {
		setTimeout(run, delay, t + 1);
	} else {
		reset();
		state = 0;
	}
}

function update() {
	let n;
	let nn;
	let aux;
	switch (algorithm) {
		case 0:
			for (let i = 0; i < steps; i++) {
				n = random(options);
				data[n] += 1;
			}
			break;
		case 1:
			for (let i = 0; i < steps; i++) {
				n = random(options);
				nn = random(options);
				if (n < nn) {
					data[n] += 1;
				} else {
					data[nn] += 1;
				}
			}
			break;
		case 2:
			for (let i = 0; i < steps; i++) {
				n = random(options);
				nn = random(options);
				if (n > nn) {
					data[n] += 1;
				} else {
					data[nn] += 1;
				}
			}
			break;
		case 3:
			for (let i = 0; i < steps; i++) {
				n = random(options);
				nn = random(options);
				aux = n + nn;
				data[aux] += 1;
			}
			break;
		case 4:
			for (let i = 0; i < steps; i++) {
				n = random(options);
				nn = random(options);
				aux = n + nn + random(options);
				data[aux] += 1;
			}
			break;
	}
}

function reset() {
	for (let p = 0; p < w; p++) {
		data[p] = 0;
	}
}

function processEv() {
	switch (state) {
		case 1:
			state = 0;
			reset();
			break;
		case 0:
			background(bc);
			state = 1;
			run(0);
			break;
	}
	event.preventDefault();
  return false;
}

function startConfig(config) {
	delay = 0;
	times = 0;
	steps = 0;
	w = 0;
	state = 0;
	algorithm = 0;
	data = [];
	options = [0,1,2,3,4,5];
	let number = Number(config.times);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    times = number;
  } else {
		times = 20;
	}
	number = Number(config.step);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    steps = number;
  } else {
    steps = 6;
  }
	number = Number(config.delay);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    delay = number;
  } else {
    delay = 100;
  }
	number = Number(config.algorithm);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    algorithm = number;
  } else {
    algorithm = 0;
  }
	if (algorithm === 3) {
		w = 11;
	} else if (algorithm === 4) {
		w = 16;
	} else {
		w = 6;
	}
	for (let p = 0; p < w; p++) {
		data[p] = 0;
	}
	bc = color(211,210,192);
}
