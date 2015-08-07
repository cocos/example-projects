var TileMapDemo = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        tilemapImage: { // current work around for preload tilemap texture
            default: "",
            url: Fire.Texture
        }
    },
    onLoad: function() {
        setResolution();
    },
});
