import {Square} from "./Square.js";

export class Bullet extends Square {
    constructor(center, xspeed, yspeed) {
        let size = {
            w: 4,
            h: 4
        };
        super(size, center);
        this.xspeed = xspeed;
        this.yspeed = yspeed;
    }
}