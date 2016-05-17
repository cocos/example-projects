cc.Class({
    extends: cc.Component,

    properties: {
        container: cc.Node
    },

    // use this for initialization
    switch: function () {
        var children = this.container.children;
        var length = children.length;
        if (length > 1) {
            var src = Math.floor( Math.random() * length );
            var node = children[src];
            var dst = src === length-1 ? 0 : src+1;
            node.setSiblingIndex(dst);
        }
    },
});
