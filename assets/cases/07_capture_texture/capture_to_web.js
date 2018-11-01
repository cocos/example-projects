cc.Class({
    extends: require('./textureRenderUtils'),

    start () {
        this.init();
    },

    captureAndShow () {
        this.createSprite();
        var img = this.initImage();
        this.showSprite(img);
        // download the pic as the file to your local
        this.label.string = 'Showing the capture'
        this.saveFile('capture_to_web.png', img.src);
    },

    saveFile (fileName, dataUrl) {
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = fileName;
        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(event);
    }
});
