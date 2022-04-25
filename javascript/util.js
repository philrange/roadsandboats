
class Direction {
    static NORTH = new Direction('North');
    static NORTHEAST = new Direction('North East');
    static EAST = new Direction('East');
    static SOUTHEAST = new Direction('South East');
    static SOUTH = new Direction('South');
    static SOUTHWEST = new Direction('South West');
    static WEST = new Direction('West');
    static NORTHWEST = new Direction('North West');

    constructor(name) {
        this.name = name;
    }

    opposite() {
        let keys = Object.keys(Direction)
        let opposite = (keys.indexOf(this.name) + 4) % 8
        return keys[opposite];
    }

    toString() {
        return `Color.${this.name}`;
    }
}

class Good {
    static LOGS = new Good('Logs');
    static BOARDS = new Good('Boards');
    static CLAY = new Good('Clay');
    static STONE = new Good('Stone');
    static IRON = new Good('Iron');
    static GOLD = new Good('Gold');
    static COINS = new Good('Coins');
    static PAPER = new Good('Paper');
    static GEESE = new Good('Geese');
    static STOCK_CERTIFICATE = new Good('Stock Certificate');

    constructor(name) {
        this.name = name;
    }
    toString() {
        return `Color.${this.name}`;
    }
}
