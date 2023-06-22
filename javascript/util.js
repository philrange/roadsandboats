
class Direction {
    static NORTHEAST = new Direction('North East');
    static EAST = new Direction('East');
    static SOUTHEAST = new Direction('South East');
    static SOUTHWEST = new Direction('South West');
    static WEST = new Direction('West');
    static NORTHWEST = new Direction('North West');

    constructor(name) {
        this.name = name;
    }

    opposite() {
        let values = Object.values(Direction)
        let opposite = (values.indexOf(this) + 3) % 6
        return values[opposite];
    }

    toString() {
        return `${this.name}`;
    }

    static directionsBetween(direction1, direction2) {
        let directions = []
        let values = Object.values(Direction)

        let index1 = values.indexOf(direction1);
        let index2 = values.indexOf(direction2);
        if (index2 < index1) index2 = index2 + 6
        for (let i = index1; i <= index2; i++) {
            directions.push(values[i % 6])
        }

        // console.log("directions between " + direction1 + " and " + direction2 + " " + directions)
        return directions;
    }


    getCornersForDirection() {
        let aIndex = 0
        let bIndex = 1
        switch (this) {
            case Direction.EAST:
                aIndex = 0; bIndex = 1;
                break
            case Direction.SOUTHEAST:
                aIndex = 1; bIndex = 2;
                break
            case Direction.SOUTHWEST:
                aIndex = 2; bIndex = 3;
                break
            case Direction.WEST:
                aIndex = 3; bIndex = 4;
                break
            case Direction.NORTHWEST:
                aIndex = 4; bIndex = 5;
                break
            case Direction.NORTHEAST:
                aIndex = 5; bIndex = 0;
                break
        }

        return {a: aIndex, b: bIndex}
    }

}

class Good {
    static LOGS = new Good('Logs', "./images/mario.png");
    static BOARDS = new Good('Boards', "./images/mario.png");
    static CLAY = new Good('Clay', "todo");
    static STONE = new Good('Stone', "./images/mario.png");
    static IRON = new Good('Iron', "todo");
    static GOLD = new Good('Gold', "todo");
    static COINS = new Good('Coins', "todo");
    static PAPER = new Good('Paper', "todo");
    static GEESE = new Good('Geese', "./images/donkey.png");
    static STOCK_CERTIFICATE = new Good('Stock Certificate', "todo");

    constructor(name, image) {
        this.name = name;
        this.image = image
    }

    getImage() {
        return ASSET_MANAGER.getAsset(this.image)
    }

    toString() {
        return `Color.${this.name}`;
    }
}

class Util {

    /** Get relationship between a point and a polygon using ray-casting algorithm
     * @param {{x:number, y:number}} P: point to check
     * @param {{x:number, y:number}[]} polygon: the polygon
     */
    function

    static isWithinPolygon(point, polygon) {
        const between = (p, a, b) => p >= a && p <= b || p <= a && p >= b
        let inside = false
        for (let i = polygon.length - 1, j = 0; j < polygon.length; i = j, j++) {
            const A = polygon[i]
            const B = polygon[j]
            // console.log(point.x + "," + point.y + " " + A.x + "," + A.y + " " + B.x + "," + B.y)
            // corner cases
            if (point.x === A.x && point.y === A.y || point.x === B.x && point.y === B.y) return true
            if (A.y === B.y && point.y === A.y && between(point.x, A.x, B.x)) return true

            if (between(point.y, A.y, B.y)) { // if point inside the vertical range
                // filter out "ray pass vertex" problem by treating the line a little lower
                if (point.y === A.y && B.y >= A.y || point.y === B.y && A.y >= B.y) continue
                // calc cross product `PA X PB`, P lays on left side of AB if c > 0
                const c = (A.x - point.x) * (B.y - point.y) - (B.x - point.x) * (A.y - point.y)
                if (c === 0) return true
                if ((A.y < B.y) === (c > 0)) inside = !inside
            }
        }

        return inside
    }

    static findMiddle(point1, point2) {
        let middleX = (point1.x + point2.x) / 2
        let middleY = (point1.y + point2.y) / 2
        return Honeycomb.Point({x: middleX, y: middleY})
    }
    
    static addOffset(point, offset) {
        return Honeycomb.Point({x: point.x + offset, y: point.y + offset})
    }
}