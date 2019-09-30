cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        console.log("Pos: " + this.node.getPosition().x + ", " + this.node.getPosition().y);
        this.node.runAction(cc.sequence(cc.moveBy(2, 200, 0), cc.callFunc(function () {
            console.log("Pos: " + this.node.x + ", " + this.node.y);
            this.node.destroy();
        }, this)));
    },
});
