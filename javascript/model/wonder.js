
class Wonder {
    constructor() {
        this.rows = new Map()
        this.addRow(4)
        this.addRow(4)
        this.addRow(4)
        this.addRow(5)
        this.addRow(5)
        this.addRow(5)
        this.addRow(5)
        this.addRow(6)
        this.addRow(6)
        this.addRow(6)
        this.addRow(6)
        this.addRow(6)
        this.addRow(7)
        this.addRow(7)
        this.addRow(7)
        this.currentRow = 0

        for (let i = 0; i < 17; i++) {
            this.addBlock(new NeutralBlock())
        }

        let row10 = this.rows.get(9)
        row10[0] = new EmptySpaceIrrigation()
    }


    addRow(blocks) {
        let array = []
        for (let i = 0; i < blocks; i++) {
            array[i] = new EmptySpace()
        }
        this.rows.set(this.rows.size, array)
    }

    addBlock(block, gameController) {
        // console.log("getting row " + this.currentRow)
        let row = this.rows.get(this.currentRow)
        for (let i = 0; i < row.length; i++) {
            let space = row[i]
            // console.log("checking block at " + i)
            if (space instanceof EmptySpace) {
                if (gameController != null) space.remove(gameController)
                row[i] = block

                if (i === (row.length - 1)) {
                    this.currentRow++
                }

                break;
            }
        }
    }
    
    removeBlock(gameController) {
        console.log("removing block")
        // console.log("getting row " + this.currentRow)
        let row = this.rows.get(this.currentRow)
        for (let i = row.length - 1; i >= 0; i--) {
            let space = row[i]
            // console.log("checking block at " + i)
            if (!(space instanceof EmptySpace)) {
                if (this.currentRow === 9 && i === 0) {
                    newSpace = new EmptySpaceIrrigation()
                    row[i] = newSpace
                    newSpace.add(gameController)
                } else {
                    row[i] = new EmptySpace()
                }

                if (i === 0 && this.currentRow > 0) {
                    this.currentRow--
                }

                break;
            }
        }
    }

    getRows() {
        return this.rows
    }

    getScore() {
        let score = 0
        for (const row of this.rows) {
            if (this.containsPlayerBlock(row)) {
                score += 10;
            }
        }

        return score;
    }

    containsPlayerBlock(row) {
        for (const block of row) {
            if (block instanceof PlayerBlock) {
                return true;
            }
        }

        return false;
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
    add(gameController) {
        gameController.undoCommand(new Irrigation())
    }
}