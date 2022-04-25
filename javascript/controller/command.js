class Command {

    perform(gameContext) {
        // this.gameContext.dosomething
    }
}

class Irrigation extends Command {

    toString() {
        return "Irrigation"
    }

    perform(gameContext) {
        gameContext.irrigation(true)
    }

    undo(gameContext) {
        gameContext.irrigation(false)
    }
}