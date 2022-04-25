class View {
    constructor(canvasContext, world) {
        this.canvasContext = canvasContext;
        let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        this.worldDrawer = new WorldDrawer(canvasContext, world, offset)
    }


    draw() {
        this.worldDrawer.draw()
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