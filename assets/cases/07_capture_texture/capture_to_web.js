cc.Class({
    extends: require('./textureRenderUtils'),

    start () {
        this.init();
        // create capture
        this.schedule(() => {
            this.createSprite();
            var img = this.initImage();
            this.showSprite(img);
            // download the pic as the file to your local
            this.label.string = 'Showing the capture'
        }, 1, 0);
    }
});
