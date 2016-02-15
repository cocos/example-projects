cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    
    moveEnd: function () {
        this.node.runAction(cc.sequence(cc.scaleTo(0.05, 2, 2), cc.scaleTo(0.05, 1, 1)));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
