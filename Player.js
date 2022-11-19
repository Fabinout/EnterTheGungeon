export class Player extends Square {

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
        this.updatePosition();
    }

    updatePosition() {
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