class World {
    constructor(name, hexToTileMap, worldGrid, honeycombGrid) {
        this.name = name
        this.hexToTileMap = hexToTileMap
        this.worldGrid = worldGrid
        this.honeycombGrid = honeycombGrid
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

    getTileForCoordinates(x, y) {
        let gridCoords = this.honeycombGrid.pointToHex(x, y);
        let hex = this.worldGrid.get(gridCoords)
        let tile = this.getTileForHex(hex)
        return tile
    }

    clearHomeMarker() {
        this.hexToTileMap.forEach(tile => tile.getBuildingAreas().forEach(area => area.removeHomeMarker()))
    }
}