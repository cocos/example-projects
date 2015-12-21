cc.Class({
    extends: cc.Component,

    properties: {
        // number
        myNumber: {
            default: 0,
            type: Number
        },
        // string
        myString: {
            default: 'default text',
            type: String
        },
        myVec2: {
            default: cc.Vec2.ZERO,
            type: cc.Vec2
        },
        myColor: {
            default: cc.Color.WHITE,
            type: cc.Color
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
