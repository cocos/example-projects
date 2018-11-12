const TipsManager = require('TipsManager');

cc.Class({
    extends: cc.Component,

    properties: {
        editBox:cc.EditBox,
        _itemList: [],
        _isShow: false
    },

    init (menu) {
        this.menu = menu;
    },

    setItemList (list) {
        this._itemList = list;
    },
    // searchBlock enter the special scene
    loadExample () {
        let sceneName = this.editBox.string;
        let url = this.findItemUrl(sceneName);
        if (!url) {
            TipsManager.createTips('Doesn\'t find that scene.');
            return;
        }

        if (TipsManager.hasSupport(sceneName)) {
            this.showSearchBlock ();
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

    showSearchBlock () {
        this._isShow = !this._isShow;
        let action = null;
        if (this._isShow) {
            action = cc.moveBy(0.5, cc.v2(0, -48));
        }
        else {
            action = cc.moveBy(0.5, cc.v2(0, 48));
        }
        this.node.runAction(action);
    }
});
