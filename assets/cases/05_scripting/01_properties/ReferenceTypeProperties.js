const MyCustomComponent = require('MyCustomComponent');

cc.Class({
    extends: cc.Component,

    properties: {
        myNode: {
            default: null,
            type: cc.Node
        },
        mySprite: {
            default: null,
            type: cc.SpriteRenderer
        },
        myLabel: {
            default: null,
            type: cc.Label
        },
        myComponent: {
            default: null,
            type: MyCustomComponent
        }
    },

    // use this for initialization
    onLoad: function () {
        this.myLabel.string = this.myComponent.getPower().toString();
    },

    // called every frame
    update: function (dt) {

    },
});
