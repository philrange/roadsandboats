class ProductionController {
    constructor(world, view) {
        this.world = world
        this.view = view
    }
    
    
    produce() {
                        
        let grid = this.world.getGrid()
        
        
        for (const hex of grid) {
            let tile = this.world.getTileForHex(hex)
        
//            console.log("producing for tile " + tile)
            
            for (const area of tile.getBuildingAreas().values()) {
                
//                console.log("has building : " + area.hasBuilding())
                
                if (area.hasBuilding()) {
                    
                    let building = area.getBuilding()
                    if (building.isPrimaryProducer) {
                        this.view.phaseLog("producing " + building.produces + " from the " + building + " on tile " + tile)
                        area.dropGood(building.produces)
                    }
                    
                }
                        
                for (const t of area.listTransporters().values()) {
                
                    console.log("transporter " + t)
                    
                }
            }
        }
    }
    
}
