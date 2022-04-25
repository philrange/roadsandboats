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
    let wonder = new Wonder()
    let gameController = new GameController(canvasContext, world, wonder);

    addClickListeners(gameController)

    console.log("Everything loaded, starting controller")
    gameController.start();
});

function addClickListeners(gameController) {

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
        } else {
            //todo - dont want to just undo the last command
            gameController.undoLastCommand()
        }
    })


    //undo
    const undo = document.getElementById('undo')
    undo.addEventListener('change', (event) => {
        gameController.undoLastCommand()
    })
}