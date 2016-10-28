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
        this._clearResource(this._url[0]);
        cc.loader.loadRes(this._url[0], cc.SpriteAtlas, (err, atlas) => {
            var node = new cc.Node();
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    },

    loadPrefab: function () {
        this._clearResource(this._url[1]);
        cc.loader.loadRes(this._url[1], (err, prefab) => {
            var node = cc.instantiate(prefab);
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    _clearResource: function (url) {
        this.content.removeAllChildren(true);
        cc.loader.release(url);
    }
});
