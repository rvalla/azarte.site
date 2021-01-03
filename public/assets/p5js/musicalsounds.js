class musicalsounds {

  constructor(){
    this.fq = [150,300,450,600,750,900];
    this.sin = new p5.SinOsc();
    this.sin.freq(this.fq[0]);
    this.sin.amp(0.8);
		this.sqr = new p5.Oscillator("square");
		this.sqr.freq(this.fq[0]);
		this.tri = new p5.Oscillator("triangle");
		this.tri.freq(this.fq[0]);
		this.envsin = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.envsin.connect(this.sin);
		this.envsqr = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.envsqr.connect(this.sqr);
		this.envtri = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.envtri.connect(this.tri);
  }

	playSin() {
		this.sin.start();
		this.sin.freq(random(this.fq));
		this.envsin.play(this.win);
	}

	playSqr() {
		this.sqr.start();
		this.sqr.freq(random(this.fq));
		this.envsqr.play(this.sqr);
	}

	playTri() {
		this.tri.start();
		this.tri.freq(random(this.fq));
		this.envtri.play(this.tri);
	}

}
