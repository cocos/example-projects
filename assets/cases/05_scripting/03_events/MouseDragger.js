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
        this._down = false;
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            cc.log('Drag stated ...');
            this.node.opacity = 255;
            this._down = true;
            if (!this.propagate)
                event.stopPropagation();
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
            if (!this._down) {
                event.stopPropagation();
                return
            }
            this.node.opacity = 255;
            var delta = event.getDelta();
            this.node.x += delta.x;
            this.node.y += delta.y;
            if (!this.propagate)
                event.stopPropagation();
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            if (!this._down) {
                event.stopPropagation();
                return
            }
            this.node.opacity = 160;
            cc.log('Drag leave ...');
            this._down = false;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            if (!this._down) {
                event.stopPropagation();
                return
            }
            cc.log('Drag done ...');
            this.node.opacity = 160;
            this._down = false;
        }, this);
    },
});