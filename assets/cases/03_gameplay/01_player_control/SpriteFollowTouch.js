cc.Class({
    extends: cc.Component,

    properties: {
        touchLocationDisplay: {
            default: null,
            type: cc.ENode
        },
        follower: {
            default: null,
            type: cc.ENode
        },
        followSpeed: 0
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.moveToPos = cc.p(0, 0);
        self.isMoving = false;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE, 
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                console.log(touchLoc);
                self.isMoving = true;
                self.moveToPos = touchLoc;
                return true; // don't capture event
            },
            onTouchMoved: function(touch, event) {
                var touchLoc = touch.getLocation();
                self.touchLocationDisplay.getComponent(cc.ELabel).string = 'touch (' + touchLoc.x + ', ' + touchLoc.y + ')';
                self.moveToPos = touchLoc;
            },
            onTouchEnded: function(touch, event) {
                self.isMoving = false; // when touch ended, stop moving
            }
        }, self);
    },

    // called every frame
    update: function (dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
         // get move direction
        var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        // multiply direction with distance to get new position
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt)); 
        // set new position
        this.follower.setPosition(newPos);
    }
});
