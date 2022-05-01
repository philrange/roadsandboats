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
    constructor(id) {
        this.id = id;
        this.hasHome = false;
        this.building = null;
        this.goods = {};
        this.transporters = {};
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
}

class Tile {
    constructor(type, riverExits = []) {
        this.type = type
        this.riverExits = riverExits
        this.buildingAreas = new Map();
        this.links = new Map();
        this.roads = new Map();
        this.buildingAreas.set("area1", new BuildingArea("area1"))
        for (let i = 2; i <= riverExits.length; i++) {
            let areaId = "area" + i;
            this.buildingAreas.set(areaId, new BuildingArea(areaId))
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

    getBuildingArea(x, y) {
        console.log("get building area at " + x + " " + y)
        //todo - keep track of where the river separated areas are
        return this.buildingAreas.get("area1")
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


// class Mage extends Hero {
//     constructor(name, level, spell) {
//         // Chain constructor with super
//         super(name, level)
//
//         // Add a new property
//         this.spell = spell
//     }
// }