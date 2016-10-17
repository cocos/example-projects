cc.Class({
    extends: cc.Component,

    properties: {
        curIndex: 0,
        pageTeample: cc.Prefab,
        target: cc.PageView,
        label: cc.Label
    },

    _createPage () {
        var page = cc.instantiate(this.pageTeample);
        page.position = new cc.p(0, 0);
        var color = new cc.Color();
        color.r = Math.floor(Math.random() * 255);
        color.g = Math.floor(Math.random() * 255);
        color.b = Math.floor(Math.random() * 255);
        page.color = color;
        return page;
    },

    onLoad () {
        // 设置的当前页面为 1
        this.target.setCurrentPageIndex(0);
    },

    update () {
        // 当前页面索引
        this.label.string = "第" + (this.target.getCurrentPageIndex() + 1) + "页";
    },

    // 返回首页
    onJumpHome () {
        // 第二个参数为滚动所需时间，默认值为 0.3 秒
        this.target.scrollToPage(0);
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
        this.target.removePage(pages[pages.length - 1]);
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
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
            return;
        }
        console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    }
});
