const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        plugin: ''
    },

    onLoad: function () {
        this.tips = cc.find("Canvas/Tips").getComponent(cc.Label);
    },

    hasSupport: function () {
        if (typeof anysdk === 'undefined') {
            this.tips.textKey = i18n.t("cases/anysdk/3");
            return false;
        }
        if (!cc.sys.isMobile) {
            return false;
        }
        return cc.sys.isMobile && anysdk.agentManager[this.plugin];
    }
});
