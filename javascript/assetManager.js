class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(updateLoadingBar, callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);

        let assetManager = this;
        for (let i = 0; i < this.downloadQueue.length; i++) {

            this.sleep(1000).then(() => {
            let path = this.downloadQueue[i];
            let ext = path.substring(path.length - 3);

            switch (ext) {
                case 'jpg':
                case 'png':
                    const img = new Image();
                    img.addEventListener("load", function () {
                        console.log("Loaded " + this.src);
                        assetManager.successCount++;
                        updateLoadingBar()
                        if (assetManager.isDone()) callback();
                    });

                    img.addEventListener("error", function () {
                        console.log("Error loading " + this.src);
                        assetManager.errorCount++;
                        if (assetManager.isDone()) callback();
                    });

                    img.src = path;
                    this.cache[path] = img;
                    break;
            }

            })
        }
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getAsset(path) {
        return this.cache[path];
    };

    getDownloaded() {
        return this.successCount
    }

    getQueueSize() {
        return this.downloadQueue.length
    }
}