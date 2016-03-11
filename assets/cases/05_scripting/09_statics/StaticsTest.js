var StaticsTest = cc.Class({
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

    // use this for initialization
    onLoad: function () {
        StaticsTest.instance = this;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
