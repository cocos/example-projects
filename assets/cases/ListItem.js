cc.Class({
    extends: cc.Component,

    properties: {
        url: ''
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchend', function () {
            if (this.url) {
                cc.director.loadScene(this.url);
            }
        }, this);
    },
});
