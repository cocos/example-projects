cc.Class({
    extends: cc.Component,

    properties: {
        displayNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (cc.sys.browserType === cc.sys.BROWSER_TYPE_IE) {
            // currently ie render color is not right
            this.displayNode.active = false;
            this.node.active = true;
        }
        else {
            this.displayNode.active = true;
            this.node.active = false;
        }
    },

    // update (dt) {},
});
