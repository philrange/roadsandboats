let ASSET_MANAGER = new AssetManager();

// spritesheets
ASSET_MANAGER.queueDownload("./images/mario.png");


ASSET_MANAGER.downloadAll(function () {
    // let gameEngine = new GameEngine();


    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext('2d');

    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;

    // gameEngine.init(ctx);

    // new SceneManager(gameEngine);

    // gameEngine.start();

    let mario = ASSET_MANAGER.getAsset("./images/mario.png")
    ctx.drawImage(mario, 20, 30)
});