class World {
    constructor(name, hexToTileMap, worldGrid) {
        this.name = name
        this.hexToTileMap = hexToTileMap
        this.worldGrid = worldGrid
    }


    getGrid() {
        return this.worldGrid
    }


    getTileForHex(hex) {
        return this.hexToTileMap.get(hex);
    }

}