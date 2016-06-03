cc.Class({
    extends: cc.Component,

    properties: {
        prefab: cc.Prefab,
        regionOrigin: cc.Vec2,
        regionSize: cc.Size
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(this.generateNode, 2);
        this._pool = new cc.NodePool('PoolHandler');
    },
    
    generateNode: function () {
        var monster = this._pool.get();
        if (!monster) {
            monster = cc.instantiate(this.prefab);
        
            // Add pool handler component which will control the touch event
            monster.addComponent('PoolHandler');
        }
        monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
        monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
        
        var angle = Math.random() * Math.PI * 2;
        var dx = 500 * Math.cos(angle);
        var dy = 500 * Math.sin(angle);
        
        monster.runAction(cc.sequence(
            cc.moveBy(5, dx, dy),
            cc.callFunc(this.removeNode, this, monster)
        ));
        
        this.node.addChild(monster);
    },
    
    removeNode: function (sender, monster) {
        this._pool.put(monster);
    }
});
