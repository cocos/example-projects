cc.Class({
    extends: cc.Component,

    properties: {
        sheepNode: {
            default: null,
            type: cc.ENode
        }
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

    // use this for initialization
    onLoad: function () {
        var anim = this.sheepNode.getComponent(cc.AnimationComponent);
        setTimeout(function() {
            anim.play('sheep_jump');
        }, 2000);
    },

    // called every frame
    update: function (dt) {

    },
});
