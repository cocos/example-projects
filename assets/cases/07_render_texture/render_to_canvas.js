cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Camera
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.camera.targetTexture = texture;
        this.texture = texture;
    },

    capture () {
        let width = this.texture.width;
        let height = this.texture.height;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        this.camera.render();
        let data = this.texture.readPixels();
        
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
            let imageData = new ImageData(data2, width, 1);
            ctx.putImageData(imageData, 0, row);
        }

        var dataURL = canvas.toDataURL("image/jpeg");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
    },

    captureAndShow () {
        var img = this.capture();
        img.style.position = 'absolute';
        img.style.display = 'block';
        img.style.left = '0px'
        img.style.top = '0px';
        img.zIndex = 100;

        img.onclick = function (event) {
            event.stopPropagation();
            img.remove();
        }

        cc.game.container.appendChild(img);
    }

    // update (dt) {},
});
