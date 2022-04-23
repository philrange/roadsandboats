class WorldDrawer {
    constructor(canvasContext, world) {
        this.canvasContext = canvasContext
        this.world = world
    }

    draw() {
        let x = 10;
        let y = 10;
        let tiles = this.world.getTiles()
        for (const tile of tiles) {
            this.drawTile(tile, x, y)
            x += 50;
            y += 10;
        }
    }

    drawTile(tile, x, y) {
        let canvas = this.canvasContext
        canvas.beginPath();
        canvas.moveTo(x + 75, y + 50);
        canvas.lineTo(x + 100, y + 75);
        canvas.lineTo(x + 100, y + 25);
        canvas.fill();
    }

}