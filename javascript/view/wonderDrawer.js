class WonderDrawer {
    blockX = 40
    blockY = 20
    x = 20
    y = 30
    width= 316
    height = 395
    gapX = 3
    gapY = 3
    maxWidth = 7

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
        canvas.fillText("Wonder", 100, 60)

        let rows = this.wonder.getRows();

        rows.forEach((blocks, rowNumber) => this.drawBlocks(rowNumber, blocks))
    }


    drawBlocks(rowNumber, blocks) {
        let canvas = this.canvasContext

        let y = this.height + this.y - ((rowNumber + 1) * (this.blockY + this.gapY)) - this.gapY
        //offset the smaller rows to make a pyramid
        let x = this.x + ((this.maxWidth - blocks.length)/2) * (this.blockX + this.gapX) + (3 * this.gapX)

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            let blockColours = this.getBlockColours(block);
            canvas.fillStyle = blockColours.base
            canvas.fillRect(x, y, this.blockX, this.blockY)
           
            if (block instanceof EmptySpaceIrrigation) {
                canvas.fillStyle = 'black'
                canvas.font = "8px Arial"
                canvas.fillText("irrigation", x + 3, y + 8)
            }

            //todo - add highlight around the edge to make them look 3d
            if (block instanceof NeutralBlock || block instanceof PlayerBlock) {
                this.drawBlockShading(canvas, x, y, blockColours)
            }
            
            x += this.blockX + this.gapX
        }
    }

    drawBlockShading(canvas, x, y, blockColours) {

        let outerHighlightIndent = 3;
        let innerHighlightIndent = 6;
        let outer1 = [x + outerHighlightIndent, y + outerHighlightIndent]
        let outer2 = [x + this.blockX - outerHighlightIndent, y + outerHighlightIndent]
        let outer3 = [x + this.blockX - outerHighlightIndent, y + this.blockY - outerHighlightIndent]
        let outer4 = [x + outerHighlightIndent, y + this.blockY - outerHighlightIndent]

        let inner1 = [x + innerHighlightIndent, y + innerHighlightIndent]
        let inner2 = [x + this.blockX - innerHighlightIndent, y + innerHighlightIndent]
        let inner3 = [x + this.blockX - innerHighlightIndent, y + this.blockY - innerHighlightIndent]
        let inner4 = [x + innerHighlightIndent, y + this.blockY - innerHighlightIndent]

        canvas.fillStyle  = blockColours.shadow
        canvas.beginPath()
        canvas.moveTo(outer4[0], outer4[1])
        canvas.lineTo(outer1[0], outer1[1])
        canvas.lineTo(outer2[0], outer2[1])
        canvas.lineTo(inner2[0], inner2[1])
        canvas.lineTo(inner1[0], inner1[1])
        canvas.lineTo(inner4[0], inner4[1])
        canvas.lineTo(outer4[0], outer4[1])
        canvas.fill()

        canvas.fillStyle  = blockColours.highlight
        canvas.beginPath()
        canvas.moveTo(outer2[0], outer2[1])
        canvas.lineTo(outer3[0], outer3[1])
        canvas.lineTo(outer4[0], outer4[1])
        canvas.lineTo(inner4[0], inner4[1])
        canvas.lineTo(inner3[0], inner3[1])
        canvas.lineTo(inner2[0], inner2[1])
        canvas.lineTo(outer2[0], outer2[1])
        canvas.fill()


    }

    getBlockColours(block) {
        if (block instanceof NeutralBlock) {
            return {base: "#938e88", shadow: "#555", highlight: "#aaa"}
        } else if (block instanceof EmptySpace) {
            return {base: "white"}
        } else if (block instanceof PlayerBlock) {
            return {base: "#b70318", shadow: "#555", highlight: "#aaa"}
        }
    }
}