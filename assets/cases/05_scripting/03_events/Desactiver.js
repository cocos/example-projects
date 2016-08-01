cc.Class({
    extends: cc.Component,

    desactivate: function() {
        this.node.active = false;
    }
});
