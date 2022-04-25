class WonderDrawer {
    blockX = 30
    blockY = 15
    xOffset = 40
    yOffset = 370
    gap = 10
    maxWidth = 6

    constructor(canvasContext, wonder) {
        this.canvasContext = canvasContext
        this.wonder = wonder
    }


    draw() {

        let canvas = this.canvasContext
        canvas.fillStyle = 'black'
        canvas.fillRect(30, 50, 250, 345)

        canvas.fillStyle = 'red'
        canvas.font = "20px Arial";
        canvas.fillText("Wonder", 100, 100)

        let rows = this.wonder.getRows();
        console.log(rows)

        rows.forEach((blocks, rowNumber) => this.drawBlocks(rowNumber, blocks))
    }


    drawBlocks(rowNumber, blocks) {
        let canvas = this.canvasContext

        let y = this.yOffset - (rowNumber * (this.blockY + this.gap))
        //offset the smaller rows to make a pyramid
        let x = this.xOffset + ((this.maxWidth - blocks.length)/2) * (this.blockX + this.gap)

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            canvas.fillStyle = this.getBlockColour(block)
            canvas.fillRect(x, y, this.blockX, this.blockY)
            if (block instanceof EmptySpaceIrrigation) {
                canvas.fillStyle = 'black'
                canvas.font = "8px Arial"
                canvas.fillText("irrigation", x + 3, y + 8)
            }
            x += this.blockX + this.gap
        }
    }

    getBlockColour(block) {
        if (block instanceof NeutralBlock) {
            return "#ffcc22"
        } else if (block instanceof EmptySpace) {
            return "white"
        } else if (block instanceof PlayerBlock) {
            return "red"
        }
    }
}