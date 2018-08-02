const TipsManager = require('TipsManager');
cc.Class({
    extends: cc.Component,

    start: function () {
        this.userPlugin = anysdk.agentManager.getUserPlugin();
        if (this.userPlugin) {
            this.userPlugin.setListener(this.onUserResult, this);
        }    
    },

    login: function () {
        if (!this.userPlugin) {
            TipsManager.createTips(' this.userPlugin is null  ');
            return;
        }
        this.userPlugin.login();
    },

    isLogined: function () {
        if (!this.userPlugin) {
            TipsManager.createTips(' this.userPlugin is null  ');
            return;
        }
        var flag = this.userPlugin.isLogined();
        TipsManager.createTips(' isLogined ' + flag);
    },

    logout: function () {
        if (!this.userPlugin || !this.userPlugin.logout) {
            TipsManager.createTips(' this.userPlugin is null or logout is not supported ');
            return;
        }
        this.userPlugin.logout();
    },

    enterPlatform: function () {
        if (!this.userPlugin || !this.userPlugin.enterPlatform) {
            TipsManager.createTips(' this.userPlugin is null or enterPlatform is not supported ');
            return;
        }
        this.userPlugin.enterPlatform();
    },

    showToolBar: function () {
        if (!this.userPlugin || !this.userPlugin.showToolBar) {
            TipsManager.createTips(' this.userPlugin is null or showToolBar is not supported ');
            return;
        }
        this.userPlugin.showToolBar(anysdk.ToolBarPlace.kToolBarTopLeft);
    },

    hideToolBar: function () {
        if (!this.userPlugin || !this.userPlugin.hideToolBar) {
            TipsManager.createTips(' this.userPlugin is null or hideToolBar is not supported ');
            return;
        }
        this.userPlugin.hideToolBar();
    },

    accountSwitch: function () {
        if (!this.userPlugin || !this.userPlugin.accountSwitch) {
            TipsManager.createTips(' this.userPlugin is null or accountSwitch is not supported ');
            return;
        }
        this.userPlugin.accountSwitch();
    },

    realNameRegister: function () {
        if (!this.userPlugin || !this.userPlugin.realNameRegister) {
            TipsManager.createTips(' this.userPlugin is null or realNameRegister is not supported ');
            return;
        }
        this.userPlugin.realNameRegister();
    },

    antiAddictionQuery: function () {
        if (!this.userPlugin || !this.userPlugin.antiAddictionQuery) {
            TipsManager.createTips(' this.userPlugin is null or antiAddictionQuery is not supported ');
            return;
        }
        this.userPlugin.antiAddictionQuery();
    },

    submitLoginGameRole: function () {
        if (!this.userPlugin || !this.userPlugin.submitLoginGameRole) {
            TipsManager.createTips(' this.userPlugin is null or submitLoginGameRole is not supported ');
            return;
        }
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

    onUserResult: function (code, msg) {
        cc.log(' USER RESULT ########## code: ' + code + ',msg: ' + msg);
        switch (code) {
            case anysdk.UserActionResultCode.kInitSuccess:
                TipsManager.createTips(' kInitSuccess ');
                break;
            case anysdk.UserActionResultCode.kInitFail:
                TipsManager.createTips(' kInitFail ');
                break;
            case anysdk.UserActionResultCode.kLoginSuccess:
                TipsManager.createTips(' kLoginSuccess ');
                break;
            case anysdk.UserActionResultCode.kLoginNetworkError:
                TipsManager.createTips(' kLoginNetworkError ');
                break;
            case anysdk.UserActionResultCode.kLoginNoNeed:
                TipsManager.createTips(' kLoginNoNeed ');
                break;
            case anysdk.UserActionResultCode.kLoginFail:
                TipsManager.createTips(' kLoginFail ');
                break;
            case anysdk.UserActionResultCode.kLoginCancel:
                TipsManager.createTips(' kLoginCancel ');
                break;
            case anysdk.UserActionResultCode.kLogoutSuccess:
                TipsManager.createTips(' kLogoutSuccess ');
                break;
            case anysdk.UserActionResultCode.kLogoutFail:
                TipsManager.createTips(' kLogoutFail ');
                break;
            case anysdk.UserActionResultCode.kPlatformEnter:
                TipsManager.createTips(' kPlatformEnter ');
                break;
            case anysdk.UserActionResultCode.kPlatformBack:
                TipsManager.createTips(' kPlatformBack ');
                break;
            case anysdk.UserActionResultCode.kPausePage:
                TipsManager.createTips(' kPausePage ');
                break;
            case anysdk.UserActionResultCode.kExitPage:
                TipsManager.createTips(' kExitPage ');
                break;
            case anysdk.UserActionResultCode.kAntiAddictionQuery:
                TipsManager.createTips(' kAntiAddictionQuery ');
                break;
            case anysdk.UserActionResultCode.kRealNameRegister:
                TipsManager.createTips(' kRealNameRegister ');
                break;
            case anysdk.UserActionResultCode.kAccountSwitchSuccess:
                TipsManager.createTips(' kAccountSwitchSuccess ');
                break;
            case anysdk.UserActionResultCode.kAccountSwitchFail:
                TipsManager.createTips(' kAccountSwitchFail ');
                break;
            case anysdk.UserActionResultCode.kOpenShop:
                TipsManager.createTips(' kOpenShop ');
                break;
            default:
                break;
        }
    }
});
