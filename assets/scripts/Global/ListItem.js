cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        url: '',
    },

    loadExample: function () {
        if (this.url) {
            cc.find('Menu').getComponent('Menu').loadScene(this.url);
        }
    }
});
