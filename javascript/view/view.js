class View {
    constructor(gameContext, canvasContext, world, wonder, gameState) {
        let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        this.worldDrawer = new WorldDrawer(canvasContext, world, offset)
        this.wonderDrawer = new WonderDrawer(canvasContext, wonder)
        this.phaseDrawer = new PhaseDrawer(canvasContext, gameState)
        this.commandHistoryDrawer = new CommandHistoryDrawer(gameContext)
    }


    draw() {
        this.worldDrawer.draw()
        this.wonderDrawer.draw()
        this.phaseDrawer.draw()
        this.commandHistoryDrawer.draw()
    }

    showInfoMessage(text) {
        let infoMessage = document.getElementById('infoMessage');
        infoMessage.innerText = text;
    }


    //todo
    //onclick - get coordinates, and get tile/object underneath, send to controller
}