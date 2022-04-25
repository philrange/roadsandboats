class WonderDrawer {
    constructor(canvasContext) {
        this.canvasContext = canvasContext
    }


    draw() {

        let canvas = this.canvasContext
        canvas.fillStyle = 'black'
        canvas.fillRect(50, 50, 200, 300)

        canvas.fillStyle = 'red'
        canvas.font = "20px Arial";
        canvas.fillText("Wonder", 100, 100)
    }
}