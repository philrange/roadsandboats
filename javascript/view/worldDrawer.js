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

            this.drawHomeMarker(tile, centre, hex)

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
            let corners = direction.getCornersForDirection()
            let middleOfEdge = Util.findMiddle(hex.corners()[corners.a].add(hexOriginPoint), hex.corners()[corners.b].add(hexOriginPoint))
            // console.log("drawing river " + centre + " " + middle)
            canvas.lineWidth = 8
            canvas.strokeStyle = PARAMS.RIVER_COLOUR
            canvas.fillStyle = '#0000ff'
            let distanceBetweenPoints = Math.sqrt(Math.pow(middleOfEdge.x - centre.x, 2) + Math.pow(middleOfEdge.y - centre.y, 2))
            let unitVector = {x: (middleOfEdge.x - centre.x) / distanceBetweenPoints, y: (middleOfEdge.y - centre.y) / distanceBetweenPoints}
            // console.log("dist " + distanceBetweenPoints)
            // console.log("uv " + unitVector.x + " " + unitVector.y)
            let numberOfWiggles = 20
            let distanceAlongLine = distanceBetweenPoints/numberOfWiggles
            canvas.beginPath();
            canvas.moveTo(centre.x, centre.y);
            // console.log("centre " + centre.x + " " + centre.y)
            let location = centre
            for (let i = 0; i < numberOfWiggles; i++) {
                let xMovement = this.perturb(distanceAlongLine) + (distanceAlongLine * unitVector.x)
                let yMovement = this.perturb(distanceAlongLine) + (distanceAlongLine * unitVector.y)
                location = {x: location.x + xMovement, y: location.y + yMovement}
                // console.log(" new loc " + location.x + " " + location.y)
                canvas.lineTo(location.x, location.y);
            }

            canvas.lineTo(middleOfEdge.x, middleOfEdge.y);
            canvas.stroke();
            // if (PARAMS.DEBUG) {
            //add some circles to cover up joins
                canvas.beginPath()
                canvas.arc(centre.x, centre.y, 2, 0, Math.PI * 2)
                canvas.arc(middleOfEdge.x, middleOfEdge.y, 5, 0, Math.PI * 2)
                canvas.fill()
            // }
        })
    }

    perturb(number) {
        // console.log("number " + number)
        let randomNoise = (Math.floor(Math.random() * 50) - 20)/100
        // console.log("noise " + randomNoise)
        let perturbedNumber = number * randomNoise
        // console.log("perturbedNumber " + perturbedNumber)
        return perturbedNumber;
    }

    drawHomeMarker(tile, centre, hex) {
        tile.getBuildingAreas().forEach(area => {
            if (area.hasHomeMarker()) {
                let middle
                if (area.isSplitByRivers()) {
                    let centreAndCorners = this.world.getCenterAndCorners(hex, this.offset)
                    let cornerPoints = area.getCornerPoints(centreAndCorners.corners)
                    let middleCorner;
                    if (cornerPoints.length % 2 !== 0) {
                        middleCorner = cornerPoints[(cornerPoints.length - 1) / 2];
                    } else {
                        middleCorner = Util.findMiddle(cornerPoints[(cornerPoints.length - 2) / 2], cornerPoints[cornerPoints.length / 2])
                    }

                    middle = Util.findMiddle(centre, middleCorner)
                } else {
                    middle = {x: centre.x - (PARAMS.HOME_MARKER_SIZE / 2), y: centre.y - (PARAMS.HOME_MARKER_SIZE / 2)}
                }

                let centreOffset = {x: (PARAMS.HOME_MARKER_SIZE / 2), y: (PARAMS.HOME_MARKER_SIZE / 2)}
                middle = middle.subtract(centreOffset)

                let size = PARAMS.HOME_MARKER_SIZE;
                this.canvasContext.drawImage(ASSET_MANAGER.getAsset("./images/home_marker.png"), middle.x, middle.y, size, size)
            }
        })
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