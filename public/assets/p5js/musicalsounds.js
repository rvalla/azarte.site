class musicalsounds {

  constructor(){
    this.sin = new p5.SinOsc();
    this.sin.freq(440);
    this.sin.amp(0.8);
		this.sqr = new p5.Oscillator("square");
		this.sqr.freq(440);
		this.tri = new p5.Oscillator("triangle");
		this.tri.freq(440);
		this.envsin = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.envsin.connect(this.sin);
		this.envsqr = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.envsqr.connect(this.sqr);
		this.envtri = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.envtri.connect(this.tri);
  }

	playSin(f) {
		this.sin.start();
		this.sin.freq(f);
		this.envsin.play(this.win);
	}

	playSqr(f) {
		this.sqr.start();
		this.sqr.freq(f);
		this.envsqr.play(this.sqr);
	}

	playTri(f) {
		this.tri.start();
		this.tri.freq(f);
		this.envtri.play(this.tri);
	}

}
