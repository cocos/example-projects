const SuspensionTips = require('SuspensionTips');
cc.Class({
    extends: require('BaseAnySDKExample'),

    properties: {},

    start: function () {
        if (this.hasSupport()) {
            this.userPlugin = anysdk.agentManager.getUserPlugin();
            if (this.userPlugin) {
                this.userPlugin.setListener(this.onUserResult, this);
            }
        }
    },

    login: function () {
        if (!this.userPlugin) {
            SuspensionTips.init.showTips(' this.userPlugin is null  ');
            return;
        }
        this.userPlugin.login();
    },

    isLogined: function () {
        if (!this.userPlugin) {
            SuspensionTips.init.showTips(' this.userPlugin is null  ');
            return;
        }
        var flag = this.userPlugin.isLogined();
        SuspensionTips.init.showTips(' isLogined ' + flag);
    },

    logout: function () {
        if (!this.userPlugin || !this.userPlugin.logout) {
            SuspensionTips.init.showTips(' this.userPlugin is null or logout is not supported ');
            return;
        }
        this.userPlugin.logout();
    },

    enterPlatform: function () {
        if (!this.userPlugin || !this.userPlugin.enterPlatform) {
            SuspensionTips.init.showTips(' this.userPlugin is null or enterPlatform is not supported ');
            return;
        }
        this.userPlugin.enterPlatform();
    },

    showToolBar: function () {
        if (!this.userPlugin || !this.userPlugin.showToolBar) {
            SuspensionTips.init.showTips(' this.userPlugin is null or showToolBar is not supported ');
            return;
        }
        this.userPlugin.showToolBar(anysdk.ToolBarPlace.kToolBarTopLeft);
    },

    hideToolBar: function () {
        if (!this.userPlugin || !this.userPlugin.hideToolBar) {
            SuspensionTips.init.showTips(' this.userPlugin is null or hideToolBar is not supported ');
            return;
        }
        this.userPlugin.hideToolBar();
    },

    accountSwitch: function () {
        if (!this.userPlugin || !this.userPlugin.accountSwitch) {
            SuspensionTips.init.showTips(' this.userPlugin is null or accountSwitch is not supported ');
            return;
        }
        this.userPlugin.accountSwitch();
    },

    realNameRegister: function () {
        if (!this.userPlugin || !this.userPlugin.realNameRegister) {
            SuspensionTips.init.showTips(' this.userPlugin is null or realNameRegister is not supported ');
            return;
        }
        this.userPlugin.realNameRegister();
    },

    antiAddictionQuery: function () {
        if (!this.userPlugin || !this.userPlugin.antiAddictionQuery) {
            SuspensionTips.init.showTips(' this.userPlugin is null or antiAddictionQuery is not supported ');
            return;
        }
        this.userPlugin.antiAddictionQuery();
    },

    submitLoginGameRole: function () {
        if (!this.userPlugin || !this.userPlugin.submitLoginGameRole) {
            SuspensionTips.init.showTips(' this.userPlugin is null or submitLoginGameRole is not supported ');
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
                SuspensionTips.init.showTips(' kInitSuccess ');
                break;
            case anysdk.UserActionResultCode.kInitFail:
                SuspensionTips.init.showTips(' kInitFail ');
                break;
            case anysdk.UserActionResultCode.kLoginSuccess:
                SuspensionTips.init.showTips(' kLoginSuccess ');
                break;
            case anysdk.UserActionResultCode.kLoginNetworkError:
                SuspensionTips.init.showTips(' kLoginNetworkError ');
                break;
            case anysdk.UserActionResultCode.kLoginNoNeed:
                SuspensionTips.init.showTips(' kLoginNoNeed ');
                break;
            case anysdk.UserActionResultCode.kLoginFail:
                SuspensionTips.init.showTips(' kLoginFail ');
                break;
            case anysdk.UserActionResultCode.kLoginCancel:
                SuspensionTips.init.showTips(' kLoginCancel ');
                break;
            case anysdk.UserActionResultCode.kLogoutSuccess:
                SuspensionTips.init.showTips(' kLogoutSuccess ');
                break;
            case anysdk.UserActionResultCode.kLogoutFail:
                SuspensionTips.init.showTips(' kLogoutFail ');
                break;
            case anysdk.UserActionResultCode.kPlatformEnter:
                SuspensionTips.init.showTips(' kPlatformEnter ');
                break;
            case anysdk.UserActionResultCode.kPlatformBack:
                SuspensionTips.init.showTips(' kPlatformBack ');
                break;
            case anysdk.UserActionResultCode.kPausePage:
                SuspensionTips.init.showTips(' kPausePage ');
                break;
            case anysdk.UserActionResultCode.kExitPage:
                SuspensionTips.init.showTips(' kExitPage ');
                break;
            case anysdk.UserActionResultCode.kAntiAddictionQuery:
                SuspensionTips.init.showTips(' kAntiAddictionQuery ');
                break;
            case anysdk.UserActionResultCode.kRealNameRegister:
                SuspensionTips.init.showTips(' kRealNameRegister ');
                break;
            case anysdk.UserActionResultCode.kAccountSwitchSuccess:
                SuspensionTips.init.showTips(' kAccountSwitchSuccess ');
                break;
            case anysdk.UserActionResultCode.kAccountSwitchFail:
                SuspensionTips.init.showTips(' kAccountSwitchFail ');
                break;
            case anysdk.UserActionResultCode.kOpenShop:
                SuspensionTips.init.showTips(' kOpenShop ');
                break;
            default:
                break;
        }
    }
});
