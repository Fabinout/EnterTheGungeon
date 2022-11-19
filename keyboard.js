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