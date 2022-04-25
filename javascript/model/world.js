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

    irrigation(happened) {
        //convert desert to pasture
        this.hexToTileMap.forEach(tile => tile.irrigation(happened))
    }
}