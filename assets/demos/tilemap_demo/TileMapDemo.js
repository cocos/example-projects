var TileMapDemo = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        tilemapAsset: {
            default: "",
            url: Fire.RawAsset
        },
        tilemapImage: {
            default: "",
            url: Fire.Texture
        }
    },
    onLoad: function() {
        setResolution();
        this.tilemap = new cc.TMXTiledMap(this.tilemapAsset);
        this.addChild(this.tilemap);
    }
});
