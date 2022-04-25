class TileType {
    static DESERT = new TileType('Desert');
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
        this.building = null;
        this.goods = {};
        this.transporters = {};
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
        this.buildingAreas = [];
        this.links = new Map();
        this.roads = new Map();
        this.buildingAreas.push("area1")
        for (let i = 0; i < riverExits.size; i++) {
            this.buildingAreas.push("area" + (i + 1))
        }
    }

    getType() {
        return this.type
    }

    getRiverExits() {
        return this.riverExits
    }

    canBuild() {
        return this.type !== TileType.DESERT && this.buildingAreas.every(area => area.hasBuilding() === false);
    }

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