class Building {
    

//todo - add building cost
//todo - work out how to store what it consumes/produces when more than 1 thing

    constructor(name, image, produces) {
        this.name = name;
        this.image = image;
        this.produces = produces
    }

    getImage() {
        return ASSET_MANAGER.getAsset(this.image)
    }

    toString() {
        return this.name
    }
    
    isPrimaryProducer() {
    
    }
    
    produces() {
        return this.produces
    }
    
    max() {
        
    }
}

class PrimaryProducer extends Building {
    
    constructor(name, image, produces) {
        super(name, image, produces)
    }
    
    isPrimaryProducer() {
        return true
    }
    
    max() {
        return 1;
    }
}

class SecondaryProducer extends Building {
    
    constructor(name, image, consumes, produces, max) {
        super(name, image, produces)
        this.consumes = consumes
        this.max = max
    }
    
    isPrimaryProducer() {
        return false
    }
    
    consumes() {
        return this.consumes
    }
    
    max() {
        return this.max;
    }
}

class TransporterFactory extends Building {
    
    constructor(name, image, consumes, produces) {
        super(name, image, produces)
        this.consumes = consumes
    }
    
    isPrimaryProducer() {
        return false
    }
    
    consumes() {
        return this.consumes
    }
    
    max() {
        return 1;
    }
}

class Buildings {
    static WOODCUTTER = new PrimaryProducer('Woodcutter', "./images/woodcutter.png", Good.BOARDS);
}