cc.Class({
    extends: cc.Component,

    properties: {

        speed: 100,

        progressBar: {
            default: null,
            type: cc.Node
        },

        ground: {
            default: null,
            type: cc.Node
        }
    },

    update: function (dt) {
        this._updateWdith(this.progressBar, 500, dt);
        this._updateWdith(this.ground, 1000, dt);
    },

    _updateWdith: function (node, range, dt) {
        var width = node.width;
        width = width < range ? width += dt * this.speed : 0;
        node.width = width;
    }

});
