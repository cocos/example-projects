cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
        target: cc.Node,
        tips: cc.Node
    },

    onLoad () {
        if (!(cc.sys.isMobile) || cc.runtime) {
            this.target.active = false;
            return;
        }
        this.tips.active = false;

        this._time = 0;
        this._acc = { x: 0, y: 0 };
        var screenSize = cc.view.getVisibleSize();
        this._rangeX = screenSize.width / 2 - this.target.width / 2;
        this._rangeY = screenSize.height / 2 - this.target.height / 2;
        cc.inputManager.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    destroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDeviceMotionEvent (event) {
        if (!this._acc) {
            return;
        }
        this._acc.x =  event.acc.x;
        this._acc.y =  event.acc.y;
    },

    update (dt) {
        var target = this.target;
        if (!target.active) {
            return;
        }
        this._time += 5;
        target.x += this._acc.x * dt * (this.speed + this._time);
        this.target.x = cc.clampf(target.x, -this._rangeX, this._rangeX);
        target.y += this._acc.y * dt * (this.speed + this._time);
        this.target.y = cc.clampf(target.y, -this._rangeY, this._rangeY);

        if (target.x <= -this._rangeX || target.x >= this._rangeX ||
            target.y <= -this._rangeY || target.y >= this._rangeY) {
            this._time = 0;
        }
    }

});
