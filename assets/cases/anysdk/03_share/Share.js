const SuspensionTips = require('SuspensionTips');
cc.Class({
    extends: require('BaseAnySDKExample'),

    properties: {},

    start: function () {
        if (this.hasSupport()) {
            this.sharePlugin = anysdk.agentManager.getSharePlugin();
            if (this.sharePlugin) {
                this.sharePlugin.setListener(this.onShareResult, this);
            }
        }
    },

    share: function () {
        if (!this.sharePlugin) {
            SuspensionTips.init.showTips(' this.sharePlugin is null ');
            return;
        }
        var info = {
            'title': 'Dark Slash',                   // 标题名称
            'titleUrl': 'http://www.cocos.com',      // 标题链接
            'site': 'Dark Slash',                    // 标题网站名
            'siteUrl': 'http://www.cocos.com',       // 标题网站链接
            'text': '暗黑斩游戏制作演示 - Cocos Creator制造',//分享内容
            'comment': '无',                                 //评论
            'description': '暗黑斩游戏制作演示 - Cocos Creator制造', //描述
            'imageTitle': 'Dark Slash',                              //图片标题
            'imageUrl': 'http://veewo.com/promo/img/darkslash_web_web_banner.png', //分享图片链接
            'url': 'http://www.veewo.com/games/?name=darkslash',       //分享链接
        };
        this.sharePlugin.share(info);
    },

    onShareResult: function (code, msg) {
        cc.log(' SHARE RESULT ########## code: ' + code + ',msg: ' + msg);
        switch (code) {
            case anysdk.ShareResultCode.kShareSuccess:
                SuspensionTips.init.showTips(' kShareSuccess ');
                break;
            case anysdk.ShareResultCode.kShareFail:
                SuspensionTips.init.showTips(' kShareFail ');
                break;
            case anysdk.ShareResultCode.kShareCancel:
                SuspensionTips.init.showTips(' kShareCancel ');
                break;
            case anysdk.ShareResultCode.kShareNetworkError:
                SuspensionTips.init.showTips(' kShareNetworkError ');
                break;
            default:
                break;
        }
    }
});
