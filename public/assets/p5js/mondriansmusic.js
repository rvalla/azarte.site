let colors = [];
let start, duration, messages;
let speedfactor, minstep, timestep, soundevents;
let sound, melodies, mdurations, activemelody;
let activecolor, rgb, position, cw, ch, margin;
let thecanvas, state, ms;

function setup() {
	getAudioContext().suspend();
	createCanvas(windowWidth, windowHeight);
	thecanvas = document.getElementsByTagName("canvas")[0];
	thecanvas.addEventListener("mousedown", processEv, false);
	thecanvas.addEventListener("touchstart", processEv, false);
	background(255);
	config = getURLParams();
	startConfig(config);
	frameRate(24);
	noLoop();
	buildMelodies(minstep, timestep);
	printClick(-1);
	print("Mondrian's music v0.50");
}

function draw() {
	if (state === 1 || state === 2) {
		checkState();
	}
}

function processEv() {
	switch (state) {
		case 1:
			drawRectangle();
			break;
		case 0:
			background(255);
			start = millis();
			position = margin;
			loadMelody(activemelody);
			setColors();
			state = 1;
			loop();
			break;
		case -1:
			userStartAudio();
			ms = new musicalsounds();
			background(255);
			printClick(activemelody);
			state = 0;
			break;
	}
	event.preventDefault();
  return false;
}

function drawRectangle() {
	stroke(colors[2]);
	strokeWeight(5);
	fill(colors[activecolor]);
	let d = constrain(map(millis() - start, 0, duration, margin, cw), margin, cw);
	if (width > height) {
		rect(position, margin, d - position, ch);
	} else {
		rect(margin, position, ch, d - position);
	}
	activecolor = (activecolor + 1) % 2;
	position = d + margin;
}

function finishStrip() {
	stroke(colors[2]);
	strokeWeight(5);
	fill(colors[activecolor]);
	if (width > height) {
		rect(position, margin, cw + margin - position, ch);
	} else {
		rect(margin, position, ch, cw + margin - position);
	}
}

function checkState() {
	if (millis() - start > duration) {
		if (state === 1) {
			state = 2;
			noLoop();
			finishStrip();
			saveCanvas("MondriansMelody_" + str(activemelody + 1), "png");
			if (activemelody < 3) {
				activemelody += 1;
			}
			setTimeout(newLevel, 1000);
		}
	}
}

function newLevel() {
	state = 0;
	background(255);
	printClick(activemelody);
}

function printClick(n) {
	fill(0);
	noStroke();
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text(messages[n+1], width / 2, height / 2);
}

function startConfig(config) {
	start = 0;
	state = -1;
	minstep = 300;
	sound = 1;
	activecolor = 0;
	rgb = [0,0,0];
	margin = 10;
	position = 10;
	pd = position;
	melodies = [];
	messages = [];
	activemelody = 0;
	mdurations = [7000, 7000, 7000, 7000];
	setRGB();
	if (width > height) {
		cw = width - margin * 2;
		ch = height - margin * 2;
	} else {
		cw = height - margin * 2;
		ch = width - margin * 2;
	}
	let number = Number(config.duration);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    mdurations[4] = 1000 * number;
  }
	number = Number(config.step);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    timestep = number;
  } else {
    timestep = 700;
  }
	number = Number(config.speedfactor);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    speedfactor = number;
  } else {
    speedfactor = 1.7;
  }
	let string = config.lan;
	if (typeof(string) === "string" && string === "en") {
		messages[0] = "click\n(start audio)";
		messages[1] = "click\n(level 1 - mikrokosmos)";
		messages[2] = "click\n(level 2 - mikrokosmos)";
		messages[3] = "click\n(level 3 - mikrokosmos)";
		messages[4] = "click\n(level 4 - random melody)";
	} else {
		messages[0] = "click\n(iniciar audio)";
		messages[1] = "click\n(nivel 1 - mikrokosmos)";
		messages[2] = "click\n(nivel 2 - mikrokosmos)";
		messages[3] = "click\n(nivel 3 - mikrokosmos)";
		messages[4] = "click\n(nivel 4 - melodía aleatoria)";
	}
	colors.push(color(0,0,0));
	colors.push(color(0,0,0));
	colors.push(color(0,0,0));
}

function setColors() {
	let aux = random([0,1,2]);
	colors[0] = color(rgb[aux], rgb[(aux + 1) % 3], rgb[(aux + 2) % 3]);
	aux = (aux + 1) % 3;
	colors[1] = color(rgb[aux], rgb[(aux + 1) % 3], rgb[(aux + 2) % 3]);
}

function setRGB() {
		rgb[0] = (second() + minute()) * 2 + 78;
		rgb[1] = abs(second() - minute()) * 2 + 78;
    rgb[3] = hour() * 11;
}

function play(f) {
	switch (sound) {
		case 0:
			ms.playSin(f);
			break;
		case 1:
			ms.playTri(f);
			break;
		case 2:
			ms.playSqr(f);
			break;
	}
}

function loadMelody(n) {
	delay = 500;
	for (let e = 0; e < melodies[n].length; e++) {
		setTimeout(play, delay * speedfactor, melodies[n][e][0]);
		delay += melodies[n][e][1];
	}
	duration = mdurations[n] + 500;
}

function buildMelodies(ms, ts) {
	melodies[0] = [[349,600],[392,900],[440,300],[466,900],[440,300],[392,300],[349,300],[329,300],[293,300],[392,300]];
	melodies[1] = [[370,350],[349,350],[370,350],[349,1050],[311,350],[370,350],[415,350],[370,350],[349,700],[311,350]];
	melodies[2] = [[466,225],[523,225],[622,225],[587,225],[698,500],[622,225],[523,225],[622,225],[587,500],[523,225]];
	melodies[3] = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
	delay = 0;
	duration = 0;
	for (let s = 0; s < 10; s++) {
		delay = ms + random(ts);
		duration += delay;
		melodies[3][s][0] = random(440) + 440;
		melodies[3][s][1] = delay;
	}
	mdurations[0] = 5000 * speedfactor;
	mdurations[1] = 5050 * speedfactor;
	mdurations[2] = 3200 * speedfactor;
	mdurations[3] = 500 + duration * speedfactor;
}
