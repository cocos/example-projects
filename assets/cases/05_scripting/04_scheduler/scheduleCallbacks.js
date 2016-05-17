const i18n = require('i18n');

cc.Class({
    extends: cc.Component,
    
    properties: {
        time: {
            default: 5
        }
    },
    
    _callback: function () {
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
        var moveUpAction = cc.moveBy(1, cc.p(0, 100)).easing(cc.easeCubicActionOut());
        var moveDownAction = cc.moveBy(1, cc.p(0, -100)).easing(cc.easeCubicActionIn());
        this.seq = cc.sequence(squashAction,
                               stretchAction,
                               moveUpAction,
                               scaleBackAction,
                               moveDownAction,
                               squashAction,
                               scaleBackAction);
                               
        this.counter = cc.find('Canvas/count_label').getComponent(cc.Label);
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
        this.unschedule(this._callback);
        this.counting = false;
        this.counter.string = i18n.t("cases/05_scripting/04_scheduler/scheduleCallbacks.js.1");
        this.time = 5;
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
