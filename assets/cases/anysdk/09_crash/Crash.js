const TipsManager = require('TipsManager');
cc.Class({
    extends: cc.Component,

    start: function () {
        this.crashPlugin = anysdk.agentManager.getCrashPlugin();
    },

    setUserIdentifier: function () {
        if (!this.crashPlugin) {
            TipsManager.createTips(' this.crashPlugin is null ');
            return;
        }
        this.crashPlugin.setUserIdentifier('AnySDK');
    },

    reportException: function () {
        if (!this.crashPlugin) {
            TipsManager.createTips(' this.crashPlugin is null ');
            return;
        }
        this.crashPlugin.reportException('error', 'AnySDK');
    },

    leaveBreadcrumb: function () {
        if (!this.crashPlugin) {
            TipsManager.createTips(' this.crashPlugin is null ');
            return;
        }
        this.crashPlugin.leaveBreadcrumb('AnySDK');
    }

});
