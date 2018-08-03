cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        
        this.touchingNumber = 0;
    },
    
    onCollisionEnter: function (other) {
        this.node.color = cc.Color.RED;
        this.touchingNumber ++;
    },
    
    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },
    
    onCollisionExit: function () {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
