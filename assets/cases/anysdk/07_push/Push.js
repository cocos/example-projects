const SuspensionTips = require('SuspensionTips');
cc.Class({
    extends: require('BaseAnySDKExample'),

    properties: {},

    start: function () {
        if (this.hasSupport()) {
            this.pushPlugin = anysdk.agentManager.getPushPlugin();
            if (this.pushPlugin) {
                this.pushPlugin.setListener(this.onPushResult, this);
            }
        }
    },

    startPush: function () {
        if (!this.pushPlugin) {
            SuspensionTips.init.showTips(' this.pushPlugin is null ');
            return;
        }
        this.pushPlugin.startPush();
    },

    closePush: function () {
        if (!this.pushPlugin) {
            SuspensionTips.init.showTips(' this.pushPlugin is null ');
            return;
        }
        this.pushPlugin.closePush();
    },

    setAlias: function () {
        if (!this.pushPlugin) {
            SuspensionTips.init.showTips(' this.pushPlugin is null ');
            return;
        }
        this.pushPlugin.setAlias("ivenKill");
    },

    delAlias: function () {
        if (!this.pushPlugin) {
            SuspensionTips.init.showTips(' this.pushPlugin is null ');
            return;
        }
        this.pushPlugin.delAlias("ivenKill");
    },

    setTags: function () {
        if (!this.pushPlugin) {
            SuspensionTips.init.showTips(' this.pushPlugin is null ');
            return;
        }
        this.pushPlugin.setTags(["easy", "fast", "qwe"]);
    },

    delTags: function () {
        if (!this.pushPlugin) {
            SuspensionTips.init.showTips(' this.pushPlugin is null ');
            return;
        }
        this.pushPlugin.delTags(["easy", "qwe"]);
    },

    onPushResult: function (code, msg) {
        cc.log(' PUSH RESULT ########## code: ' + code + ',msg: ' + msg);
        switch (code) {
            case anysdk.PushActionResultCode.kPushReceiveMessage:
                SuspensionTips.init.showTips(' kPushReceiveMessage ');
                break;
            default:
                break;
        }
    }
});
