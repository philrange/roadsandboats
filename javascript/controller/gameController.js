class GameController {
    constructor(canvasContext, world) {
        this.view = new View(canvasContext, world);
    }


    start() {
        this.view.draw()
        this.view.showInfoMessage("hello")
    }
}