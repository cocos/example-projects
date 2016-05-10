cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.BoxCollider
        }
    },

    // use this for initialization
    start: function () {
        if (!this.target) return;
        
        var label = this.getComponent(cc.Label);
        label.string = 'Category: ' + this.target.category + '\n' + 'Mask: ' + this.target.mask;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
