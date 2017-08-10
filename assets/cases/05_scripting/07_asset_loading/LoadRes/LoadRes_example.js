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
        this._clearResource(url, cc.SpriteAtlas);
        cc.loader.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
            cc.loader.setAutoRelease(url, true);
            var node = new cc.Node();
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    },

    loadPrefab: function () {
        var url = this._url[1];
        this._clearResource(url, cc.Prefab);
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            cc.loader.setAutoRelease(url, true);
            var node = cc.instantiate(prefab);
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    _clearResource: function (url, type) {
        this.content.removeAllChildren(true);
        var res = cc.loader.getRes(url, type);
        cc.loader.release(res);
    }
});
