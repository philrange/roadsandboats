class WorldBuilder {

    buildWorld() {
        let world = new World()

        world.addTile(new Tile(TileType.DESERT))
        world.addTile(new Tile(TileType.WOODS, [Direction.NORTHEAST]))
        world.addTile(new Tile(TileType.ROCK))
        world.addTile(new Tile(TileType.SEA))


        return world;
    }
}