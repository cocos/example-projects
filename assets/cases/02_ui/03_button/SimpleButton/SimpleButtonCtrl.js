const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        buttonLeft: cc.Button,
        buttonRight: cc.Button,
        display: cc.Label
    },

    onBtnLeftClicked: function() {
        console.log('Left button clicked!');
        this.display.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.1");
    },

    onBtnRightClicked: function() {
        console.log('Right button clicked!');
        this.display.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.2");
    }
});
