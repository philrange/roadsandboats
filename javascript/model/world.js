class World {
    constructor(name) {
        this.name = name
        this.tiles = []
    }


    getTiles() {
        return this.tiles
    }

    addTile(tile) {
        this.tiles.push(tile)
    }
}