class GameController {
    constructor(canvasContext, world) {
        this.view = new View(canvasContext, world);
    }


    start() {
        this.view.showInfoMessage("hello")
        this.redraw()
    }

    redraw() {
        this.view.draw()
    }

}