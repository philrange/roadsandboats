class BuildingDrawer {
    constructor(canvasContext) {
       this.canvasContext = canvasContext

    }

    draw(tile, centre) {
        //todo, draw buildings if they exist

        for (const area of tile.getBuildingAreas().values()) {

            if (area.hasBuilding()) {
//                console.log("drawing building for " + tile + " " + area)
                this.drawBuilding(area.getBuilding(), centre)
            }
        }
    }

    drawBuilding(building, centre) {

        let canvas = this.canvasContext
//        console.log("drawing building " + building)
        canvas.drawImage(building.getImage(), centre.x, centre.y, 30, 30)

//        if (transporter.isHighlighted()) {
//            canvas.strokeStyle = 'lime'
//            canvas.lineWidth = 3
//            canvas.beginPath()
//            canvas.rect(centre.x, centre.y, 30, 30);
//            canvas.stroke();
//        }
    }


}