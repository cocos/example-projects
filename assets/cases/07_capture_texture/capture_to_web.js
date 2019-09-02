cc.Class({
    extends: require('./textureRenderUtils'),

    start () {
        this.init();
        // create capture
        this.createCanvas();
        var img = this.createImg();
        this.scheduleOnce(() => {
            this.showImage(img);
            // download the pic as the file to your local
            this.label.string = 'Showing the capture'
        }, 1);
    }
});
