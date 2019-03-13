//
// Restricted the scenes platform permissions
//
module.exports = {
    tispPrefab: null,

    SupportConfig: function (name) {
        switch (name) {
            case 'downloader-web':
            case 'EditBoxTabIndex':     return !cc.sys.isNative;
            case 'OnMultiTouchInput':   return cc.sys.isMobile;
            case 'webp-test':           return cc.sys.capabilities['webp'];
            case 'DeviceMotion':        return cc.sys.isMobile && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.VIVO_GAME;
            case 'Native_Call':         return cc.sys.isMobile && cc.sys.platform === cc.sys.ANDROID && !CC_RUNTIME;
            case 'TTFFontLabel':        return cc.sys.platform !== cc.sys.QQ_PLAY;
            case 'Subpackages':
                return (!CC_PREVIEW && !CC_JSB && !cc.sys.isBrowser && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.VIVO_GAME);
            case 'MousePropagation':    return ((cc.sys.isNative && !cc.sys.isMobile && cc.sys.platform !== cc.sys.WECHAT_GAME && cc.sys.platform !== cc.sys.QQ_PLAY) || cc.sys.platform === cc.sys.DESKTOP_BROWSER);
            case 'downloader-native':
                return cc.sys.isNative && !CC_RUNTIME;

            // Not support the VIVO_GAME and OPPO_GAME
            case 'capture_to_native':
                return cc.sys.isNative && cc.sys.platform !== cc.sys.VIVO_GAME && cc.sys.platform !== cc.sys.OPPO_GAME;
            case 'iOS_getSafeArea':
                return (cc.sys.platform === cc.sys.IPHONE && cc.sys.isNative);
            case 'capture_to_wechat':
                return  cc.sys.platform === cc.sys.WECHAT_GAME;
            case 'capture_to_web':
                return cc.sys.isBrowser;

            // Only support the RENDER_TYPE_WEBGL
            case 'MotionStreak':
            case 'Mask_IMAGE_STENCIL':
            case 'Mask_NESTED':
                return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;

            // Not support isMobile
            case 'KeyboardInput':
            case 'platform':
                return !cc.sys.isMobile && cc.sys.platform !== cc.sys.WECHAT_GAME && cc.sys.platform !== cc.sys.BAIDU_GAME;

            // Not support the Simulator, QQ_PLAY, WECHAT_GAME
            case 'videoPlayer':
                return (cc.sys.isMobile || cc.sys.isBrowser) && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME && cc.sys.platform !== cc.sys.BAIDU_GAME && !CC_RUNTIME;

            // Not support the VIVO_GAME, OPPO_GAME, WECHAT_GAME, QQ_PLAY, CC_RUNTIME
            case 'webview':
                return  (cc.sys.isMobile || cc.sys.isBrowser) && !CC_RUNTIME && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME;
            case 'mesh':
                return cc.sys.platform !== cc.sys.VIVO_GAME && cc.sys.platform !== cc.sys.OPPO_GAME;
        }
    },

    init () {
        if (this.tipsPrefab) return;

        cc.loader.loadRes('tips/Tips', (err, prefab) => {
            this.tipsPrefab = prefab;
        });
    },

    createTips (content) {
        let node = cc.instantiate(this.tipsPrefab);
        let tipsCtrl = node.getComponent('TipsCtrl');
        if (content) {
            tipsCtrl.setContent(content);
        }
        node.parent = cc.director.getScene();
    },

    hasSupport (name, hideTip) {
        let support = this.SupportConfig(name);
        if (!support && support !== undefined) {
            if (!hideTip) {
                this.createTips();
            }
            return false;
        }
        return true;
    }
};