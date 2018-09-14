//
// 用于提示用户哪些范例不支持平台
//

module.exports = {
    tispPrefab: null,

    SupportConfig: function (name) {
        switch (name) {
            case 'downloader-web':
            case 'EditBoxTabIndex':     return !cc.sys.isNative;
            case 'OnMultiTouchInput':   return cc.sys.isMobile;
            case 'webp-test':           return cc.sys.capabilities['webp'];
            case 'DeviceMotion':        return cc.sys.isMobile && cc.sys.platform !== cc.sys.QQ_PLAY;
            case 'Native_Call':         return cc.sys.isMobile && cc.sys.platform === cc.sys.ANDROID;
            case 'TTFFontLabel':        return cc.sys.platform !== cc.sys.QQ_PLAY;
            case 'subpackage':          return (!CC_PREVIEW && cc.sys.platform !== cc.sys.QQ_PLAY);
            case 'render_to_canvas':    return (!cc.sys.isNative && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);
            case 'MousePropagation':    return ((cc.sys.isNative && !cc.sys.isMobile && cc.sys.platform !== cc.sys.WECHAT_GAME && cc.sys.platform !== cc.sys.QQ_PLAY) || cc.sys.platform === cc.sys.DESKTOP_BROWSER);
            case 'downloader-native':   return cc.sys.isNative;

            // 不支持 QQ_PLAY，WECHAT_GAME 平台
            case 'render_to_sprite':
                return (cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);

            // 只支持 RENDER_TYPE_WEBGL
            case 'MotionStreak':
            case 'Mask_IMAGE_STENCIL':
            case 'Mask_NESTED':
                return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;

            // 不支持 isMobile
            case 'KeyboardInput':
            case 'platform':
                return !cc.sys.isMobile;

            // 不支持 模拟器，QQ_PLAY，WECHAT_GAME 平台
            case 'fullscreenVideo':
            case 'videoPlayer':
            case 'webview':
                // 2.0 native still not support the video play feature.
                return (!cc.sys.isNative && (cc.sys.isMobile || cc.sys.isBrowser) && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.platform !== cc.sys.WECHAT_GAME);
        }
    },

    init () {
        if (this.tipsPrefab) return;

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
