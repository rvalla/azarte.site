let colors = [];
let start, duration, minstep, timestep, soundevents, sound;
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
	frameRate(50);
	printClick();
	print("Mondrian's music v0.50");
}

function processEv() {
	switch (state) {
		case 1:
			drawRectangle();
			checkState();
			break;
		case 2:
			saveCanvas("MondrianMelody", "png");
			state = 0;
			break;
		case 0:
			background(255);
			start = millis();
			position = margin;
			buildMelody(soundevents, minstep, timestep);
			state = 1;
			break;
		case -1:
			userStartAudio();
			ms = new musicalsounds();
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
	let d = map(millis() - start, 0, duration, 0, cw - margin);
	if (width > height) {
		rect(position, margin, d - position, ch);
	} else {
		rect(margin, position, ch, d - position);
	}
	activecolor = (activecolor + 1) % 2;
	position = d + margin;
}

function checkState() {
	if (millis() - start > duration) {
		state = 2;
	}
}

function printClick() {
	fill(0);
	noStroke();
	textSize(width/15);
	textAlign(CENTER, CENTER);
	text("click", width / 2, height / 2);
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
    duration = 1000 * number;
  } else {
    duration = 10000;
  }
	number = Number(config.step);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    timestep = number;
  } else {
    timestep = 700;
  }
	number = Number(config.events);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    soundevents = number;
  } else {
    soundevents = 10;
  }
	buildColors();
}

function buildColors() {
	let aux = random([0,1,2]);
	colors.push(color(rgb[aux], rgb[(aux + 1) % 3], rgb[(aux + 2) % 3]));
	aux = (aux + 1) % 3;
	colors.push(color(rgb[aux], rgb[(aux + 1) % 3], rgb[(aux + 2) % 3]));
	colors.push(color(0));
}

function setRGB() {
		rgb[0] = (second() + minute()) * 2 + 78;
		rgb[1] = abs(second() - minute()) * 2 + 78;
    rgb[3] = hour() * 11;
}

function play() {
	switch (sound) {
		case 0:
			ms.playSin();
			break;
		case 1:
			ms.playTri();
			break;
		case 2:
			ms.playSqr();
			break;
	}
}

function buildMelody(count, ms, ts) {
	delay = 0;
	for (let s = 0; s < count; s++) {
		delay += ms + random(ts);
		setTimeout(play, delay);
	}
}
