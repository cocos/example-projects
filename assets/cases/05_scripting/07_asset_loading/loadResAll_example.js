cc.Class({
    extends: cc.Component,

    properties: {
        btnClearAll: {
            default: null,
            type: cc.Node
        },
        label: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        }
    },

    onLoad: function () {
        this.count = 0;
        this.content.height = 0;
        this.btnClearAll.active = false;
    },

    _createLabel: function (text) {
        var node = cc.instantiate(this.label);
        var label = node.getComponent(cc.Label);
        label.string = text;
        this.content.addChild(node);
    },

    _clear: function () {
        this.content.removeAllChildren(true);
        cc.loader.releaseAll();
    },

    onClearAll: function () {
        this.count = 0;
        this.content.height = 0;
        this.btnClearAll.active = false;
        this._clear();
    },

    onLoadAll: function () {
        var self = this;
        this._clear();
        self._createLabel("Load All Assets");
        cc.loader.loadResAll("test assets", function (err, assets) {
            cc.log(assets.length);
            self.count = assets.length;
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string' ) {
                    text = assets[i]
                }
                else {
                    text = assets[i].url || assets[i].name || assets[i] || textureFileName;
                }
                self._createLabel("asset: " + text);
            }
            self.btnClearAll.active = true;
            self.content.height = self.count * 60;
            self.scrollView.scrollToTop();
        });
    },

    onLoadSpriteFrameAll: function () {
        var self = this;
        this._clear();
        self._createLabel("Load All Sprite Frame");
        cc.loader.loadResAll("test assets", cc.SpriteFrame, function (err, assets) {
            self.count = assets.length;
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string' ) {
                    text = assets[i]
                }
                else {
                    text = assets[i].url || assets[i]._name;
                }
                self._createLabel("sprite frame: " + text);
            }
            self.btnClearAll.active = true;
            self.content.height = self.count * 20;
        });
    }

});
