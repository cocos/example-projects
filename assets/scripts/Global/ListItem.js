cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        url: ''
    },

    // // use this for initialization
    // onLoad: function () {
    //     this.node.on('touchstart', function () {
    //         if (this.url) {
    //             cc.director.loadScene(this.url);
    //         }
    //     }, this);
    // },
    loadExample: function () {
        if (this.url) {
            cc.director.loadScene(this.url);
        }
    }
});
