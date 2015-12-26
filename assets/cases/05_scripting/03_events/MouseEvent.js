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

    // use this for initialization
    onLoad: function () {
        this.node.opacity = 50;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            this.node.opacity = 255;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.node.opacity = 160;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
            this.node.opacity = 50;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function () {
            this.node.opacity = 50;
            if (this._callback) {
                this._callback();
            }
        }, this);
    },
});
