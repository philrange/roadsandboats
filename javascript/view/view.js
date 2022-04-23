class View {
    constructor(canvasContext, world) {
        this.canvasContext = canvasContext;
        this.world = world
        this.worldDrawer = new WorldDrawer(canvasContext, world)
    }


    draw() {
        this.worldDrawer.draw()
    }

    //todo
    //onclick - get coordinates, and get tile/object underneath, send to controller
}