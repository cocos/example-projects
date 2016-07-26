cc.Class({
    extends: cc.Component,

    properties: {
        btnClearAll: cc.Node,
        label: cc.Prefab,
        scrollView: cc.ScrollView
    },

    onLoad: function () {
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
    },

    _createLabel: function (text) {
        var node = cc.instantiate(this.label);
        var label = node.getComponent(cc.Label);
        label.textKey = text;
        this.scrollView.content.addChild(node);
    },

    _clear: function () {
        this.scrollView.content.removeAllChildren(true);
        cc.loader.releaseAll();
    },

    onClearAll: function () {
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
        this._clear();
    },

    onLoadAll: function () {
        var self = this;
        this._clear();
        self._createLabel("Load All Assets");
        self.scrollView.scrollToTop();
        cc.loader.loadResAll("test assets", function (err, assets) {
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string' ) {
                    text = assets[i]
                }
                else {
                    text = assets[i].url || assets[i]._name || assets[i];
                }
                if (typeof text !== 'string' ) {
                    continue;
                }
                self._createLabel(text);
            }
            self.btnClearAll.active = true;
            self.scrollView.content.height = assets.length * 60;
        });
    },

    onLoadSpriteFrameAll: function () {
        var self = this;
        this._clear();
        self._createLabel("Load All Sprite Frame");
        self.scrollView.scrollToTop();
        cc.loader.loadResAll("test assets", cc.SpriteFrame, function (err, assets) {
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string' ) {
                    text = assets[i]
                }
                else {
                    text = assets[i].url || assets[i]._name || assets[i];
                }
                self._createLabel(text);
            }
            self.btnClearAll.active = true;
            self.scrollView.content.height = assets.length * 20;
        });
    }

});
