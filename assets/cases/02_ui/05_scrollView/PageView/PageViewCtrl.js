cc.Class({
    extends: cc.Component,

    properties: {
        icons: {
            default: [],
            type: [cc.SpriteFrame]
        },
        pageTeample: cc.Prefab,
        target: cc.PageView
    },

    _createPage () {
        let page = cc.instantiate(this.pageTeample);
        let idx = Math.floor(Math.random() * 4);
        for (var i = 0; i < page.children.length; ++i) {
            var node = page.children[i];
            var sprite = node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.icons[idx];
        }
        let layout = page.getComponent(cc.Layout);
        layout.cellSize = cc.size(80, 80);
        return page;
    },

    onAddPage () {
        this.target.addPage(this._createPage());
    },

    onInsertPage () {
        this.target.insertPage(this._createPage(), 1);
    },

    onRemovePage () {
        var pages = this.target.getPages();
        this.target.removePage(pages[0]);
    },

    onRemovePageAtIndex () {
        this.target.removePageAtIndex(1);
    },

    onRemoveAllPage () {
        this.target.removeAllPages();
    },

    onPageEevent (sender, eventType) {
        if (eventType === cc.PageView.EventType.PAGE_TURNING) {
            console.log("cur page index:" + sender.getCurrentPageIndex());
        }
    }
});
