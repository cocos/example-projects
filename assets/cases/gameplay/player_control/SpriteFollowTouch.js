cc.Class({
    extends: cc.Component,

    properties: {
        follower: {
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
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE, 
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                console.log(touchLoc);
            }
        }, self.node._sgNode);
    },

    // called every frame
    update: function (dt) {

    },
});
