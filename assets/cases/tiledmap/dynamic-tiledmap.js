cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        var url = 'tilemap/tile_iso_offset';
        this.onLoadTileMap(url);
    },

    onLoadTileMap (url) {
        cc.loader.loadRes(url, cc.TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.onCreateTileMap(tmxAsset);
        });
    },

    onCreateTileMap (tmxAsset) {
        var node = new cc.Node();
        this.node.addChild(node);
        var tileMap = node.addComponent(cc.TiledMap);
        tileMap.tmxAsset = tmxAsset;
    }
});
