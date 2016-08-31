cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.adsPlugin = anysdk.agentManager.getAdsPlugin();
            if(this.adsPlugin){
                this.adsPlugin.setListener(this.onAdsResult, this);
            }
        }
    },
    
    preloadAds: function (){
	    if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) return;
        this.adsPlugin.preloadAds(anysdk.AdsType.AD_TYPE_BANNER);
	},
	
	showAds: function (){
	    if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) return;
        this.adsPlugin.showAds(anysdk.AdsType.AD_TYPE_BANNER);
	},
	
	hideAds: function (){
	   if (!this.adsPlugin || !this.adsPlugin.isAdTypeSupported(anysdk.AdsType.AD_TYPE_BANNER)) return;
       this.adsPlugin.hideAds(anysdk.AdsType.AD_TYPE_BANNER);
	},
	
	queryPoints: function (){
        if (!this.adsPlugin) return;
		var point = this.adsPlugin.queryPoints();
		cc.log('########## queryPoints ########## : ' + point);
	},
	
	spendPoints: function(){
        if (!this.adsPlugin) return;
		this.adsPlugin.spendPoints(1);
	},

	onAdsResult:function(code, msg){
        cc.log('########## ADS RESULT ########## code: ' + code + ',msg: ' + msg);
		switch(code){
		case anysdk.AdsResultCode.kAdsReceived:
            cc.log("########## kAdsReceived ##########");
			break;
	    case anysdk.AdsResultCode.kAdsShown:
            cc.log("########## kAdsShown ##########");
	    	break;
	    case anysdk.AdsResultCode.kAdsDismissed:
            cc.log("########## kAdsDismissed ##########");
	    	break;
	    case anysdk.AdsResultCode.kPointsSpendSucceed:
            cc.log("########## kPointsSpendSucceed ##########");
	    	break;
	    case anysdk.AdsResultCode.kPointsSpendFailed:
            cc.log("########## kPointsSpendFailed ##########");
	    	break;
	    case anysdk.AdsResultCode.kNetworkError:
            cc.log("########## kNetworkError ##########");
	    	break;
	    case anysdk.AdsResultCode.kUnknownError:
            cc.log("########## kUnknownError ##########");
	    	break;
	    case anysdk.AdsResultCode.kOfferWallOnPointsChanged:
            cc.log("########## kOfferWallOnPointsChanged ##########");
	    	break;
	    default:
	    	break;
		}
	}

});
