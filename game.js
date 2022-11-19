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

class Keyboard {

    constructor() {
        let keystate = {};
        window.onkeydown = function (ev) {
            keystate[ev.code] = true;

        }
        window.onkeyup = function (ev) {
            keystate[ev.code] = false;
        }

        this.isDown = function (key) {
            return keystate[key] === true;
        }
    }

    left() {
        return this.isDown("ArrowLeft");
    }

    right() {
        return this.isDown("ArrowRight");
    }

    down() {
        return this.isDown("ArrowDown");
    }

    up() {
        return this.isDown("ArrowUp");
    }
}

class Player extends Square {

    constructor(gameSize, game) {
        let size = {w: 20, h: 20};
        let center = {
            x: gameSize.w / 2,
            y: gameSize.h / 2
        }
        super(size, center);
        this.gameSize = gameSize;
        this.game = game;
        this.keyboard = new Keyboard();
    }

    update() {
        const speed = 6;
        const diagonalSpeed = Math.sqrt(2) * speed / 2;

        function moveRight(speed, player, gameSize) {
            player.center.x = Math.min(player.center.x + speed, gameSize.w - player.size.w / 2)
        }

        function moveLeft(player, speed) {
            player.center.x = Math.max(player.center.x - speed, player.size.w / 2);
        }

        if (this.keyboard.left() && !this.keyboard.right()) {
            if (this.keyboard.up() ^ this.keyboard.down()) {
                moveLeft(this, diagonalSpeed);
            } else {
                moveLeft(this, speed);
            }
        }

        if (this.keyboard.right() && !this.keyboard.left()) {
            if (this.keyboard.up() ^ this.keyboard.down()) {
                moveRight(diagonalSpeed, this, this.gameSize);
            } else {
                moveRight(speed, this, this.gameSize);
            }
        }

        function moveUp(speed, player) {
            player.center.y = Math.max(player.center.y - speed, player.size.h / 2)
        }

        if (this.keyboard.up() && !this.keyboard.down()) {
            if (this.keyboard.right() ^ this.keyboard.left()) {
                moveUp(diagonalSpeed, this);
            } else {
                moveUp(speed, this);
            }
        }

        function moveDown(speed, player) {
            player.center.y = Math.min(player.center.y + speed, player.gameSize.h - player.size.h / 2);
        }

        if (this.keyboard.down() && !this.keyboard.up()) {
            if (this.keyboard.right() ^ this.keyboard.left()) {
                moveDown(diagonalSpeed, this);
            } else {
                moveDown(speed, this);
            }
        }
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