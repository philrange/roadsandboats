class TileType {
    static DESERT = new TileType('Desert');
    static IRRIGATED_DESERT = new TileType('Irrigated Desert');
    static MOUNTAIN = new TileType('Mountain');
    static PASTURE = new TileType('Pasture');
    static ROCK = new TileType('Rock');
    static SEA = new TileType('Sea');
    static WOODS = new TileType('Woods');
    static EMPTY = new TileType('-');

    constructor(name) {
        this.name = name;
    }

}

class BuildingArea {
    constructor(id, boundingDirections) {
        this.id = id;
        this.hasHome = false;
        this.building = null;
        this.goods = new Map();
        this.transporters = new Map();
        this.boundingDirections = boundingDirections
    }

    toString() {
        return this.id
    }

    setHomeMarker() {
        this.hasHome = true
    }

    removeHomeMarker() {
        this.hasHome = false
    }

    hasHomeMarker() {
        return this.hasHome
    }

    getId() {
        return this.id;
    }

    hasBuilding() {
        return this.building != null;
    }

    build(building) {
        this.building = building;
    }

    dropGood(good) {
        let currentAmount = this.goods.has(good) ? this.goods.get(good) : 0;
        currentAmount++;
        this.goods.put(good, currentAmount);
    }

    takeGood(good) {
        let currentAmount;
        if (this.goods.has(good)) {
            currentAmount = this.goods.get(good);
        } else {
            throw 'No ' + good + ' left to take'
        }
        currentAmount--;
        this.goods.put(good, currentAmount);
    }

    listGoods() {
        return this.goods;
    }
    
    listTransporters() {
        return this.transporters;
    }

    getCornerPoints(corners) {
        let cornerPoints = []

        let index = 0
        for (const direction of this.boundingDirections) {
            let cornerIndexes = direction.getCornersForDirection()
            let corner1 = corners[cornerIndexes.a];
            let corner2 = corners[cornerIndexes.b];
            let lastIndex = this.boundingDirections.length - 1;
            if (index === 0 || index === lastIndex) {
                cornerPoints.push(Util.findMiddle(corner1, corner2))
            }
            if (index !== lastIndex) cornerPoints.push(corner2)
            index++
        }

        return cornerPoints
    }

    isSplitByRivers(){
        return this.boundingDirections != null
    }

    isPointWithinArea(point, centre, corners) {
        if (!this.isSplitByRivers()) return true

        let polygon = this.getCornerPoints(corners)
        polygon.push(centre)

        return Util.isWithinPolygon(point, polygon)
    }
}

class Tile {
    constructor(type, riverExits = []) {
        this.type = type
        this.riverExits = riverExits
        this.buildingAreas = new Map();
        this.links = new Map();
        this.roads = new Map();
        if (riverExits.length < 2) {
            this.buildingAreas.set(this.type.name + ".area1", new BuildingArea("area1"))
        } else {
            for (let i = 0; i < riverExits.length; i++) {
                let areaId = this.type.name + ".area" + i;
                let nextIndex = (i + 1) % riverExits.length;
                let boundingDirections = Direction.directionsBetween(riverExits[i % riverExits.length], riverExits[nextIndex])
                this.buildingAreas.set(areaId, new BuildingArea(areaId, boundingDirections))
            }
        }

        // console.log("tile " + this.toString() + " has areas " + this.buildingAreas)
    }

    getType() {
        return this.type
    }

    getRiverExits() {
        return this.riverExits
    }

    getBuildingAreas() {
        return this.buildingAreas
    }

    // canBuild() {
    //     return this.type !== TileType.DESERT && this.buildingAreas.values().every(area => area.hasBuilding() === false);
    // }

    build(building, areaId) {
        this.buildingAreas.get(areaId).build(building)
    }

    addLink(direction, tile) {
        this.links.put(direction, tile)
    }

    getRoads() {
        return this.roads;
    }

    buildRoad(direction) {
        this.roads.put(direction, true)
        //get linked tile and add road there too
        this.links.get(direction).getRoads().put(direction.opposite(), true)
    }

    hasRoad(direction) {
        this.roads.has(direction)
    }

    irrigation(happened) {
        if (happened) {
            if (this.type === TileType.DESERT) {
                this.type = TileType.IRRIGATED_DESERT
            }
        } else {
            if (this.type === TileType.IRRIGATED_DESERT) {
                this.type = TileType.DESERT
            }
        }
    }

    toString() {
        return `[${this.type.name}]`;
    }
}