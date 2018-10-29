cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Camera
        },
        label: cc.Label
    },

    start () {
        this.label.string = '';
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = texture;
        this.texture = texture;
    },

    capture () {
        let tempCanvas = this.createTexture();
        // This is one of the ways that could save the img to your local.
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            let self = this;
            let data = {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height,
                // destination file sizes
                destWidth: canvas.width,
                destHeight: canvas.height,
                fileType: 'png',
                quality: 1,
                success: (res) => {
                    console.log(`Capture file success!${res.tempFilePath}`);
                    self.label.string = '图片加载完成，等待本地预览';
                    // https://developers.weixin.qq.com/minigame/dev/api/media/image/wx.previewImage.html
                    wx.previewImage({
                        urls: [res.tempFilePath],
                        success: (res) => {
                            console.log('Preview image success.');
                            self.label.string = '';
                        }
                    });
                }
            }
            // https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.toTempFilePath.html
            tempCanvas.toTempFilePath(data);
        }
    },

    createTexture () {
        let width = this.texture.width;
        let height = this.texture.height;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        this.camera.render();
        let data = this.texture.readPixels();
        // write the render data
        let rowBytes = width * 4; 
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow*width*4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start+i];
            }

            ctx.putImageData(imageData, 0, row);
        }
        return canvas;
    }
});
