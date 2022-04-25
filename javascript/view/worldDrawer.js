class WorldDrawer {
    constructor(canvasContext, world, offset) {
        this.canvasContext = canvasContext
        this.world = world
        this.offset = offset;
    }

    draw() {
        let grid = this.world.getGrid()
        for (const hex of grid) {
            let tile = this.world.getTileForHex(hex)
            this.drawTile(hex, tile)
        }
    }

    drawTile(hex, tile) {

        // const centre = hex.toPoint().add(this.offsetX, this.offsetY)
        const centre = hex.toPoint()
        // add the hex's position to each of its corner points
        const corners = hex.corners().map(corner => corner.add(centre).add(this.offset))
        // separate the first from the other corners
        const [firstCorner, ...otherCorners] = corners

        let type = tile.getType()

        if (type !== TileType.EMPTY) {
            let canvas = this.canvasContext
            canvas.beginPath();
            //set colour based on tile type
            canvas.fillStyle = this.getTileColour(type)
            // move the "pen" to the first corner
            canvas.moveTo(firstCorner.x, firstCorner.y)
            // draw lines to the other corners
            otherCorners.forEach(({x, y}) => canvas.lineTo(x, y))
            // finish at the first corner
            canvas.lineTo(firstCorner.x, firstCorner.y)
            canvas.fill()
            canvas.strokeStyle = '#000'
            canvas.stroke()
        }

        this.drawRivers(hex, tile)
    }

    drawRivers(hex, tile) {
        let canvas = this.canvasContext
        let centre = hex.toPoint().add(this.offset)
        tile.getRiverExits().forEach(direction => {
            let middle = this.findMiddle(hex.corners()[1].add(this.offset), hex.corners()[2].add(this.offset))
            console.log("drawing river " + centre.toString() + " " + middle.toString())
            canvas.strokeStyle = '#0000ff'
            canvas.fillStyle = '#0000ff'
            canvas.beginPath();
            canvas.moveTo(centre.x, centre.y);
            canvas.lineTo(middle.x, middle.y);
            canvas.stroke();
            canvas.beginPath()
            canvas.arc(centre.x, centre.y, 2, 0, Math.PI * 2)
            canvas.arc(middle.x, middle.y, 5, 0, Math.PI * 2)
            canvas.fill()
        })
    }

    findMiddle(point1, point2) {
        let middleX = (point1.x + point2.x) / 2
        let middleY = (point1.y + point2.y) / 2
        return Honeycomb.Point({x: middleX, y: middleY})
    }

    getTileColour(type) {
        switch (type) {
            case TileType.DESERT:
                return "#ffcc66"
            case TileType.PASTURE:
                return "#22ee88"
            case TileType.MOUNTAIN:
                return "#760505"
            case TileType.SEA:
                return "#049cd8"
            case TileType.WOODS:
                return "#146706"
            case TileType.ROCK:
                return "#777777"
            default:
                return "green"
        }
    }


}