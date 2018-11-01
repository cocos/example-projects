cc.Class({
    extends: require('./textureRenderUtils'),

    start () {
        this.init();
    },

    captureAndShow () {
        this.createSprite();
        let img = this.initImage();
        this.showSprite(img);
        this.saveFile();
    },

    saveFile () {
        if (CC_JSB) {
            let data = this.texture.readPixels();
            let width = this.texture.width;
            let height = this.texture.height;
            let picData = this.filpYImage(data, width, height);

            let filePath = jsb.fileUtils.getWritablePath() + 'render_to_sprite_image.png';

            let success = jsb.saveImageData(picData, width, height, filePath)
            if (success) {
                cc.log("save image data success, file: " + filePath);
            }
            else {
                cc.error("save image data failed!");
            }
        }
        else {
            cc.log("saveImage, only supported on native platform.");
        }
    },
    // This is a temporary solution
    filpYImage (data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }    
        return picData;
    }       
}); 
