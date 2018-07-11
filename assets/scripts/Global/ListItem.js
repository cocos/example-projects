
const TipsManager = require('TipsManager');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        url: '',
        bg: cc.Sprite,
        btn: cc.Button
    },

    init (menu) {
        this.index = -1;
        this.__name = '';
        this.menu = menu;
    },

    loadExample () {
        if (this.url && TipsManager.hasSupport(this.__name)) {
            this.menu.loadScene(this.url);
        }
    },

    updateItem (idx, y, name, url) {
        let isDir = !url;
        this.index = idx;
        this.node.y = y;
        this.node.x = isDir ? 50 : 100;
        this.label.string = this.__name = name;
        this.url = url;
        this.bg.enabled = !isDir;
        this.btn.interactable = !isDir;
    }
});
