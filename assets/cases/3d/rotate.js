
cc.Class({
    extends: cc.Component,

    update () {
        this.node.rotationY = Date.now() / 10;
    },
});
