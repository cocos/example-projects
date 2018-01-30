cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
        target: cc.Node,
        _time: 0,
        _range: cc.p(0, 0),
        _acc: cc.p(0, 0)
    },

    onLoad () {
        var screenSize = cc.view.getVisibleSize();
        this._range.x = screenSize.width / 2 - this.target.width / 2;
        this._range.y = screenSize.height / 2 - this.target.height / 2;
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDestroy () {
        cc.systemEvent.setAccelerometerEnabled(false);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDeviceMotionEvent (event) {
        this._acc.x =  event.acc.x;
        this._acc.y =  event.acc.y;
    },

    update (dt) {
        var target = this.target, range = this._range;
        this._time += 5;
        target.x += this._acc.x * dt * (this.speed + this._time);
        target.x = cc.clampf(target.x, -range.x, range.x);
        target.y += this._acc.y * dt * (this.speed + this._time);
        target.y = cc.clampf(target.y, -range.y, range.y);

        if (target.x <= -range.x || target.x >= range.x ||
            target.y <= -range.y || target.y >= range.y) {
            this._time = 0;
        }
    }

});
