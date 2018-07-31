cc.Class({
    extends: cc.Component,
    
    properties: {
        time: {
            default: 5
        },

        counter: cc.Label
    },
    
    _callback: function () {
        this.node.stopAllActions();
        this.node.runAction(this.seq);
        if (this.repeat) {
            this.counting = true;
        }
        else {
            this.counting = false;
        }
        this.time = 5;
        this.counter.string = this.time.toFixed(2) + ' s';
    },

    // use this for initialization
    onLoad: function () {
        var squashAction = cc.scaleTo(0.2, 1, 0.6);
        var stretchAction = cc.scaleTo(0.2, 1, 1.2);
        var scaleBackAction = cc.scaleTo(0.1, 1, 1);
        var moveUpAction = cc.moveBy(1, cc.v2(0, 100)).easing(cc.easeCubicActionOut());
        var moveDownAction = cc.moveBy(1, cc.v2(0, -100)).easing(cc.easeCubicActionIn());
        this.seq = cc.sequence(squashAction,
                               stretchAction,
                               moveUpAction,
                               scaleBackAction,
                               moveDownAction,
                               squashAction,
                               scaleBackAction);
                               
        this.counter.string = this.time.toFixed(2) + ' s';
        this.counting = false;
        this.repeat = false;
    },

    // called every frame
    update: function (dt) {
        if (this.counting) {
            this.time -= dt;
            this.counter.string = this.time.toFixed(2) + ' s';
        }
    },
    
    stopCounting: function () {
        this.unscheduleAllCallbacks();
        this.counting = false;
        this.time = 5;
        this.counter.string = this.time.toFixed(2) + ' s';
    },
    
    repeatSchedule: function () {
        this.stopCounting();
        this.schedule(this._callback, 5);
        this.repeat = true;
        this.counting = true;
    },
    
    oneSchedule: function () {
        this.stopCounting();
        this.scheduleOnce(this._callback, 5);
        this.repeat = false;
        this.counting = true;
    },
    
    cancelSchedules: function () {
        this.repeat = false;
        this.stopCounting();
    }
});
