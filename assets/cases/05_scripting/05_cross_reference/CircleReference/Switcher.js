cc.Class({
    extends: cc.Component,

    properties: {
        prefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            var newnode = cc.instantiate(this.prefab);
            var parent = this.node.parent;
            this.node.parent = null;
            newnode.parent = parent;
        }, this);
    }
});
