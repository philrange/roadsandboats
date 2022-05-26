class GameState {
    constructor(wonder, world) {
        this.wonder = wonder
        this.world = world
    }

    placedHomeMarker = false
    homeMarkerTile = null
    currentPhase = null
    currentTurn = 1

    advancePhase(gameController) {
        if (this.currentPhase === Phase.WONDER) {
            this.currentTurn++
            //place neutral block in wonder
            this.wonder.addBlock(new NeutralBlock(), gameController)
            gameController.production()
        }

        this.currentPhase = Phase.getNextPhase(this.currentPhase)
    }

    undoAdvancePhase(gameController) {
        if (this.currentPhase === Phase.PRODUCTION) {
            this.currentTurn--
             this.wonder.removeBlock(gameController)
        }

        this.currentPhase = Phase.getPreviousPhase(this.currentPhase)
    }

    getCurrentPhase() {
        return this.currentPhase
    }

    getCurrentTurn() {
        return this.currentTurn
    }

    getHomeMarkerTile() {
        return this.homeMarkerTile
    }

    moveHomeMarker(tile, x, y) {
        this.world.clearHomeMarker()
        this.homeMarkerTile = tile
        let area = this.world.getBuildingAreaForCoordinates(tile, x, y)
        area.setHomeMarker()
    }

    havePlacedHomeMarker() {
        return this.placedHomeMarker
    }

    confirmPlaceHomeMarker() {
        this.placedHomeMarker = true
        this.currentPhase = Phase.PRODUCTION
    }

    undoPlaceHomeMarker() {
        this.placedHomeMarker = false
        this.currentPhase = null
    }

    addPlayerBlock(gameController) {
        this.wonder.addBlock(new PlayerBlock(), gameController)

        //todo add undo for this
    }

}

class Phase {

    static PRODUCTION = new TileType('Production');
    static MOVEMENT = new TileType('Movement');
    static BUILDING = new TileType('Building');
    static WONDER = new TileType('Wonder');

    constructor(name) {
        this.name = name;
    }

    static getNextPhase(phase) {
        let keys = Object.values(Phase)
        let next = (keys.indexOf(phase) + 1) % 4
        console.log("getting next phase " + next)
        return keys[next];
    }

    static getPreviousPhase(phase) {
        let keys = Object.values(Phase)
        let previous = ((keys.indexOf(phase) - 1) + 4) % 4
        console.log("getting previous phase " + previous)
        return keys[previous];
    }

    toString() {
        return this.name
    }
}