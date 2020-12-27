class star {

  constructor(fix, x, y) {
    this.m = 1.25 + random(0.75);
		this.cx = x;
		this.cy = y;
    this.color = this.getColor();
    this.d = this.getDiameter();
    this.isFixed = fix;
    if (this.isFixed === true) {
      this.p = createVector(width / 2, height / 2);
    } else {
      this.p = createVector(this.getCoordinate(2 * cx), this.getCoordinate(2 * cy));
    }
		this.s = createVector(0, 0);
    this.a = createVector(0, 0);
  }

  display() {
    push();
    translate(this.p.x, this.p.y);
    fill(this.color);
    noStroke();
    ellipseMode(CENTER);
    ellipse(0, 0, this.d, this.d);
    pop();
  }

  update(a) {
		this.a.set(a);
    this.s.add(this.a);
    this.p.add(this.s);
  }

  reset() {
    if (this.isFixed === true) {
      this.p.set(width / 2, height / 2);
      this.s.set(0, 0);
    } else {
      this.p.set(this.getCoordinate(width), this.getCoordinate(height));
    }
  }

  getDiameter() {
    if (width < height) {
      return this.m * width * 0.05;
    } else {
      return this.m * height * 0.0375;
    }
  }

  getColor() {
    let r = 170 + random(75);
    let g = 100 + random(50);
    let b = second();
    return color(r, g, b, 255);
  }

  getCoordinate(limit) {
    let l = limit / 3;
    return l + random(l);
  }

  setInitSpeed(center) {
    let speed = p5.Vector.sub(this.p, center);
    speed.rotate(HALF_PI);
		let m = sqrt(this.a.mag() * speed.mag());
		speed.setMag(m);
	  this.s.set(speed);
  }

}
