let ASSET_MANAGER = new AssetManager();

// load images
// ASSET_MANAGER.queueDownload("./images/mario.png");


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

    addClickListeners(gameController)

    console.log("Everything loaded, starting controller")
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

    //irrigation
    const irrigationCheckbox = document.getElementById('irrigation')
    irrigationCheckbox.checked = false
    irrigationCheckbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            gameController.performCommand(new Irrigation())
        }
    })

    //undo
    const undo = document.getElementById('undo')
    undo.addEventListener('click', (event) => {
        gameController.undoLastCommand()
    })

    //advance phase
    const advancePhase = document.getElementById('advancePhase')
    advancePhase.disabled = true
    advancePhase.addEventListener('click', (event) => {
        gameController.performCommand(new AdvancePhase())
    })

    //start game
    const startGame = document.getElementById('startGame')
    startGame.addEventListener('click', (event) => {
        gameController.performCommand(new StartGame())
        advancePhase.disabled = false
        startGame.hidden = true
        document.getElementById('loadingBar').innerText = ""
    })
}