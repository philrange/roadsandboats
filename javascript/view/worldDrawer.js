class WorldDrawer {
    constructor(canvasContext, world, offset) {
        this.canvasContext = canvasContext
        this.world = world
        this.offset = offset;
        this.transporterDrawer = new TransporterDrawer(canvasContext)
    }

    draw() {
        let grid = this.world.getGrid()
        for (const hex of grid) {
            let tile = this.world.getTileForHex(hex)
            // console.log("drawing hex " + hex + " " + tile + " ")
            this.drawTile(hex, tile)
        }
    }

    drawTile(hex, tile) {

        let canvas = this.canvasContext
        const hexOriginPoint = hex.toPoint().add(this.offset)
        const centre = hexOriginPoint.add(hex.center())
        // add the hex's position to each of its corner point offsets
        const corners = hex.corners().map(corner => corner.add(hexOriginPoint))
        // separate the first from the other corners
        const [firstCorner, ...otherCorners] = corners

        let type = tile.getType()

        if (type !== TileType.EMPTY) {
            //draw the hex itself
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
            canvas.lineWidth = 1;
            canvas.strokeStyle = '#000'
            canvas.stroke()


            //draw stuff on top
            this.drawRivers(hexOriginPoint, centre, hex, tile)

            this.drawHomeMarker(tile, centre)

            this.transporterDrawer.draw(tile, centre)

            if (PARAMS.DEBUG) {
                canvas.font = "10px Arial";
                canvas.fillStyle = 'black'
                canvas.fillText(hex, centre.x, centre.y);
            }
        }

    }

    drawRivers(hexOriginPoint, centre, hex, tile) {
        let canvas = this.canvasContext
        tile.getRiverExits().forEach(direction => {
            // console.log("found river for " + hex + " " + tile)
            let corners = this.getCornersForDirection(direction)
            let middleOfEdge = this.findMiddle(hex.corners()[corners.a].add(hexOriginPoint), hex.corners()[corners.b].add(hexOriginPoint))
            // console.log("drawing river " + centre + " " + middle)
            canvas.lineWidth = 5;
            canvas.strokeStyle = PARAMS.RIVER_COLOUR
            canvas.fillStyle = '#0000ff'
            canvas.beginPath();
            canvas.moveTo(centre.x, centre.y);
            canvas.lineTo(middleOfEdge.x, middleOfEdge.y);
            canvas.stroke();
            if (PARAMS.DEBUG) {
                canvas.beginPath()
                canvas.arc(centre.x, centre.y, 2, 0, Math.PI * 2)
                canvas.arc(middleOfEdge.x, middleOfEdge.y, 5, 0, Math.PI * 2)
                canvas.fill()
            }
        })
    }

    drawHomeMarker(tile, centre) {
        tile.getBuildingAreas().forEach(area => {
            if (area.hasHomeMarker()) {
                let x = centre.x - (PARAMS.HOME_MARKER_SIZE/2);
                let y = centre.y - (PARAMS.HOME_MARKER_SIZE/2);
                let size = PARAMS.HOME_MARKER_SIZE;
                this.canvasContext.drawImage(ASSET_MANAGER.getAsset("./images/home_marker.png"), x, y, size, size)
            }
        })
    }

    getCornersForDirection(direction) {
        let aIndex = 0
        let bIndex = 1
        switch (direction) {
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
                aIndex = 5; bIndex = 6;
                break
        }

        return {a: aIndex, b: bIndex}
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
            case TileType.IRRIGATED_DESERT:
                return "#76ff71"
            case TileType.MOUNTAIN:
                return "#760505"
            case TileType.SEA:
                return "#049cd8"
            case TileType.WOODS:
                return "#146706"
            case TileType.ROCK:
                return "#777777"
            default:
                return "white"
        }
    }


}