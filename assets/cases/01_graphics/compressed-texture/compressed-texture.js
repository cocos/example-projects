
cc.Class({
    extends: cc.Component,

    properties: {
        sprite: {
            default: null,
            type: cc.Sprite
        },
        infoLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let texture = this.sprite.spriteFrame.getTexture();
        this.infoLabel.string = texture.url + '@' + texture.getPixelFormat();
    },

    // update (dt) {},
});
