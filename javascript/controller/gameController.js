class GameController {
    constructor(canvasContext, world) {
        this.world = world
        let wonder = new Wonder()
        this.gameState = new GameState(wonder, world)
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
        this.showInfoMessage("clicked: " + x + ", " + y)
        let x1 = x - PARAMS.WORLD_OFFSET_X;
        let y1 = y - PARAMS.WORLD_OFFSET_Y;
        let tile = this.world.getTileForCoordinates(x1, y1)
        // console.log("clicked on tile: " + tile)
        if (tile != null) {

            if (!this.getGameState().havePlacedHomeMarker()) {
                if (tile.getType() !== TileType.SEA && tile.getType() !== TileType.EMPTY) {
                    //move home marker to here
                    this.performCommand(new SetHomeMarker(tile, x1, y1))
                    const startGame = document.getElementById('startGame')
                    startGame.disabled = false
                }
            } else {
                //do something
            }

        }
    }

}