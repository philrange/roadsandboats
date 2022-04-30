class View {
    constructor(gameContext, canvasContext, world, wonder, gameState) {
        let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        this.worldDrawer = new WorldDrawer(canvasContext, world, offset)
        this.wonderDrawer = new WonderDrawer(canvasContext, wonder)
        this.phaseDrawer = new PhaseDrawer(canvasContext, gameState)
        this.commandHistoryDrawer = new CommandHistoryDrawer(gameContext)
        this.gameState = gameState
    }


    draw() {
        this.worldDrawer.draw()
        this.wonderDrawer.draw()
        this.phaseDrawer.draw()
        this.commandHistoryDrawer.draw()
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