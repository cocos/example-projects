const TipsManager = require('TipsManager');
cc.Class({
    extends: cc.Component,

    start: function () {
        this.adsPlugin = anysdk.agentManager.getAdsPlugin();
        if (this.adsPlugin) {
            this.adsPlugin.setListener(this.onAdsResult, this);
        }    
    },

    preloadAds: function () {
        if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) {
            TipsManager.createTips(' this.adsPlugin is null or banner is not supported ');
            return;
        }
        this.adsPlugin.preloadAds(anysdk.AdsType.AD_TYPE_BANNER);
    },

    showAds: function () {
        if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) {
            TipsManager.createTips(' this.adsPlugin is null or banner is not supported ');
            return;
        }
        this.adsPlugin.showAds(anysdk.AdsType.AD_TYPE_BANNER);
    },

    hideAds: function () {
        if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) {
            TipsManager.createTips(' this.adsPlugin is null or banner is not supported ');
            return;
        }
        this.adsPlugin.hideAds(anysdk.AdsType.AD_TYPE_BANNER);
    },

    queryPoints: function () {
        if (!this.adsPlugin) {
            TipsManager.createTips(' this.adsPlugin is null ');
            return;
        }
        var point = this.adsPlugin.queryPoints();
        TipsManager.createTips(' queryPoints : ' + point);
    },

    spendPoints: function () {
        if (!this.adsPlugin) {
            TipsManager.createTips(' this.adsPlugin is null ');
            return;
        }
        this.adsPlugin.spendPoints(1);
    },

    onAdsResult: function (code, msg) {
        cc.log(' ADS RESULT ########## code: ' + code + ',msg: ' + msg);
        switch (code) {
            case anysdk.AdsResultCode.kAdsReceived:
                TipsManager.createTips(' kAdsReceived ');
                break;
            case anysdk.AdsResultCode.kAdsShown:
                TipsManager.createTips(' kAdsShown ');
                break;
            case anysdk.AdsResultCode.kAdsDismissed:
                TipsManager.createTips(' kAdsDismissed ');
                break;
            case anysdk.AdsResultCode.kPointsSpendSucceed:
                TipsManager.createTips(' kPointsSpendSucceed ');
                break;
            case anysdk.AdsResultCode.kPointsSpendFailed:
                TipsManager.createTips(' kPointsSpendFailed ');
                break;
            case anysdk.AdsResultCode.kNetworkError:
                TipsManager.createTips(' kNetworkError ');
                break;
            case anysdk.AdsResultCode.kUnknownError:
                TipsManager.createTips(' kUnknownError ');
                break;
            case anysdk.AdsResultCode.kOfferWallOnPointsChanged:
                TipsManager.createTips(' kOfferWallOnPointsChanged ');
                break;
            default:
                break;
        }
    }

});
