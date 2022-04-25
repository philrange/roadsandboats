class WorldBuilder {

    buildWorld() {

        const Hex = Honeycomb.extendHex({
            size: PARAMS.HEX_EDGE_LENGTH       // default: 1
        })

        const Grid = Honeycomb.defineGrid(Hex)

        const worldGrid = Grid.rectangle({ width: 4, height: 3 })
        let tiles = []
        tiles.push(new Tile(TileType.MOUNTAIN, [Direction.EAST]))
        tiles.push(new Tile(TileType.WOODS, [Direction.WEST, Direction.EAST]))
        tiles.push(new Tile(TileType.ROCK, [Direction.WEST, Direction.SOUTHEAST]))
        tiles.push(new Tile(TileType.MOUNTAIN))

        tiles.push(new Tile(TileType.DESERT, [Direction.SOUTHEAST, Direction.EAST]))
        tiles.push(new Tile(TileType.WOODS, [Direction.WEST, Direction.EAST]))
        tiles.push(new Tile(TileType.PASTURE, [Direction.NORTHWEST, Direction.WEST]))
        tiles.push(new Tile(TileType.SEA))

        tiles.push(new Tile(TileType.EMPTY))
        tiles.push(new Tile(TileType.DESERT, [Direction.NORTHWEST, Direction.EAST]))
        tiles.push(new Tile(TileType.PASTURE, [Direction.WEST, Direction.EAST]))
        tiles.push(new Tile(TileType.SEA))

        let hexToTileMap = new Map()
        let i = 0;
        worldGrid.forEach(hex => {
            hexToTileMap.set(hex, tiles[i++])
        })



        let world = new World("testWorld", hexToTileMap, worldGrid)


        return world;
    }
}