class TransporterDrawer {
    constructor(canvasContext) {
       this.canvasContext = canvasContext

    }

    draw(tile, centre) {


        //todo, draw transporters if they exist
        if (tile.getType() === TileType.DESERT) {
            this.drawTransporter(new Transporter(TransporterType.DONKEY, 2, 1), centre)
        }
    }

    drawTransporter(transporter, centre) {

        let canvas = this.canvasContext
        let donkey = ASSET_MANAGER.getAsset("./images/donkey.png")
        canvas.drawImage(donkey, centre.x, centre.y, 30, 30)
    }


}