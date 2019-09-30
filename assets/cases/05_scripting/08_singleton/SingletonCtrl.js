var Singleton = require("Singleton");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start: function () {
        var node = new cc.Node("Monster");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = Singleton.instance.monsterIcon;
        node.parent = this.node;
    }
});
