import {Player} from "./Player.js";

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