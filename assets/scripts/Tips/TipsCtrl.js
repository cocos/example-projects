cc.Class({
    extends: cc.Component,

    properties: {
        content: require('LabelLocalized')
    },

    // onLoad () {},
    onDestroySelf () {
        this.node.destroy();
    },

    setContent (str) {
        if (str) {
            this.content.textKey = str;
        }
    }
});
