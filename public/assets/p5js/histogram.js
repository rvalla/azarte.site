class histogram {

  constructor(x, y, w, h, c, dw) {
		this.x = x;
		this.y = y;
		this.w = w;
    this.h = h;
    this.c = c;
		this.dw = dw;
		this.barw = this.w / this.dw;
    this.data = [];
		this.max = 1;
		for (let p = 0; p < this.dw; p++) {
			this.data[p] = 0;
		}
  }

  update(d) {
    this.data = d;
		this.max = max(this.data);
  }

	display() {
    noStroke();
		fill(this.c);
		for (let b = 0; b < this.dw; b++) {
			let x = this.barw * b;
			let y = 0;
			let h = this.h * this.data[b] / this.max;
			rect(x, this.h - h, this.barw, h);
		}
  }

}
