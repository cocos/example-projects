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
        let texture = new cc.RenderTexture();
        this.label.string = '';
        let gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
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
            let imageData = ctx.createImageData(width, 1);
            let start = srow*width*4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start+i];
            }

            ctx.putImageData(imageData, 0, row);
        }
        // return the type and dataUrl
        var dataURL = canvas.toDataURL("image/png");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
    },

    captureAndShow () {
        var img = this.capture();

        // You can save the image or show it.

        // img.style.position = 'absolute';
        // img.style.display = 'block';
        // img.style.left = '0px'
        // img.style.top = '0px';
        // img.zIndex = 100;

        // img.style.transform = cc.game.container.style.transform;
        // img.style['transform-origin'] = cc.game.container.style['transform-origin'];
        // img.style.margin = cc.game.container.style.margin;
        // img.style.padding = cc.game.container.style.padding;

        // img.onclick = function (event) {
        //     event.stopPropagation();
        //     img.remove();
        // }

        // document.body.appendChild(img);

        let texture = new cc.Texture2D();
        texture.initWithElement(img);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);

        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        node.x = cc.winSize.width/2;
        node.y = cc.winSize.height/2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
        });
        // download the pic as the file to your local
        function saveFile (fileName, dataUrl) {
            let a = document.createElement('a');
            a.href = dataUrl;
            a.download = fileName;
            const event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(event);
        }

        saveFile('capture_to_web.png', img.src);
    }

});
