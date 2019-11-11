cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        _url:[]
    },

    onLoad: function () {
        this._url = ["test_assets/atlas", "test_assets/prefab"];
    },

    loadSpriteFrame: function () {
        var url = this._url[0];
        this._releaseResource(url, cc.SpriteAtlas);
        cc.assetManager.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
            this._removeAllChildren();
            var node = new cc.Node();
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    },

    loadPrefab: function () {
        var url = this._url[1];
        this._releaseResource(url, cc.Prefab);
        cc.assetManager.loadRes(url, cc.Prefab, (err, prefab) => {
            this._removeAllChildren();
            var node = cc.instantiate(prefab);
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    onDisable () {
        this._releaseResource(this._url[0], cc.SpriteAtlas);
        this._releaseResource(this._url[1], cc.Prefab);
    },

    _removeAllChildren: function () {
        this.content.removeAllChildren(true);
    },

    _releaseResource: function (url, type) {
        this._removeAllChildren();
        cc.assetManager.releaseRes(url, type);
    }
});
