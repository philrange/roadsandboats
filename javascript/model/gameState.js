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
        this.currentPhase = Phase.getNextPhase(this.currentPhase)
        
        if (this.currentPhase === Phase.PRODUCTION) {
            this.currentTurn++
            //place neutral block in wonder
            this.wonder.addBlock(new NeutralBlock(), gameController)
            gameController.production()
        }
    }

    undoAdvancePhase(gameController) {
        this.currentPhase = Phase.getPreviousPhase(this.currentPhase)
        
        if (this.currentPhase === Phase.WONDER) {
            this.currentTurn--
             this.wonder.removeBlock(gameController)
        }
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

    confirmPlaceHomeMarker(gameController) {
        this.placedHomeMarker = true
        this.currentPhase = Phase.WONDER
        
        //todo - remove
        this.temporaryMethodToAddBuildingsAndStuff()
        
        this.advancePhase(gameController)
    }

    undoPlaceHomeMarker(gameController) {
        this.placedHomeMarker = false
        this.undoAdvancePhase(gameController)
        this.currentPhase = null
    }

    addPlayerBlock(gameController) {
        this.wonder.addBlock(new PlayerBlock(), gameController)

        //todo add undo for this
    }

    temporaryMethodToAddBuildingsAndStuff() {
        let hex = this.world.getGrid()[6]
        console.log(hex)
        let tile = this.world.getTileForHex(hex)
//        let tile = this.world.getTileForCoordinates(837 - PARAMS.WORLD_OFFSET_X, 316 - PARAMS.WORLD_OFFSET_Y)
        console.log("adding somethign to a tile " + tile)

        for (const area of tile.getBuildingAreas().values()) {
            
//            console.log(area)
        }
//        console.log("getting " + tile.getType().name + ".area1")
        let area = tile.getBuildingAreas().get(tile.getType().name + ".area1")
//        console.log("area " + area)
        area.build(BuildingType.WOODCUTTER)
    }

}

class Phase {

    static PRODUCTION = new Phase('Production');
    static MOVEMENT = new Phase('Movement');
    static BUILDING = new Phase('Building');
    static WONDER = new Phase('Wonder');

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