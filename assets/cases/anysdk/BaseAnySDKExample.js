const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: { },

    onLoad: function () {
        this.tips = cc.find("Canvas/Tips").getComponent(cc.Label);
    },

    hasSupport: function (plugin) {
        if (!cc.sys.isMobile) {
            return;
        }
        if (typeof anysdk === 'undefined') {
            this.tips.textKey = i18n.t("cases/anysdk/3");
            return false;
        }
        return cc.sys.isMobile && anysdk.agentManager[plugin];
    }
});
