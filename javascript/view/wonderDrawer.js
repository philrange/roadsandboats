class WonderDrawer {
    blockX = 30
    blockY = 15
    x = 30
    y = 50
    width= 250
    height = 345
    gap = 10
    maxWidth = 6

    constructor(canvasContext, wonder) {
        this.canvasContext = canvasContext
        this.wonder = wonder
    }


    draw() {

        let canvas = this.canvasContext
        canvas.fillStyle = 'black'
        canvas.fillRect(this.x, this.y, this.width, this.height)

        canvas.fillStyle = 'red'
        canvas.font = "20px Arial";
        canvas.fillText("Wonder", 100, 100)

        let rows = this.wonder.getRows();

        rows.forEach((blocks, rowNumber) => this.drawBlocks(rowNumber, blocks))
    }


    drawBlocks(rowNumber, blocks) {
        let canvas = this.canvasContext

        let y = this.height + this.y - ((rowNumber + 1) * (this.blockY + this.gap))
        //offset the smaller rows to make a pyramid
        let x = this.x + ((this.maxWidth - blocks.length)/2) * (this.blockX + this.gap) + this.gap

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            canvas.fillStyle = this.getBlockColour(block)
            canvas.fillRect(x, y, this.blockX, this.blockY)
            //todo - add highlight around the edge to make them look 3d
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
            return "#938e88"
        } else if (block instanceof EmptySpace) {
            return "white"
        } else if (block instanceof PlayerBlock) {
            return "#b70318"
        }
    }
}