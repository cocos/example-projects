cc.Class({
    extends: cc.Component,

    properties: {

        padding: 20,

        label: {
            default: null,
            type: cc.Node
        },

        backgroup: {
            default: null,
            type: cc.Node
        }

    },

    update: function () {
        if (this.backgroup.width !== this.label.width) {
            this.backgroup.width = this.label.width + this.padding;
        }
        if (this.backgroup.height !== this.label.height) {
            this.backgroup.height = this.label.height + this.padding;
        }
    }

});
