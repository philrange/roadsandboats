class Wonder {
    constructor() {
        this.rows = new Map()
        this.addRow(4)
        this.addRow(4)
        this.addRow(4)
        this.addRow(4)
        this.addRow(5)
        this.addRow(5)
        this.addRow(5)
        this.addRow(5)
        this.addRow(6)
        this.addRow(6)
        this.currentRow = 1

        for (let i = 0; i < 20; i++) {
            this.addBlock(new NeutralBlock())
        }

        let row5 = this.rows.get(4)
        row5[0] = new EmptySpaceIrrigation()
    }


    addRow(blocks) {
        let array = []
        for (let i = 0; i < blocks; i++) {
            array[i] = new EmptySpace()
        }
        this.rows.set(this.rows.size + 1, array)
    }

    addBlock(block, gameController) {
        let row = this.rows.get(this.currentRow)
        for (let i = 0; i < row.length; i++) {
            let space = row[i]
            if (space instanceof EmptySpace) {
                space.remove(gameController)
                space = block
            }
        }
    }

    getRows() {
        return this.rows
    }
}


class Block {}

class PlayerBlock extends Block {}

class NeutralBlock extends Block {}

class EmptySpace extends Block {
    remove(gameController) {
        //do nothing
    }
}

class EmptySpaceIrrigation extends EmptySpace {
    remove(gameController) {
        gameController.performCommand(new Irrigation())
    }
}