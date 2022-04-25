class View {
    constructor(gameContext, canvasContext, world) {
        this.canvasContext = canvasContext;
        let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        this.worldDrawer = new WorldDrawer(canvasContext, world, offset)
        this.wonderDrawer = new WonderDrawer(canvasContext)
        this.commandHistoryDrawer = new CommandHistoryDrawer(gameContext, canvasContext)
    }


    draw() {
        this.worldDrawer.draw()
        this.wonderDrawer.draw()
        this.commandHistoryDrawer.draw()
    }



    clearLoadingBar() {
        let loadingBar = document.getElementById('loadingBar');
        loadingBar.innerText = "";
    }

    showInfoMessage(text) {
        let infoMessage = document.getElementById('infoMessage');
        infoMessage.innerText = text;
    }


    //todo
    //onclick - get coordinates, and get tile/object underneath, send to controller
}