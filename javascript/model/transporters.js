class Transporter {
    constructor(type, capacity, movement) {
        this.type = type;
        this.capacity = capacity;
        this.movement = movement;
        this.goods = new Map();
        this.movedThisTurn = 0;
        this.highlighted = false
    }

    isFull() {
        let totalGoods = this.goods.reduce((acc, val) => acc + val, 0)
        return totalGoods === this.capacity;
    }

    loadGood(good) {
        if (this.isFull()) throw 'Transporter is at capacity'

        let currentAmount = this.goods.has(good) ? this.goods.get(good) : 0;
        currentAmount++;
        this.goods.set(good, currentAmount);
    }

    unloadGood(good) {
        let currentAmount;
        if (this.goods.has(good)) {
            currentAmount = this.goods.get(good);
        } else {
            throw 'No ' + good + ' left to take'
        }

        currentAmount--;
        this.goods.set(good, currentAmount);
    }

    listGoods() {
        return this.goods;
    }

    move(from, to) {
        this.movedThisTurn++;
    }

    canMove(from, toDirection) {
        from.hasRoad(toDirection)
        return this.movement > this.movedThisTurn;
    }

    endTurn() {
        this.movedThisTurn = 0;
    }

    highlight(isHighlighted) {
        this.highlighted = isHighlighted
    }

    isHighlighted() {
        return this.highlighted
    }
}

