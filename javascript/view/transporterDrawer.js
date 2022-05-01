class TransporterDrawer {
    constructor(canvasContext) {
       this.canvasContext = canvasContext

    }

    count = 0;


    draw(tile, centre) {
        //todo, draw transporters if they exist
        if (tile.getType() === TileType.DESERT) {
            let donkey = new Transporter(TransporterType.DONKEY, 2, 1);
            if (this.count > 0) donkey.highlight(true)
            this.drawTransporter(donkey, centre)
            this.count++
        }
    }

    drawTransporter(transporter, centre) {

        let canvas = this.canvasContext
        let donkey = ASSET_MANAGER.getAsset("./images/donkey.png")
        canvas.drawImage(donkey, centre.x, centre.y, 30, 30)

        if (transporter.isHighlighted()) {
            console.log("adding highlight")
            canvas.strokeStyle = 'lime'
            canvas.lineWidth = 3
            canvas.beginPath()
            canvas.rect(centre.x, centre.y, 30, 30);
            canvas.stroke();
        }
    }


}