let ASSET_MANAGER = new AssetManager();

// load images
// ASSET_MANAGER.queueDownload("./images/mario.png");
ASSET_MANAGER.queueDownload("./images/home_marker.png");
ASSET_MANAGER.queueDownload("./images/donkey.png");
ASSET_MANAGER.queueDownload("./images/woodcutter.png");


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
    canvasContext.fillText("Loading...", 500, 200);

    let world = new WorldBuilder().buildWorld()
    let gameController = new GameController(canvasContext, world);

    addClickListeners(gameController)

    console.log("Everything loaded, starting controller")
    document.getElementById('loadingBar').hidden = true
    // document.getElementById('loadingBar').innerText = ""
    gameController.start();
});

function addClickListeners(gameController) {

    //canvas
    const gameWorld = document.getElementById('gameWorld')
    gameWorld.addEventListener('click', ({ offsetX, offsetY }) => {
        gameController.handleClick(offsetX, offsetY)
    })

    //debug mode
    const checkbox = document.getElementById('debug')
    checkbox.checked = false
    checkbox.addEventListener('change', (event) => {
        PARAMS.DEBUG = event.currentTarget.checked;
        gameController.redraw()
    })

    //add block
    const addBlock = document.getElementById('addBlock')
    addBlock.addEventListener('click', (event) => {
        gameController.performCommand(new AddBlock())
    })

    //undo
    const undo = document.getElementById('undo')
    undo.addEventListener('click', (event) => {
        gameController.undoLastCommand()
    })

    //advance phase
    const advancePhase = document.getElementById('advancePhase')
    advancePhase.addEventListener('click', (event) => {
        gameController.performCommand(new AdvancePhase())
    })

    //start game
    const startGame = document.getElementById('startGame')
    startGame.addEventListener('click', (event) => {
        gameController.performCommand(new StartGame())
        advancePhase.disabled = false
        startGame.hidden = true
    })
}