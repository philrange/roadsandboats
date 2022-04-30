class GameState {
    constructor(wonder) {
        this.wonder = wonder
    }

    placedHomeMarker = false
    currentPhase = null
    currentTurn = 1

    advancePhase(gameController) {
        if (this.currentPhase === Phase.WONDER) {
            this.currentTurn++
            //place neutral block in wonder
            this.wonder.addBlock(new NeutralBlock(), gameController)
        }

        this.currentPhase = Phase.getNextPhase(this.currentPhase)
    }

    undoAdvancePhase(gameController) {
        if (this.currentPhase === Phase.BUILDING) {
            this.currentTurn--
            //todo - handle undos here
            // this.wonder.removeBlock(new NeutralBlock(), gameController)
        }

        this.currentPhase = Phase.getPreviousPhase(this.currentPhase)
    }

    getCurrentPhase() {
        return this.currentPhase
    }

    getCurrentTurn() {
        return this.currentTurn
    }

    havePlacedHomeMarker() {
        return this.placedHomeMarker
    }

    placeHomeMarker() {
        this.placedHomeMarker = true
        this.currentPhase = Phase.PRODUCTION
    }

    undoPlaceHomeMarker() {
        this.placedHomeMarker = false
        this.currentPhase = null
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
        return keys[next];
    }

    static getPreviousPhase(phase) {
        let keys = Object.values(Phase)
        let next = (keys.indexOf(phase) - 1) % 4
        return keys[next];
    }

    toString() {
        return this.name
    }
}