class GoodDrawer {
    constructor(canvasContext) {
       this.canvasContext = canvasContext
    }

    count = 0;


    draw(area, centre) {
            
        for (let [good, amount] of area.listGoods()) {
            console.log("drawing " + amount + " " + good + " at " + JSON.stringify(centre))
            let n = 0 
            while (n < amount) { 
                centre = Util.addOffset(centre, 10)
                this.drawGood(good, centre)
                n++;
            }
        }
        
    }

    drawGood(good, centre) {

        let canvas = this.canvasContext
        canvas.drawImage(good.getImage(), centre.x, centre.y, 30, 30)
    }

}