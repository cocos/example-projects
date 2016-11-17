cc.Class({
    extends: cc.Component,

    properties: {
        btnClearAll: cc.Node,
        label: cc.Prefab,
        scrollView: cc.ScrollView
    },

    _init: function () {
        this._assets = [];
        this._hasLoading = false;
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
    },

    onLoad: function () {
        this._init();
    },

    _createLabel: function (text) {
        var node = cc.instantiate(this.label);
        var label = node.getComponent(cc.Label);
        label.textKey = text;
        this.scrollView.content.addChild(node);
    },

    _clear: function () {
        this.scrollView.content.removeAllChildren(true);
        for (var i = 0; i < this._assets.length; ++i) {
            cc.loader.release(this._assets[i]);
        }
    },

    onClearAll: function () {
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
        this._clear();
    },

    onLoadAll: function () {
        if (this._hasLoading) { return; }
        this._hasLoading = true;
        this._clear();
        this._createLabel("Load All Assets");
        this.scrollView.scrollToTop();
        cc.loader.loadResAll("test assets", (err, assets) => {
            this._assets = assets;
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string') {
                    text = assets[i]
                }
                else {
                    text = assets[i].url || assets[i]._name || assets[i];
                }
                if (typeof text !== 'string' ) {
                    continue;
                }
                this._createLabel(text);
            }
            this._hasLoading = false;
            this.btnClearAll.active = true;
        });
    },

    onLoadSpriteFrameAll: function () {
        if (this._hasLoading) { return; }
        this._hasLoading = true;
        this._clear();
        this._createLabel("Load All Sprite Frame");
        this.scrollView.scrollToTop();
        cc.loader.loadResAll("test assets", cc.SpriteFrame, (err, assets) => {
            this._assets = assets;
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string' ) {
                    text = assets[i]
                }
                else {
                    text = assets[i].url || assets[i]._name || assets[i];
                }
                this._createLabel(text);
            }
            this._hasLoading = false;
            this.btnClearAll.active = true;
        });
    }

});
