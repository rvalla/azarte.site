class pollockbrush {

  constructor(size, iterations) {
    this.s = size;
		this.i = iterations;
		this.xof = 0;
		this.yof = 0;
		this.sfactor = 0.9;
  }

  paint(x, y, px, py) {
    this.update(x, y, px, py);
    for (let p = 0; p < this.i; p++) {
			let size = this.s * pow(this.sfactor, p);
			ellipse(x + this.getOffset(this.xof) * p, y + this.getOffset(this.yof) * p, size, size);
		}
		print(this.s);
		print(this.xof + " " + this.yof);
		print(this.sfactor);
  }

  update(x, y, px, py) {
		this.xof = constrain(x - px, -10, 10);
		this.yof = constrain(y - py, -10, 10);
		let aux = (this.xof + this.yof) / 2;
		this.sfactor = map(abs(aux), 0, 10, 0.99, 0.7);
  }

	getOffset(offset) {
		return offset + random(2) - 1;
	}

}
