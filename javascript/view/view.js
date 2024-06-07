class View {
    constructor(gameContext, canvasContext, world, wonder, gameState) {
        this.canvas = canvasContext
        let offset = {x: PARAMS.WORLD_OFFSET_X, y: PARAMS.WORLD_OFFSET_Y}
        this.worldDrawer = new WorldDrawer(canvasContext, world, offset)
        this.wonderDrawer = new WonderDrawer(canvasContext, wonder)
        this.phaseDrawer = new PhaseDrawer(canvasContext, gameState)
        this.commandHistoryDrawer = new CommandHistoryDrawer(gameContext)
        this.gameState = gameState
    }


    draw() {
        //clear background
        this.canvas.fillStyle = PARAMS.BACKGROUND_COLOUR
        this.canvas.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT)
        this.canvas.fill()

        //draw stuff
        this.worldDrawer.draw()
        this.wonderDrawer.draw()
        this.phaseDrawer.draw()
        this.commandHistoryDrawer.draw()

        //write to outer page
        const gameStage = document.getElementById('gameStage')
        const phaseTitle = document.getElementById('phaseTitle')
        this.writeCurrentTurnAndPhase(gameStage, phaseTitle);

    }

    writeCurrentTurnAndPhase(gameStage, phaseTitle) {
        if (this.gameState.havePlacedHomeMarker()) {
            gameStage.innerText = "Turn " + this.gameState.getCurrentTurn() + ": " + this.gameState.getCurrentPhase().name
            phaseTitle.innerText = this.gameState.getCurrentPhase().name
            this.phaseLog("")
        }
    }

    showInfoMessage(text) {
        let infoMessage = document.getElementById('infoMessage');
        infoMessage.innerText = text;
    }
    
    phaseLog(message) {
        console.log(message)
        let phaseLog = document.getElementById('phaseLog');
        phaseLog.innerText += "\n" + message;
    }

    displayAreaContents(area) {
        let element = document.getElementById('areaContents');
        
        let text = "<ul>"
        for (let good of area.listGoods()) {
            console.log(" area contents " + good)
        
            text += "<li>" + good + "</li>"
            
        }
        text += "</ul>"
//        console.log(text)
        element.innerHTML = text;
    }


}