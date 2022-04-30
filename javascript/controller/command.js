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
        gameController.getGameState().placeHomeMarker()
    }

    undo(gameController) {
        gameController.getGameState().undoPlaceHomeMarker()
    }
}