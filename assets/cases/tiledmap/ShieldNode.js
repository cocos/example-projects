cc.Class({
    extends: cc.Component,

    properties: {
        prefab:{
            type: cc.Prefab,
            default: null,
        },

        tiledLayer: {
            type: cc.TiledLayer,
            default: null,
        },
    },

    start () {
        let posArr = [cc.v2(-249, 96), cc.v2(-150, 76), cc.v2(-60, 54), cc.v2(-248, -144), cc.v2(-89, -34)];
        for (let i = 0; i < posArr.length; i++) {
            let shieldNode = cc.instantiate(this.prefab);
            shieldNode.x = posArr[i].x;
            shieldNode.y = posArr[i].y;
            this.tiledLayer.addUserNode(shieldNode);
            shieldNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                let deltaMove = event.getLocation().sub(event.getPreviousLocation());
                shieldNode.x += deltaMove.x;
                shieldNode.y += deltaMove.y;
            });    
        }
    },
});
