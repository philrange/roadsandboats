class CommandHistoryDrawer {
    constructor(gameContext) {
        this.gameContext = gameContext;
    }

    draw() {
        const commandHistorySpan = document.getElementById('commandHistory')
        commandHistorySpan.innerHTML = ""

        let list = document.createElement("ol")
        let lastXCommands = this.gameContext.getLastXCommands(5)
        list.setAttribute("start", "" + (this.gameContext.getCommandHistorySize() + 1 - Math.min(5, lastXCommands.length)))
        for (let i = 0; i < lastXCommands.length; i++) {
            let item = document.createElement("li")
            item.appendChild(document.createTextNode(lastXCommands[i]));
            list.appendChild(item)
        }

        commandHistorySpan.appendChild(list)
    }
}