// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        sprite: {
            default: null,
            type: cc.Sprite
        },

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

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture)
        this.sprite.spriteFrame = spriteFrame;
        
        this.camera.targetTexture = texture;

        this.renderTexture = texture;
    },

    // update (dt) {},

    saveImage () {
        if (CC_JSB) {

            let data = this.renderTexture.readPixels();
            let width = this.renderTexture.width;
            let height = this.renderTexture.height;
            let filePath = jsb.fileUtils.getWritablePath() + 'render_to_sprite_image.png';

            let success = jsb.saveImageData(data, width, height, filePath);
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
});
