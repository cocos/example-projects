cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.recPlugin = anysdk.agentManager.getRECPlugin();
            if(this.recPlugin){
                this.recPlugin.setListener(this.onRECResult, this);
            }
        }
    },
    
    startRecording: function (){
        if (!this.recPlugin) return;
        this.recPlugin.startRecording();
    },
    
    stopRecording: function (){
        if (!this.recPlugin) return;
        this.recPlugin.stopRecording();
    },
    
	share: function (){
        if (!this.recPlugin) return;
        var info = {
            Video_Title : "RECSDK",
            Video_Desc:"RECSDK是一个神奇的SDK"
        };
        this.recPlugin.share(info);
	},
	
    pauseRecording: function (){
        if (!this.recPlugin || !this.recPlugin.pauseRecording) return;
        this.recPlugin.pauseRecording();
    },
    
    resumeRecording: function (){
        if (!this.recPlugin || !this.recPlugin.resumeRecording) return;
        this.recPlugin.resumeRecording();
    },
    
    isAvailable: function (){
        if (!this.recPlugin || !this.recPlugin.isAvailable) return false;
        var flag = this.rec.isAvailable();
        cc.log('########## isAvailable ########## code: ' + flag);
        return flag;    
    },
    
    showToolBar: function (){
        if (!this.recPlugin || !this.recPlugin.showToolBar) return;
        this.recPlugin.showToolBar();
    },
    
    hideToolBar: function (){
        if (!this.recPlugin || !this.recPlugin.hideToolBar) return;
        this.recPlugin.hideToolBar();
    },
    
    isRecording: function (){
        if (!this.recPlugin || !this.recPlugin.isRecording) return false;
        var flag = this.rec.isRecording();
        cc.log('########## isRecording ########## code: ' + flag);
        return flag;
    },
    
    showVideoCenter: function (){
        if (!this.recPlugin || !this.recPlugin.showVideoCenter) return;
        this.recPlugin.showVideoCenter();
    },
    
    enterPlatform: function (){
        if (!this.recPlugin || !this.recPlugin.enterPlatform) return;
        this.recPlugin.enterPlatform();
    },
    
    setMetaData: function (){
        if (!this.recPlugin || !this.recPlugin.setMetaData) return;
        var data = {ext:"login"};
        this.recPlugin.setMetaData(data);
    },
    
    onRECResult: function (code, msg){
        cc.log('########## REC RESULT ########## code: ' + code + ',msg: ' + msg);
        switch(code){
        case anysdk.RECResultCode.kRECInitSuccess://初始化成功
            cc.log("########## kRECInitSuccess ##########");
            break;
        case anysdk.RECResultCode.kRECInitFail://初始化失败
            cc.log("########## kRECInitFail ##########");
            break;
        case anysdk.RECResultCode.kRECStartRecording://开始录制
            cc.log("########## kRECStartRecording ##########");
            break;
        case anysdk.RECResultCode.kRECStopRecording://结束录制
            cc.log("########## kRECStopRecording ##########");
            break;
        case anysdk.RECResultCode.kRECPauseRecording://暂停录制
            cc.log("########## kRECPauseRecording ##########");
            break;
        case anysdk.RECResultCode.kRECResumeRecording://恢复录制
            cc.log("########## kRECResumeRecording ##########");
            break;
        case anysdk.RECResultCode.kRECEnterSDKPage://进入SDK页面
            cc.log("########## kRECEnterSDKPage ##########");
            break;
        case anysdk.RECResultCode.kRECQuitSDKPage://退出SDK页面
            cc.log("########## kRECQuitSDKPage ##########");
            break;
        case anysdk.RECResultCode.kRECShareSuccess://视频分享成功
            cc.log("########## kRECShareSuccess ##########");
            break;
        case anysdk.RECResultCode.kRECShareFail://视频分享失败
            cc.log("########## kRECShareFail ##########");
            break;
        default:
            break;
        }
    }
});
