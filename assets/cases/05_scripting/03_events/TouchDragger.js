var TouchDragger = cc.Class({
    extends: cc.Component,

    properties: {
        propagate: {
            default: false
        },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.log('Drag stated ...');
            this.opacity = 255;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.opacity = 255;
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            if (this.getComponent(TouchDragger).propagate)
                event.stopPropagation();
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 160;
        }, this.node);
    },
});