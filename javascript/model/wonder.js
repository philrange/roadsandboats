class Wonder {
    constructor(gameContext) {
        this.gameContext = gameContext;
        this.rows = new Map()
        this.addRow(0, 4)
        this.currentRow = 1
    }


    addRow(blocks) {
        let array = []
        for (let i = 0; i < blocks; i++) {
            array[i] = new EmptySpace()
        }
        this.rows.set(this.rows.size + 1, array)
    }

    addBlock(block) {
        let row = this.rows.get(this.currentRow)
        for (let i = 0; i < row.length; i++) {
            let space = row[i]
            if (space instanceof EmptySpace) {
                space.remove(this.gameContext)
                space = block
            }
        }
    }
}


class Block {}

class PlayerBlock extends Block {}

class NeutralBlock extends Block {}

class EmptySpace extends Block {
    remove(gameContext) {
        //do nothing
    }
}

class EmptySpaceIrrigation extends EmptySpace {
    remove(gameContext) {
        gameContext.irrigation()
    }
}