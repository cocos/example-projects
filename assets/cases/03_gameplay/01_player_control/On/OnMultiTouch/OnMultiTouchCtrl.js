const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        target: cc.Node,
        tips: cc.Label
    },

    onLoad: function () {
        // zh:该效果只能在移动平台上有效！
        // en:The sample can only be effective on mobile platforms!
        if (!cc.sys.isMobile) {
            return;
        }
        this.tips.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.21");

        var self = this, parent = this.node.parent;
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            if (touches.length >= 2) {
                var touch1 = touches[0], touch2 = touches[1];
                var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
                var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
                //缩放
                var distance = cc.pSub(touchPoint1, touchPoint2);
                var delta = cc.pSub(delta1, delta2);
                var scale = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x * self.target.scale;
                }
                else {
                    scale = (distance.y + delta.y) / distance.y * self.target.scale;
                }
                self.target.scale = scale < 0.1 ? 0.1 : scale;
            }
        }, self.node);
    }
});
