class PhaseDrawer {
    x = 30
    y = 400
    width = 250
    height = 60
    phaseWidth = 50
    phaseHeight = 40
    gap = 10

    constructor(canvasContext, gameState) {
        this.canvasContext = canvasContext
        this.gameState = gameState
    }

    draw() {

        //draw background
        let canvas = this.canvasContext
        canvas.fillStyle = 'black'
        canvas.fillRect(this.x, this.y, this.width, this.height)

        let xOffset = this.x + this.gap
        let yOffset = this.y + this.gap
        for (const phase of Object.keys(Phase)) {
            canvas.fillStyle = 'beige'
            canvas.fillRect(xOffset, yOffset, this.phaseWidth, this.phaseHeight)
            xOffset += this.gap + this.phaseWidth
        }

        if (this.gameState.havePlacedHomeMarker()) {
            //draw marker
            let phase = this.gameState.getCurrentPhase()
            let index = Object.values(Phase).indexOf(phase);
            let x = this.x + this.gap + this.phaseWidth / 2 + (index * (this.gap + this.phaseWidth))
            let y = this.y + this.gap + (this.phaseHeight / 2)
            canvas.fillStyle = 'red'
            canvas.beginPath()
            canvas.arc(x, y, 18, 0, Math.PI * 2)
            canvas.fill()
        }
    }

}