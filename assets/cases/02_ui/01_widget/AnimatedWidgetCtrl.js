cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Widget
        },
        label: {
            default: null,
            type: cc.Label
        }
    },

    //called every frame, uncomment this function to activate update callback
    update: function (dt) {
        console.log(Math.floor(this.target.left));
        this.label.string = Math.floor(this.target.left);
    }
});
