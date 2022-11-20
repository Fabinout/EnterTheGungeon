export class Keyboard {

    constructor() {
        const keystate = {};
        window.onkeydown = function (ev) {
            console.log("key:", ev.code);
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

    z() {
        return this.isDown("KeyW");
    }
}