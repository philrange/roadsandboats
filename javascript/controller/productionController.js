class ProductionController {
    constructor(world) {
        this.world = world
    }
    
    
    produce() {
                        
        let grid = this.world.getGrid()
        for (const hex of grid) {
            let tile = this.world.getTileForHex(hex)
            // console.log("drawing hex " + hex + " " + tile + " ")
            
            console.log("producing for tile " + tile)
            
            for (const area of tile.getBuildingAreas().values()) {
                
                console.log("has building : " + area.hasBuilding())
                
                        
                for (const t of area.listTransporters().values()) {
                
                    console.log("transporter " + t)
                    
                }
            }
        }
    }
    
}
