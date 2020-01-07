cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.collisionManager = cc.director.getCollisionManager();
        this.collisionManager.enabled = true;
        this.collisionManager.enabledDebugDraw = false;
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, function () {
            this.collisionManager.enabledDebugDraw = true;
        }.bind(this));
        this.stayCount = 0;
    },

    onDestroy () {
        this.collisionManager.enabledDebugDraw = false;
    },

    onCollisionEnter (other, self) {
        // console.log('on collision enter',other.node.name, self.node.name);
        this.stayCount++;
    },

    onCollisionExit (other, self) {
        // console.log('on collision exit', other.node.name, self.node.name);
        this.stayCount--;
    },

    update () {
        if (this.stayCount > 0) {
            this.node.color = cc.color(0, 200, 200);
        } else {
            this.node.color = cc.color(255, 255, 255);
        }
    }
});
