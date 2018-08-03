const TipsManager = require('TipsManager');
cc.Class({
    extends: cc.Component,

    start: function () {
        this.recPlugin = anysdk.agentManager.getRECPlugin();
        if (this.recPlugin) {
            this.recPlugin.setListener(this.onRECResult, this);
        }
    },

    startRecording: function () {
        if (!this.recPlugin) {
            TipsManager.createTips(' this.recPlugin is null ');
            return;
        }
        this.recPlugin.startRecording();
    },

    stopRecording: function () {
        if (!this.recPlugin) {
            TipsManager.createTips(' this.recPlugin is null ');
            return;
        }
        this.recPlugin.stopRecording();
    },

    share: function () {
        if (!this.recPlugin) {
            TipsManager.createTips(' this.recPlugin is null ');
            return;
        }
        var info = {
            Video_Title: "RECSDK",
            Video_Desc: "RECSDK是一个神奇的SDK"
        };
        this.recPlugin.share(info);
    },

    pauseRecording: function () {
        if (!this.recPlugin || !this.recPlugin.pauseRecording) {
            TipsManager.createTips(' this.recPlugin is null or pauseRecording is not supported ');
            return;
        }
        this.recPlugin.pauseRecording();
    },

    resumeRecording: function () {
        if (!this.recPlugin || !this.recPlugin.resumeRecording) {
            TipsManager.createTips(' this.recPlugin is null or resumeRecording is not supported ');
            return;
        }
        this.recPlugin.resumeRecording();
    },

    isAvailable: function () {
        if (!this.recPlugin || !this.recPlugin.isAvailable) {
            TipsManager.createTips(' this.recPlugin is null or isAvailable is not supported ');
            return false;
        }
        var flag = this.rec.isAvailable();
        TipsManager.createTips(' isAvailable ########## code: ' + flag);
        return flag;
    },

    showToolBar: function () {
        if (!this.recPlugin || !this.recPlugin.showToolBar) {
            TipsManager.createTips(' this.recPlugin is null or showToolBar is not supported ');
            return;
        }
        this.recPlugin.showToolBar();
    },

    hideToolBar: function () {
        if (!this.recPlugin || !this.recPlugin.hideToolBar) {
            TipsManager.createTips(' this.recPlugin is null or hideToolBar is not supported ');
            return;
        }
        this.recPlugin.hideToolBar();
    },

    isRecording: function () {
        if (!this.recPlugin || !this.recPlugin.isRecording) {
            TipsManager.createTips(' this.recPlugin is null or isRecording is not supported ');
            return false;
        }
        var flag = this.rec.isRecording();
        TipsManager.createTips(' isRecording ########## code: ' + flag);
        return flag;
    },

    showVideoCenter: function () {
        if (!this.recPlugin || !this.recPlugin.showVideoCenter) {
            TipsManager.createTips(' this.recPlugin is null or showVideoCenter is not supported ');
            return;
        }
        this.recPlugin.showVideoCenter();
    },

    enterPlatform: function () {
        if (!this.recPlugin || !this.recPlugin.enterPlatform) {
            TipsManager.createTips(' this.recPlugin is null or enterPlatform is not supported ');
            return;
        }
        this.recPlugin.enterPlatform();
    },

    setMetaData: function () {
        if (!this.recPlugin || !this.recPlugin.setMetaData) {
            TipsManager.createTips(' this.recPlugin is null or setMetaData is not supported ');
            return;
        }
        var data = {ext: "login"};
        this.recPlugin.setMetaData(data);
    },

    onRECResult: function (code, msg) {
        cc.log(' REC RESULT ########## code: ' + code + ',msg: ' + msg);
        switch (code) {
            case anysdk.RECResultCode.kRECInitSuccess://初始化成功
                TipsManager.createTips(' kRECInitSuccess ');
                break;
            case anysdk.RECResultCode.kRECInitFail://初始化失败
                TipsManager.createTips(' kRECInitFail ');
                break;
            case anysdk.RECResultCode.kRECStartRecording://开始录制
                TipsManager.createTips(' kRECStartRecording ');
                break;
            case anysdk.RECResultCode.kRECStopRecording://结束录制
                TipsManager.createTips(' kRECStopRecording ');
                break;
            case anysdk.RECResultCode.kRECPauseRecording://暂停录制
                TipsManager.createTips(' kRECPauseRecording ');
                break;
            case anysdk.RECResultCode.kRECResumeRecording://恢复录制
                TipsManager.createTips(' kRECResumeRecording ');
                break;
            case anysdk.RECResultCode.kRECEnterSDKPage://进入SDK页面
                TipsManager.createTips(' kRECEnterSDKPage ');
                break;
            case anysdk.RECResultCode.kRECQuitSDKPage://退出SDK页面
                TipsManager.createTips(' kRECQuitSDKPage ');
                break;
            case anysdk.RECResultCode.kRECShareSuccess://视频分享成功
                TipsManager.createTips(' kRECShareSuccess ');
                break;
            case anysdk.RECResultCode.kRECShareFail://视频分享失败
                TipsManager.createTips(' kRECShareFail ');
                break;
            default:
                break;
        }
    }
});
