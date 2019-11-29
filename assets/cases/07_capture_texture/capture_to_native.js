cc.Class({
    extends: require('./textureRenderUtils'),

    properties: {
        _width: 0,
        _height: 0
    },

    start () {
        this.init();
        // create the capture
        this.camera.enabled = true;
        this.schedule(() => {
            let picData = this.initImage();
            this.createCanvas(picData);
            this.label.string = 'Showing the capture'
            this.saveFile(picData);
            this.camera.enabled = false;
        }, 1, 0);
    },
    
    // override
    initImage () {
        let data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        let picData = this.filpYImage(data, this._width, this._height);
        return picData;
    },

    // override init with Data
    createCanvas (picData) {
        let texture = new cc.Texture2D();
        texture.initWithData(picData, 32, this._width, this._height);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);

        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        // set position
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
            this.label.string = '';
            node.destroy();
        });

        this.captureAction(node, width, height);
    },

    saveFile (picData) {
        if (CC_JSB) {
            let filePath = jsb.fileUtils.getWritablePath() + 'render_to_sprite_image.png';

            let success = jsb.saveImageData(picData, this._width, this._height, filePath)
            if (success) {
                cc.log("save image data success, file: " + filePath);
            }
            else {
                cc.error("save image data failed!");
            }
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
