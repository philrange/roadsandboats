class View {
    constructor(gameContext, canvasContext, world, wonder, gameState) {
        this.canvas = canvasContext
        let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        this.worldDrawer = new WorldDrawer(canvasContext, world, offset)
        this.wonderDrawer = new WonderDrawer(canvasContext, wonder)
        this.phaseDrawer = new PhaseDrawer(canvasContext, gameState)
        this.commandHistoryDrawer = new CommandHistoryDrawer(gameContext)
        this.gameState = gameState
    }


    draw() {
        //clear background
        this.canvas.fillStyle = PARAMS.BACKGROUND_COLOUR
        this.canvas.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT)
        this.canvas.fill()

        //draw stuff
        this.worldDrawer.draw()
        this.wonderDrawer.draw()
        this.phaseDrawer.draw()
        this.commandHistoryDrawer.draw()

        //write to outer page
        const gameStage = document.getElementById('gameStage')
        this.writeCurrentTurnAndPhase(gameStage);

    }

    writeCurrentTurnAndPhase(gameStage) {
        if (this.gameState.havePlacedHomeMarker()) {
            gameStage.innerText = "Turn " + this.gameState.getCurrentTurn() + ": " + this.gameState.getCurrentPhase().name
        }
    }

    showInfoMessage(text) {
        let infoMessage = document.getElementById('infoMessage');
        infoMessage.innerText = text;
    }


    //todo
    //onclick - get coordinates, and get tile/object underneath, send to controller
}