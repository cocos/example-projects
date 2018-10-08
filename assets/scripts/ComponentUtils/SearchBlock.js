const TipsManager = require('TipsManager');

cc.Class({
    extends: cc.Component,

    properties: {
        editBox:cc.EditBox,
        _itemList: []
    },

    init (menu) {
        this.menu = menu;
    },

    setItemList (list) {
        this._itemList = list;
    },

    loadExample () {
        let sceneName = this.editBox.string;
        let url = this.findItemUrl(sceneName);
        if (!url) {
            TipsManager.createTips('Doesn\'t find that scene.');
            return;
        }

        if (TipsManager.hasSupport(sceneName)) {
            this.hidenSearchBlock ();
            this.editBox.string = '';
            this.menu.loadScene(url);
        }
    },

    findItemUrl (sceneName) {
        for (let i = 0; i < this._itemList.length; i++) {
            let item = this._itemList[i];
            if (item.name === sceneName) {
                return item.url;
            }
        }
    },

    // searchBlock enter the special scene
    showSearchBlock () {
        this.node.active = true;
    },

    hidenSearchBlock () {
        this.node.active = false;
    }    
});
