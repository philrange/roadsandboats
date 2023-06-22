class BuildingDrawer {
    constructor(canvasContext) {
       this.canvasContext = canvasContext

    }

    draw(area, centre) {

        if (area.hasBuilding()) {
//                console.log("drawing building for " + tile + " " + area)
            this.drawBuilding(area.getBuilding(), centre)
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