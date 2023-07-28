class WorldDrawer {
    constructor(canvasContext, world, offset) {
        this.canvasContext = canvasContext
        this.world = world
        this.offset = offset;
        this.buildingDrawer = new BuildingDrawer(canvasContext)
        this.transporterDrawer = new TransporterDrawer(canvasContext)
        this.goodDrawer = new GoodDrawer(canvasContext)
    }

    count = 0;
    intervalId = null;
    location = null;
    
    draw() {
        let grid = this.world.getGrid()
        let tileNumber=0
        for (const hex of grid) {
            let tile = this.world.getTileForHex(hex)
            // console.log("drawing hex " + hex + " " + tile + " ")
            this.drawTile(hex, tile, tileNumber++)
        }
    }

    drawTile(hex, tile, tileNumber) {

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
            this.drawRivers(hexOriginPoint, centre, hex, tile, tileNumber)
            
            //per area
            tile.getBuildingAreas().forEach(area => {

                let middleOfArea = this.findMiddleOfBuildingArea(hex, area, centre)
                
                this.drawHomeMarker(area, middleOfArea)

                this.buildingDrawer.draw(area, middleOfArea)

                this.transporterDrawer.draw(area, middleOfArea)

                this.goodDrawer.draw(area, middleOfArea)

                if (PARAMS.DEBUG) {
                    canvas.font = "10px Arial";
                    canvas.fillStyle = 'black'
                    canvas.fillText(hex, centre.x, centre.y);
                }
            })
        }
    }

    drawRivers(hexOriginPoint, centre, hex, tile, tileNumber) {
        let canvas = this.canvasContext
        for (const direction of tile.getRiverExits()) {
//        tile.getRiverExits().forEach(direction => {
            // console.log("found river for " + hex + " " + tile)
            let corners = direction.getCornersForDirection()
            let middleOfEdge = Util.findMiddle(hex.corners()[corners.a].add(hexOriginPoint), hex.corners()[corners.b].add(hexOriginPoint))
            // console.log("drawing river " + centre + " " + middle)
            canvas.lineWidth = 8
            canvas.strokeStyle = PARAMS.RIVER_COLOUR
            canvas.fillStyle = '#0000ff'
            let distanceBetweenPoints = Math.sqrt(Math.pow(middleOfEdge.x - centre.x, 2) + Math.pow(middleOfEdge.y - centre.y, 2))
            let unitVector = {x: (middleOfEdge.x - centre.x) / distanceBetweenPoints, y: (middleOfEdge.y - centre.y) / distanceBetweenPoints}
//            if (unitVector.y ==  0) {
//                unitVector.y = 1
//            }
            // console.log("dist " + distanceBetweenPoints)
            // console.log("uv " + unitVector.x + " " + unitVector.y)
            let numberOfWiggles = 20
            let distanceBetweenWiggles = distanceBetweenPoints/numberOfWiggles
            let distanceAlongLine = 0
            canvas.beginPath();
            canvas.moveTo(centre.x, centre.y);
            // console.log("centre " + centre.x + " " + centre.y)
            let location = centre
            
            let xMovement = (distanceBetweenWiggles * unitVector.x)
            let yMovement = (distanceBetweenWiggles * unitVector.y)
            
            let locations = []
                           
//            for (let i = 0; i < numberOfWiggles; i++) {
//                let yMovement = this.perturb(distanceBetweenWiggles) + (distanceBetweenWiggles * unitVector.y)
//                location = {x: location.x + xMovement, y: location.y + yMovement}
//                // console.log(" new loc " + location.x + " " + location.y)
////                 let delay = (tileNumber * numberOfWiggles * 100) + (100 * count++)
////                console.log("delay: " + delay)
////                setTimeout(this.drawLine, delay, canvas, location.x, location.y);
////                this.drawLine(canvas, location.x, location.y)
//                 locations.push(location)
//            }

            
            //y = sin(x/Cx * PI/2) * Cy

            for (let i = 0; i < numberOfWiggles; i++) {
                console.log(distanceAlongLine)

                console.log("aa " + ((distanceAlongLine) * (Math.PI / 2)))
                console.log("bb " + Math.sin(((distanceAlongLine) * (Math.PI / 2))))
                let wiggleMovement = (Math.sin(((distanceAlongLine) * (Math.PI ))) * 3)
                let wiggleMovementX = wiggleMovement * unitVector.y   
                let wiggleMovementY = wiggleMovement * unitVector.x   
//                let yExtraMovement = 0
                
                console.log("unit " + unitVector.x + " " + unitVector.y)
                location = {x: location.x + xMovement + wiggleMovementX, y: location.y + yMovement + wiggleMovementY}

                 console.log(" movement " + xMovement + " " + yMovement)

                                 
                locations.push(location)
                distanceAlongLine += distanceBetweenWiggles
            }
            
            for (location of locations) {
                canvas.lineTo(location.x, location.y);           
                canvas.stroke();
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
            
    
        }
    }
    
    drawLine(canvas, locations) {
        console.log("count " + this.count)
        this.location = locations[this.count++]
        console.log("location " + this.location)
        canvas.lineTo(this.location.x, this.location.y);           
        canvas.stroke();
        if (this.count == 19) {
            clearInterval(this.intervalId)
        }
    }

    perturb(number) {
        // console.log("number " + number)
        let randomNoise = (Math.floor(Math.random() * 50) - 20)/100
        // console.log("noise " + randomNoise)
        let perturbedNumber = number * randomNoise
        // console.log("perturbedNumber " + perturbedNumber)
        return perturbedNumber;
    }

    drawHomeMarker(area, centre) {
        if (area.hasHomeMarker()) {

            let size = PARAMS.HOME_MARKER_SIZE;
            this.canvasContext.drawImage(ASSET_MANAGER.getAsset("./images/home_marker.png"), centre.x, centre.y, size, size)
        }
    }
    
    findMiddleOfBuildingArea(hex, area, centre) {
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
            middle = Honeycomb.Point({x: centre.x - (PARAMS.HOME_MARKER_SIZE / 2), y: centre.y - (PARAMS.HOME_MARKER_SIZE / 2)})
        }

        let centreOffset = {x: (PARAMS.HOME_MARKER_SIZE / 2), y: (PARAMS.HOME_MARKER_SIZE / 2)}
        middle = middle.subtract(centreOffset)
        return middle
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