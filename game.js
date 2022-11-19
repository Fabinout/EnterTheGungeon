import {Player} from "./Player";

class Square {
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

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.gameSize = {
            w: this.canvas.width,
            h: this.canvas.height
        }
        this.screen = this.canvas.getContext("2d");
        this.player = new Player(this.gameSize, this);
        let self = this;
        let tick = function () {
            self.update();
            self.draw(self.screen);
            requestAnimationFrame(tick);
        }
        tick();
    }

    update() {
        this.player.update()
    }

    draw(screen) {
        this.clearScreen(screen);
        this.player.draw(screen);
    }

    clearScreen(screen) {
        screen.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }
}

window.onload = function () {
    new Game("screen");

}