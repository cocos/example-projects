cc.Class({
    extends: cc.Component,

    properties: {
        touchLocationDisplay: {
            default: null,
            type: cc.Label
        },
        follower: {
            default: null,
            type: cc.Node
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
                self.isMoving = true;
                self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
                return true; // don't capture event
            },
            onTouchMoved: function(touch, event) {
                var touchLoc = touch.getLocation();
                self.touchLocationDisplay.string = 'touch (' + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
                self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            },
            onTouchEnded: function(touch, event) {
                self.isMoving = false; // when touch ended, stop moving
            }
        }, self.node);
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
