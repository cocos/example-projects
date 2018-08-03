// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
