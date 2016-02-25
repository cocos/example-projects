cc.Class({
    extends: cc.Component,

    properties: {
        star: {
            default: null,
            type: cc.Sprite
        },

        Load_Button: {
            default: null,
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        this.Load_Button.node.on(cc.Node.EventType.MOUSE_DOWN, this.onClick.bind(this));
    },

    onClick: function () {
        var realUrl = cc.url.raw("res/textures/star.png");
        var texture = cc.textureCache.addImage(realUrl);
        var spriteFrame = new cc.SpriteFrame(texture);
    }

});
