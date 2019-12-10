cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.stayCount = 0;
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
            this.node.color = cc.color(255, 0, 0);
        } else {
            this.node.color = cc.color(255, 255, 255);
        }
    }
});
