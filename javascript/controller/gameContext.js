class GameContext {
    commandHistory = []
    constructor(gameController) {
        this.gameController = gameController;
    }


    addCommandToHistory(command) {
        this.commandHistory.push(command)
        // console.log(this.commandHistory.length + " commands in history")
    }

    undoLastCommand() {
        console.log(this.commandHistory.length)
        if (this.commandHistory.length > 0) {
            let command = this.commandHistory.pop()
            console.log("Undoing last command " + command)
            command.undo(this.gameController)
        } else {
            this.gameController.showInfoMessage("No previous actions to undo")
        }
    }

    getCommandHistorySize() {
        return this.commandHistory.length
    }

    getLastXCommands(x) {
        return this.commandHistory.slice(-x)
    }

}