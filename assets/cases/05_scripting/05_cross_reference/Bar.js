cc.Class({
    extends: cc.Component,

    properties: () => ({
        refToFoo: require('Foo')
    }),

    // use this for initialization
    onLoad: function () {
        var tip = this.node.children[0].getComponent(cc.Label);
        tip.string = this.name + ' has reference to ' + this.refToFoo.name;
    }
});
