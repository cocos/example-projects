cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.userPlugin = anysdk.agentManager.getUserPlugin();
            if(this.userPlugin){
                this.userPlugin.setListener(this.onUserResult, this);
            }
        }
    },
    
    login: function () {
        if (!this.userPlugin) return;
        this.userPlugin.login();
    },
    
    isLogined: function () {
        if (!this.userPlugin) return;
        var flag = this.userPlugin.isLogined();
        cc.log("########## isLogined ##########" + flag);
    },
    
    logout: function () {
        if (!this.userPlugin || !this.userPlugin.logout) return;
    	this.userPlugin.logout();
    },
    
    enterPlatform: function () {
        if (!this.userPlugin || !this.userPlugin.enterPlatform) return;
    	this.userPlugin.enterPlatform();
    },
    
    showToolBar: function () {
        if (!this.userPlugin || !this.userPlugin.showToolBar) return;
        this.userPlugin.showToolBar(anysdk.ToolBarPlace.kToolBarTopLeft);
    },
    
    hideToolBar: function () {
        if (!this.userPlugin || !this.userPlugin.hideToolBar) return;
        this.userPlugin.hideToolBar();
    },
    
    accountSwitch: function () {
        if (!this.userPlugin || !this.userPlugin.accountSwitch) return;
        this.userPlugin.accountSwitch();
    },
    
    realNameRegister: function () {
        if (!this.userPlugin || !this.userPlugin.realNameRegister) return;
        this.userPlugin.realNameRegister();
    },
    
    antiAddictionQuery: function () {
        if (!this.userPlugin || !this.userPlugin.antiAddictionQuery) return;
        this.userPlugin.antiAddictionQuery();
    },
    
    submitLoginGameRole: function () {
        if (!this.userPlugin || !this.userPlugin.submitLoginGameRole) return;
        var data = {
            'roleId': '123456',
            'roleName': 'test',
            'roleLevel': '10',
            'zoneId': '123',
            'zoneName': 'test',
            'dataType': '1',
            'ext': 'login'
        };
        this.userPlugin.submitLoginGameRole(data);
    },
    
    onUserResult: function (code, msg){
        cc.log('########## USER RESULT ########## code: ' + code + ',msg: ' + msg);
        switch(code){
        case anysdk.UserActionResultCode.kInitSuccess:
            cc.log("########## kInitSuccess ##########");
            break;
        case anysdk.UserActionResultCode.kInitFail:
            cc.log("########## kInitFail ##########");
            break;
        case anysdk.UserActionResultCode.kLoginSuccess:
            cc.log("########## kLoginSuccess ##########");
            break;
        case anysdk.UserActionResultCode.kLoginNetworkError:
            cc.log("########## kLoginNetworkError ##########");
            break;
        case anysdk.UserActionResultCode.kLoginNoNeed:
            cc.log("########## kLoginNoNeed ##########");
            break;
        case anysdk.UserActionResultCode.kLoginFail:
            cc.log("########## kLoginFail ##########");
            break;
        case anysdk.UserActionResultCode.kLoginCancel:
            cc.log("########## kLoginCancel ##########");
            break;
        case anysdk.UserActionResultCode.kLogoutSuccess:
            cc.log("########## kLogoutSuccess ##########");
            break;
        case anysdk.UserActionResultCode.kLogoutFail:
            cc.log("########## kLogoutFail ##########");
            break;
        case anysdk.UserActionResultCode.kPlatformEnter:
            cc.log("########## kPlatformEnter ##########");
            break;
        case anysdk.UserActionResultCode.kPlatformBack:
            cc.log("########## kPlatformBack ##########");
            break;
        case anysdk.UserActionResultCode.kPausePage:
            cc.log("########## kPausePage ##########");
            break;
        case anysdk.UserActionResultCode.kExitPage:
            cc.log("########## kExitPage ##########");
            break;
        case anysdk.UserActionResultCode.kAntiAddictionQuery:
            cc.log("########## kAntiAddictionQuery ##########");
            break;
        case anysdk.UserActionResultCode.kRealNameRegister:
            cc.log("########## kRealNameRegister ##########");
            break;
        case anysdk.UserActionResultCode.kAccountSwitchSuccess:
            cc.log("########## kAccountSwitchSuccess ##########");
            break;
        case anysdk.UserActionResultCode.kAccountSwitchFail:
            cc.log("########## kAccountSwitchFail ##########");
            break;
        case anysdk.UserActionResultCode.kOpenShop:
            cc.log("########## kOpenShop ##########");
            break;
        default:
            break;
        }
    }

});
