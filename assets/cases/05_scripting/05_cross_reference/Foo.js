cc.Class({
    extends: cc.Component,

    properties: () => ({
        refToBar: require('Bar')
    }),

    // use this for initialization
    onLoad: function () {
        var tip = this.node.children[0].getComponent(cc.Label);
        tip.string = this.name + ' has reference to ' + this.refToBar.name;
    }
});
