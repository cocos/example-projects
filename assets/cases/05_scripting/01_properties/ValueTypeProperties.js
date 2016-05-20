cc.Class({
    extends: cc.Component,

    properties: {
        // number
        myNumber: {
            default: 0,
            type: cc.Integer
        },
        // string
        myString: {
            default: 'default text',
        },
        myVec2: {
            default: cc.Vec2.ZERO,
        },
        myColor: {
            default: cc.Color.WHITE,
        },
        myOtherNumber: 0,
        myOtherString: 'no type definition',
        myOtherVec2: cc.Vec2.ONE,
        myOtherColor: cc.Color.BLACK
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame
    update: function (dt) {

    },
});
