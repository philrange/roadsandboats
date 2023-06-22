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

    getHexForCoordinates(x, y) {
        // console.log("getHexForCoordinates " + x + " " + y)
        let gridCoords = this.honeycombGrid.pointToHex(x, y);
        let hex = this.worldGrid.get(gridCoords);
        // console.log("found hex " + hex)
        return hex
    }
    
    getTileForCoordinates(x, y) {
        let hex = this.getHexForCoordinates(x, y)
        return this.getTileForHex(hex)
    }

    getBuildingAreaForCoordinates(tile, x, y) {

        let hex = this.getHexForCoordinates(x, y)
        // let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        // const hexOriginPoint = hex.toPoint().add(offset)
        let centreAndCorners = this.getCenterAndCorners(hex)

        let areas = tile.getBuildingAreas()
        areas.values(x => console.log(x))
        for (const area of areas.values()) {
            if (area.isPointWithinArea(Honeycomb.Point({x: x, y: y}), centreAndCorners.centre, centreAndCorners.corners)) {
//                console.log("found matching area " + area)
                return area
            }
        }

        throw 'couldnt find a matching area'
    }

    clearHomeMarker() {
        this.hexToTileMap.forEach(tile => tile.getBuildingAreas().forEach(area => area.removeHomeMarker()))
    }

    getCenterAndCorners(hex, offset) {
        let hexOriginPoint = hex.toPoint()
        if (offset != null) hexOriginPoint = hexOriginPoint.add(offset)
        const centre = hexOriginPoint.add(hex.center())
        const corners = hex.corners().map(corner => corner.add(hexOriginPoint))
        return {centre: centre, corners: corners}
    }
}