const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        var node = cc.find('Canvas/Label');
        this._label = node.getComponent(cc.Label);
        this._animCtrl = this.node.getComponent(cc.Animation);
    },

    onNextAnimation: function (step) {
        this._animCtrl.play("step_"+ step);
        this._label.string = i18n.t("cases/03_gameplay/03_animation/AnimationEvent.js.1")+ step + "个动画";
    }
});
