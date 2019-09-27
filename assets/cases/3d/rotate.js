cc.Class({
    extends: cc.Component,

    update () {
        this.node.eulerAngles = cc.v3(0, Date.now() / 10, 0);
    },
});
