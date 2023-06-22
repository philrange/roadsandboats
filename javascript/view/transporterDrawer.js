class TransporterDrawer {
    constructor(canvasContext) {
       this.canvasContext = canvasContext
    }

    count = 0;


    draw(area, centre) {
        
        centre = Util.addOffset(centre, -20)
        
        for (let transporter of area.listTransporters().values()) {
            
            centre = Util.addOffset(centre, -20)
            this.drawTransporter(transporter, centre)
            this.count++
        }
        
    }

    drawTransporter(transporter, centre) {

        let canvas = this.canvasContext
        let donkey = ASSET_MANAGER.getAsset("./images/donkey.png")
        canvas.drawImage(donkey, centre.x, centre.y, 30, 30)

        if (transporter.isHighlighted()) {
            canvas.strokeStyle = 'lime'
            canvas.lineWidth = 3
            canvas.beginPath()
            canvas.rect(centre.x, centre.y, 30, 30);
            canvas.stroke();
        }
        
        //todo - draw the goods on this transporter
    }


}