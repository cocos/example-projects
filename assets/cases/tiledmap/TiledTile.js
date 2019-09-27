cc.Class({
    extends: cc.Component,

    start () {
        var layer = this.getComponent(cc.TiledLayer);
        var tile = layer.getTiledTileAt(0, 22, true);
        var tileNode = tile.node;
        tileNode.runAction(cc.spawn(cc.scaleTo(2, 3, 3), cc.rotateTo(2, 90), cc.moveTo(2, 600, 300)));
    },

    // update (dt) {},
});
