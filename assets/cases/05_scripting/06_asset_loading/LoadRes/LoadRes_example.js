cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        _url:[],
        _assets: [],
    },

    onLoad: function () {
        this._url = ["test_assets/atlas", "test_assets/prefab"];
    },

    loadSpriteFrame: function () {
        var url = this._url[0];
        this._removeAllChildren();
        cc.resources.load(url, cc.SpriteAtlas, (err, atlas) => {
            this._assets.push(atlas.addRef());
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
        this._removeAllChildren();
        cc.resources.load(url, cc.Prefab, (err, prefab) => {
            this._assets.push(prefab.addRef());
            this._removeAllChildren();
            var node = cc.instantiate(prefab);
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    onDisable () {
        this._assets.forEach(x => x.decRef());
        this._assets = null;
    },

    _removeAllChildren: function () {
        this.content.removeAllChildren(true);
    }
});
