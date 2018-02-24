cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        _url:[]
    },

    onLoad: function () {
        this._url = ["test assets/atlas", "test assets/prefab"];
    },

    loadSpriteFrame: function () {
        var url = this._url[0];
        this._releaseResource(url, cc.SpriteAtlas);
        cc.loader.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
            this._removeAllChildren();
            cc.loader.setAutoRelease(atlas, true);
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
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            this._removeAllChildren();
            cc.loader.setAutoRelease(prefab, true);
            var node = cc.instantiate(prefab);
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    _removeAllChildren: function () {
        this.content.removeAllChildren(true);
    },

    _releaseResource: function (url, type) {
        this._removeAllChildren();
        var res = cc.loader.getRes(url, type);
        var all = cc.loader.getDependsRecursively(res);
        cc.loader.release(all);
    }
});
