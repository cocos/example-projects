cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node
    },

    loadSpriteFrame: function () {
        this._clearResource();
        var self = this;
        cc.loader.loadRes("test assets/atlas", cc.SpriteAtlas, function (err, atlas) {
            var node = new cc.Node();
            self.content.addChild(node);
            node.position = cc.v2(0, 0);
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    },

    loadPrefab: function () {
        this._clearResource();
        var self = this;
        cc.loader.loadRes("test assets/prefab", function (err, prefab) {
            var node = cc.instantiate(prefab);
            self.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    _clearResource: function () {
        this.content.removeAllChildren(true);
        cc.loader.releaseAll();
    }
});
