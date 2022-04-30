class GameController {
    constructor(canvasContext, world) {
        this.world = world
        let wonder = new Wonder()
        this.gameState = new GameState(wonder)
        this.gameContext = new GameContext(this)
        this.view = new View(this.gameContext, canvasContext, world, wonder, this.gameState);
    }


    start() {
        this.view.showInfoMessage("hello ")
        this.redraw()
    }

    redraw() {
        this.view.draw()
    }

    performCommand(command) {
        console.log("Performing command: " + command)
        this.gameContext.addCommandToHistory(command)
        command.perform(this)
        this.redraw()
    }

    undoLastCommand() {
        this.gameContext.undoLastCommand()
        this.redraw()
    }

    showInfoMessage(text) {
        this.view.showInfoMessage(text)
    }

    irrigation(happened) {
        this.world.irrigation(happened)
    }

    getGameState() {
        return this.gameState
    }

    handleClick(x, y) {
        console.log("clicked on " + x + " " + y)
        let tile = this.world.getTileForCoordinates(x - PARAMS.WORLD_OFFSET_X, y - PARAMS.WORLD_OFFSET_Y)
        console.log("clicked on tile: " + tile)
        if (tile != null) {

            if (!this.getGameState().havePlacedHomeMarker()) {
                //move home marker to here
                console.log("Moved home marker to " + tile)
                const startGame = document.getElementById('startGame')
                startGame.disabled = false
            } else {
                //do something
            }

        }
    }

}