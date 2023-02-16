class PhaseDrawer {
    x = 25
    y = 430
    width = 316
    height = 60
    phaseWidth = 50
    phaseHeight = 40
    gapX = 24
    gapY = 10

    constructor(canvasContext, gameState) {
        this.canvasContext = canvasContext
        this.gameState = gameState
    }

    draw() {

        //draw background
        let canvas = this.canvasContext
        canvas.fillStyle = 'black'
        canvas.fillRect(this.x, this.y, this.width, this.height)

        let xOffset = this.x + this.gapX
        let yOffset = this.y + this.gapY
        for (const phase of Object.keys(Phase)) {
            canvas.fillStyle = 'beige'
            canvas.fillRect(xOffset, yOffset, this.phaseWidth, this.phaseHeight)
            xOffset += this.gapX + this.phaseWidth
        }

        if (this.gameState.havePlacedHomeMarker()) {
            //draw phase marker
            let phase = this.gameState.getCurrentPhase()
            let index = Object.values(Phase).indexOf(phase);
            let x = this.x + this.gapX + this.phaseWidth / 2 + (index * (this.gapX + this.phaseWidth))
            let y = this.y + this.gapY + (this.phaseHeight / 2)
            canvas.fillStyle = 'red'
            canvas.beginPath()
            canvas.arc(x, y, 18, 0, Math.PI * 2)
            canvas.fill()
        }
    }

}