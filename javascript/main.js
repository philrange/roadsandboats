let ASSET_MANAGER = new AssetManager();

// load images
ASSET_MANAGER.queueDownload("./images/mario.png");
ASSET_MANAGER.queueDownload("./images/mario.png");
ASSET_MANAGER.queueDownload("./images/mario.png");


let downloaded = 0;
let toDownload = ASSET_MANAGER.getQueueSize();

function updateLoadingBar() {
    downloaded = ASSET_MANAGER.getDownloaded()
    let loadingBar = document.getElementById('loadingBar');
    loadingBar.innerText = "Loaded " + downloaded + "/" + toDownload + " images."
}


ASSET_MANAGER.downloadAll(updateLoadingBar, function () {
    //set up canvas
    let canvas = document.getElementById('gameWorld');
    let canvasContext = canvas.getContext('2d');
    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;

    canvasContext.font = "30px Arial";
    canvasContext.fillText("Loading...", 400, 200);


    let world = new WorldBuilder().buildWorld()
    let gameController = new GameController(canvasContext, world);


//todo - remove this stuff
    drawMario(canvasContext);

    gameController.start();
});

function drawMario(canvasContext) {
    let mario = ASSET_MANAGER.getAsset("./images/mario.png")
    canvasContext.drawImage(mario, 600, 50)
}