const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        buttonLeft: {
            default: null,
            type: cc.Button
        },
        buttonRight: {
            default: null,
            type: cc.Button
        },
        display: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        // You can also register event listener using the method below
        // this.buttonLeft.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnLeftClicked, this);
        // this.buttonRight.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnRightClicked, this);
    },

    onBtnLeftClicked: function() {
        console.log('Left button clicked!');
        this.display.textKey = i18n.t("cases/02_ui/03_button/ButtonControl1.js.1");
    },

    onBtnRightClicked: function() {
        console.log('Right button clicked!');
        this.display.textKey = i18n.t("cases/02_ui/03_button/ButtonControl1.js.2");
    },

    onBtnInScrollClicked: function(event){
        var msg = event.target.name + ' clicked!';
        console.log(msg);
        this.display.textKey = msg;
    }
});
