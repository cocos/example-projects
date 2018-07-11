//
// 用于提示用户哪些范例不支持平台
//

module.exports = {
    tispPrefab: null,

    SupportConfig: function (name) {
        switch (name) {
            case 'webp-test':
                return cc.sys.capabilities['webp'];
            case 'EditBoxTabIndex':
                return !cc.sys.isNative;
            case 'fullscreenVideo':
                return (!cc.sys.isNative && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);
            case 'videoPlayer':
                return (!cc.sys.isNative && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);
            case 'webview':
                return (cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);
            case 'Mask_IMAGE_STENCIL':
                return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;
            case 'Mask_NESTED':
                return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;
            case 'DeviceMotion':
                return cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.isMobile;
            case 'KeyboardInput':
                return !cc.sys.isMobile;
            case 'OnMultiTouchInput':
                return cc.sys.isMobile;
            case 'downloader':
                return cc.sys.isNative;
            case 'render_to_canvas':
                return (!cc.sys.isNative && cc.sys.platform !== cc.sys.QQ_PLAY);
            case 'render_to_sprite':
                return (cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);
            case 'platform':
                return !cc.sys.isMobile;
            case 'MotionStreak':
                return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;
            case 'Native_Call':
                return cc.sys.isMobile && cc.sys.platform === cc.sys.ANDROID;
            // anysdk
            case '01_user':
            case '02_iap':
            case '03_share':
            case '04_ads':
            case '05_analytics':
            case '06_social':
            case '07_push':
            case '08_adtracking':
            case '09_crash':
            case '10_rec':
                return (typeof anysdk !== 'undefined' && cc.sys.isMobile);
        }
    },

    init () {
        cc.loader.loadRes('tips/Tips', (err, prefab) => {
            this.tispPrefab = prefab;
        });
    },

    createTips (content) {
        let node = cc.instantiate(this.tispPrefab);
        let tipsCtrl = node.getComponent('TipsCtrl');
        if (content) {
            tipsCtrl.setContent(content);
        }
        node.parent = cc.director.getScene();
    },

    hasSupport (name) {
        let support = this.SupportConfig(name);
        if (!support && support !== undefined) {
            this.createTips();
            return false;
        }
        return true;
    }
};
