class WonderDrawer {
    blockX = 30
    blockY = 15
    xOffset = 40
    yOffset = 370
    gap = 10

    constructor(canvasContext, wonder) {
        this.canvasContext = canvasContext
        this.wonder = wonder
    }


    draw() {

        let canvas = this.canvasContext
        canvas.fillStyle = 'black'
        canvas.fillRect(30, 50, 250, 320)

        canvas.fillStyle = 'red'
        canvas.font = "20px Arial";
        canvas.fillText("Wonder", 100, 100)

        let rows = this.wonder.getRows();
        rows.forEach((blocks, rowNumber) => this.drawBlocks(rowNumber, blocks))
    }


    drawBlocks(rowNumber, blocks) {
        let canvas = this.canvasContext

        let y = this.yOffset - (rowNumber * (this.blockY + this.gap))
        let x = this.xOffset

        for (let i = 0; i < blocks.length; i++) {
            canvas.fillStyle = 'blue'
            canvas.fillRect(x, y, this.blockX, this.blockY)
            x += this.blockX + this.gap
        }
    }
}