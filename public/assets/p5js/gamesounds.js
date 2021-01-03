class gamesounds {

  constructor(){
		this.d = 0;
    this.df = 1;
    this.p1 = createVector(0, 0);
    this.p2 = createVector(0, 0);
    this.sf = 330;
    this.sin = new p5.SinOsc();
    this.sin.freq(this.sf);
    this.sin.amp(0.6);
		this.lose = new p5.Oscillator("square");
		this.lose.freq(110);
		this.win = new p5.Oscillator("triangle");
		this.win.freq(440);
		this.winEnv = new p5.Envelope(0.05, 0.9, 0.8, 0.1);
		this.winEnv.connect(this.win);
		this.loseEnv = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.loseEnv.connect(this.lose);
  }

	playWin() {
		this.win.start();
		this.winEnv.play(this.win);
	}

	playLose() {
		this.lose.start();
		this.loseEnv.play(this.lose);
	}

  playDoppler() {
		this.win.stop();
		this.lose.stop();
    this.sin.start();
  }

  stopDoppler() {
		this.df = 1;
		this.sf = 330;
		this.sin.stop();
  }

  updateDopplerFactor(p1, p2) {
    let newd = p5.Vector.mag(p5.Vector.sub(p1, p2));
    let s = constrain(this.d - newd, -75, 75);
    this.df = map(s, -75, 75, 0, 2);
    this.d = newd;
  }

  updateSin() {
    this.sin.freq(this.sf * this.df);
  }

}
