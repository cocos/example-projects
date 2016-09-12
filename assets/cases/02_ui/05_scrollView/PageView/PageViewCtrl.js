cc.Class({
    extends: cc.Component,

    properties: {
        curIndex: 0,
        icons: {
            default: [],
            type: [cc.SpriteFrame]
        },
        pageTeample: cc.Prefab,
        target: cc.PageView,
        label: cc.Label
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

    onLoad () {
        // 设置的当前页面为 1
        this.target.setCurrentPageIndex(0);
    },

    update () {
        // 当前页面索引
        this.label.string = "当前页面索引：" + this.target.getCurrentPageIndex();
    },

    // 添加页面
    onAddPage () {
        this.target.addPage(this._createPage());
    },

    // 插入页面
    onInsertPage () {
        this.target.insertPage(this._createPage(), 1);
    },

    // 移除最后一个页面
    onRemovePage () {
        var pages = this.target.getPages();
        if (pages) {
            this.target.removePage(pages[pages.length - 1]);
        }
    },

    // 移除指定页面
    onRemovePageAtIndex () {
        this.target.removePageAtIndex(1);
    },

    // 移除所有页面
    onRemoveAllPage () {
        this.target.removeAllPages();
    },

    // 监听事件
    onPageEevent (sender, eventType) {
        // 翻页事件
        if (eventType === cc.PageView.EventType.PAGE_TURNING) {
            console.log("cur page index:" + sender.getCurrentPageIndex());
        }
    }
});
