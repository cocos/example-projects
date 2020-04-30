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
            var asset = this._assets[i];
            cc.assetManager.releaseAsset(asset);
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
        this.btnClearAll.active = false;  // 防止加载的过程中清除资源

        cc.resources.loadDir("test_assets", (err, assets) => {
            if (!this.isValid) {
                return;
            }

            this._assets = assets;
            for (var i = 0; i < assets.length; ++i) {
                var asset = assets[i];
                var info = asset.toString();
                if (!info) {
                    if (asset instanceof cc.JsonAsset) {
                        info = JSON.stringify(asset.json, null, 4);
                    }
                    else {
                        info = info || asset.name || cc.js.getClassName(asset);
                    }
                }
                this._createLabel(info);
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
        this.btnClearAll.active = false;  // 防止加载的过程中清除资源

        cc.resources.loadDir("test_assets", cc.SpriteFrame, (err, assets) => {
            if (!this.isValid) {
                return;
            }
            this._assets = assets;
            for (var i = 0; i < assets.length; ++i) {
                var asset = assets[i];
                this._createLabel(asset.name);
            }
            this._hasLoading = false;
            this.btnClearAll.active = true;
        });
    }
});
