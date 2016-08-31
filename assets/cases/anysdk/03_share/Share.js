cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.sharePlugin = anysdk.agentManager.getSharePlugin();
            if(this.sharePlugin){
                this.sharePlugin.setListener(this.onShareResult, this);
            }
        }
    },

	share: function(){
	    if (!this.sharePlugin) return;
        var info = {
            'title' : 'Dark Slash',                   // 标题名称
            'titleUrl' : 'http://www.cocos.com',      // 标题链接
            'site' : 'Dark Slash',                    // 标题网站名
            'siteUrl' : 'http://www.cocos.com',       // 标题网站链接
            'text' : '暗黑斩游戏制作演示 - Cocos Creator制造',//分享内容
            'comment' : '无',                                 //评论
            'description': '暗黑斩游戏制作演示 - Cocos Creator制造', //描述
            'imageTitle': 'Dark Slash',                              //图片标题
            'imageUrl': 'http://veewo.com/promo/img/darkslash_web_web_banner.png', //分享图片链接
            'url': 'http://www.veewo.com/games/?name=darkslash',       //分享链接
        };
        this.sharePlugin.share(info);
	},
	
    onShareResult: function (code, msg){
        cc.log('########## SHARE RESULT ########## code: ' + code + ',msg: ' + msg);
        switch(code){
            case anysdk.ShareResultCode.kShareSuccess:
	    		cc.log("########## kShareSuccess ##########");
                break;
            case anysdk.ShareResultCode.kShareFail:
	    		cc.log("########## kShareFail ##########");
                break;
            case anysdk.ShareResultCode.kShareCancel:
	    		cc.log("########## kShareCancel ##########");
                break;
            case anysdk.ShareResultCode.kShareNetworkError:
	    		cc.log("########## kShareNetworkError ##########");
                break;         
            default:
                break;
        }
    }
});
