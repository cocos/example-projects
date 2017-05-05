const SuspensionTips = require('SuspensionTips');
cc.Class({
    extends: require('BaseAnySDKExample'),

    properties: {},

    start: function () {
        if (this.hasSupport()) {
            this.crashPlugin = anysdk.agentManager.getCrashPlugin();
        }
    },

    setUserIdentifier: function () {
        if (!this.crashPlugin) {
            SuspensionTips.init.showTips(' this.crashPlugin is null ');
            return;
        }
        this.crashPlugin.setUserIdentifier('AnySDK');
    },

    reportException: function () {
        if (!this.crashPlugin) {
            SuspensionTips.init.showTips(' this.crashPlugin is null ');
            return;
        }
        this.crashPlugin.reportException('error', 'AnySDK');
    },

    leaveBreadcrumb: function () {
        if (!this.crashPlugin) {
            SuspensionTips.init.showTips(' this.crashPlugin is null ');
            return;
        }
        this.crashPlugin.leaveBreadcrumb('AnySDK');
    }

});
