const SuspensionTips = require('SuspensionTips');
cc.Class({
    extends: require('BaseAnySDKExample'),

    properties: {},

    start: function () {
        if (this.hasSupport()) {
            this.adsPlugin = anysdk.agentManager.getAdsPlugin();
            if (this.adsPlugin) {
                this.adsPlugin.setListener(this.onAdsResult, this);
            }
        }
    },

    preloadAds: function () {
        if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) {
            SuspensionTips.init.showTips(' this.adsPlugin is null or banner is not supported ');
            return;
        }
        this.adsPlugin.preloadAds(anysdk.AdsType.AD_TYPE_BANNER);
    },

    showAds: function () {
        if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) {
            SuspensionTips.init.showTips(' this.adsPlugin is null or banner is not supported ');
            return;
        }
        this.adsPlugin.showAds(anysdk.AdsType.AD_TYPE_BANNER);
    },

    hideAds: function () {
        if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) {
            SuspensionTips.init.showTips(' this.adsPlugin is null or banner is not supported ');
            return;
        }
        this.adsPlugin.hideAds(anysdk.AdsType.AD_TYPE_BANNER);
    },

    queryPoints: function () {
        if (!this.adsPlugin) {
            SuspensionTips.init.showTips(' this.adsPlugin is null ');
            return;
        }
        var point = this.adsPlugin.queryPoints();
        SuspensionTips.init.showTips(' queryPoints : ' + point);
    },

    spendPoints: function () {
        if (!this.adsPlugin) {
            SuspensionTips.init.showTips(' this.adsPlugin is null ');
            return;
        }
        this.adsPlugin.spendPoints(1);
    },

    onAdsResult: function (code, msg) {
        cc.log(' ADS RESULT ########## code: ' + code + ',msg: ' + msg);
        switch (code) {
            case anysdk.AdsResultCode.kAdsReceived:
                SuspensionTips.init.showTips(' kAdsReceived ');
                break;
            case anysdk.AdsResultCode.kAdsShown:
                SuspensionTips.init.showTips(' kAdsShown ');
                break;
            case anysdk.AdsResultCode.kAdsDismissed:
                SuspensionTips.init.showTips(' kAdsDismissed ');
                break;
            case anysdk.AdsResultCode.kPointsSpendSucceed:
                SuspensionTips.init.showTips(' kPointsSpendSucceed ');
                break;
            case anysdk.AdsResultCode.kPointsSpendFailed:
                SuspensionTips.init.showTips(' kPointsSpendFailed ');
                break;
            case anysdk.AdsResultCode.kNetworkError:
                SuspensionTips.init.showTips(' kNetworkError ');
                break;
            case anysdk.AdsResultCode.kUnknownError:
                SuspensionTips.init.showTips(' kUnknownError ');
                break;
            case anysdk.AdsResultCode.kOfferWallOnPointsChanged:
                SuspensionTips.init.showTips(' kOfferWallOnPointsChanged ');
                break;
            default:
                break;
        }
    }

});
