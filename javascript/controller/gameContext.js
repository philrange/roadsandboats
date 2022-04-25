class GameContext {
    irrigationHappened = false
    commandHistory = []
    constructor(gameController, world, wonder) {
        this.gameController = gameController;
        this.world = world;
        this.wonder = wonder;

    }

    irrigation(happened) {
        this.irrigationHappened = happened
        this.world.irrigation(happened)
        this.gameController.redraw()
    }

    addCommandToHistory(command) {
        this.commandHistory.push(command)
        console.log(this.commandHistory.length + " commands in history")
    }

    undoLastCommand() {
        let command = this.commandHistory.pop()
        console.log("Undoing last command " + command)
        command.undo(this)
    }

    getLastXCommands(x) {
        return this.commandHistory.slice(-x)
    }

}