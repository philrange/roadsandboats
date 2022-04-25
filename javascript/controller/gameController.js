class GameController {
    constructor(canvasContext, world, wonder) {
        this.gameContext = new GameContext(this, world, wonder)
        this.view = new View(this.gameContext, canvasContext, world);
    }


    start() {
        this.view.showInfoMessage("hello")
        this.redraw()
    }

    redraw() {
        this.view.draw()
    }

    performCommand(command) {
        console.log("Performing command: " + command)
        this.gameContext.addCommandToHistory(command)
        command.perform(this.gameContext)
    }

    undoLastCommand() {
        this.gameContext.undoLastCommand()
    }

}