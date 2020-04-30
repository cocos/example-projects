cc.Class({
    extends: cc.Component,

    properties: {
        map_root: cc.Node
    },

    onLoadTileMap (url) {
        cc.resources.load(url, cc.TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.onCreateTileMap(tmxAsset);
        });
    },

    onCreateTileMap (tmxAsset) {
        this.map_root.destroyAllChildren();
        var node = new cc.Node();
        this.map_root.addChild(node);
        var tileMap = node.addComponent(cc.TiledMap);
        tileMap.tmxAsset = tmxAsset;
    },

    onBtnCreateTileMap () {
        var url = 'tilemap/tile_iso_offset';
        this.onLoadTileMap(url);
    },

    onBtnCreateTileMapWithTsx () {
        var url = 'tilemap/tile_iso_offset_with_tsx';
        this.onLoadTileMap(url);
    },
});
