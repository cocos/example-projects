cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        var node = cc.find('Canvas/New Label');
        this._label = node.getComponent(cc.Label);
        this._animCtrl = this.node.getComponent(cc.Animation);
    },

    onNextAnimation: function (step) {
        this._animCtrl.play("step_"+ step);
        this._label.string = "开始第"+ step + "个动画";
    }
});
