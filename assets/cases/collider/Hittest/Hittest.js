cc.Class({
    extends: cc.Component,

    properties: {
        collider: {
            default: null,
            type: cc.PolygonCollider
        },

        title: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        this.title.string = 'normal';

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                var touchLoc = touch.getLocation();
                
                if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
                    this.title.string = 'Hit';
                }
                else {
                    this.title.string = 'Not hit';
                }

                return true;
            },
        }, this.node);
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
