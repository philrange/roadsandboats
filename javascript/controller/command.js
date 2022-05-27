class Command {

    perform(gameController) {
        // this.gameController.dosomething
    }

    undo(gameController) {
        // this.gameController.dosomething
    }
}

class Irrigation extends Command {

    toString() {
        return "Irrigation"
    }

    perform(gameController) {
        gameController.irrigation(true)
    }

    undo(gameController) {
        gameController.irrigation(false)
    }
}

class AdvancePhase extends Command {

    toString() {
        return "Advance Phase"
    }

    perform(gameController) {
        gameController.getGameState().advancePhase(gameController)
    }

    undo(gameController) {
        gameController.getGameState().undoAdvancePhase(gameController)
    }
}

class StartGame extends Command {

    toString() {
        return "Start Game"
    }

    perform(gameController) {
        gameController.getGameState().confirmPlaceHomeMarker(gameController)
    }

    undo(gameController) {
        gameController.getGameState().undoPlaceHomeMarker(gameController)
    }
}

class SetHomeMarker extends Command {
    constructor(tile, x, y) {
        super();
        this.tile = tile
        this.x = x
        this.y = y
    }

    toString() {
        return "Set Home Marker to " + this.tile
    }

    perform(gameController) {
        gameController.getGameState().moveHomeMarker(this.tile, this.x, this.y)
    }

    undo(gameController) {
    }
}

class AddBlock extends Command {

    toString() {
        return "Add Wonder Block"
    }

    perform(gameController) {
        gameController.getGameState().addPlayerBlock(gameController)
    }

    undo(gameController) {
        gameController.getGameState().undoPlaceHomeMarker()
    }
}