class GoodDrawer {
    constructor(canvasContext) {
        this.canvasContext = canvasContext
        this.canvasContext.font = "20px serif";
    }

    count = 0;


    draw(area, centre) {
            
        centre = Util.addOffset(centre, 20)
            
        for (let [good, amount] of area.listGoods()) {
            console.log("drawing " + amount + " " + good + " at " + JSON.stringify(centre))
            centre = Util.addOffset(centre, 10)
            this.drawGood(good, centre, amount)
        }
        
    }

    drawGood(good, centre, amount) {

        let canvas = this.canvasContext
        canvas.drawImage(good.getImage(), centre.x, centre.y, 30, 30)
        if (amount > 1) {
            console.log("amount: " + amount)
            canvas.font = "bold 20px Arial";
            canvas.fillStyle = 'orange'
            canvas.fillText(amount, centre.x, centre.y + 10)
            canvas.lineWidth = 1
            canvas.strokeStyle = 'black'
            canvas.strokeText(amount, centre.x, centre.y + 10)
        }
    }

}