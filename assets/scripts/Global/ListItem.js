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
        this.menu = menu;
    },

    loadExample: function () {
        if (this.url) {
            this.menu.loadScene(this.url);
        }
    },

    updateItem (idx, y, name, url) {
        let isDir = !url;
        this.index = idx;
        this.node.y = y;
        this.node.x = isDir ? 50 : 100;
        this.label.string = name;
        this.url = url;
        this.bg.enabled = !isDir;
        this.btn.interactable = !isDir;
    }
});
