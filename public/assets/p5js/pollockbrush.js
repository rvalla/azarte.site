class pollockbrush {

  constructor(size, iterations) {
		this.os = size;
		this.s = this.os;
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
  }

  update(x, y, px, py) {
		let dx = x - px;
		let dy = y - py;
		this.xof = map(dx, -width, width, -25, 25);
		this.yof = map(dy, -height, height, -25, 25);
		let aux = max([abs(dx), abs(dy)]);
		this.s = this.os * map(abs(aux), 0, 1000, 1.5, 0.5);
		this.sfactor = map(abs(aux), 0, 1000, 0.95, 0.7);
  }

	getOffset(offset) {
		return offset + random(3) - 1.5;
	}

}
