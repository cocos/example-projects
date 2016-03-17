var Singleton = cc.Class({
    extends: cc.Component,

    properties: {
        monsterIcon: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    statics: {
        instance: null
    },

    onLoad: function () {
        Singleton.instance = this;
    }
});
