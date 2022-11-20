export class Square {
  constructor(size, center) {
    this.screen = screen;
    this.size = size;
    this.center = center;
  }

  x0() {
    return this.center.x - this.size.w / 2;
  }

  y0() {
    return this.center.y - this.size.h / 2;
  }

  draw(screen) {
    screen.fillRect(this.x0(), this.y0(), this.size.w, this.size.h)
  }
}