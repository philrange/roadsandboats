class GameState {
    placedHomeMarker = false
    currentPhase = null
    currentTurn = 0

    advancePhase() {
        this.currentPhase = Phase.getNextPhase(this.currentPhase)
        if (this.currentPhase === Phase.BUILDING) this.currentTurn++
    }

    undoAdvancePhase() {
        this.currentPhase = Phase.getPreviousPhase(this.currentPhase)
        if (this.currentPhase === Phase.WONDER) this.currentTurn--
    }

    getCurrentPhase() {
        return this.currentPhase
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