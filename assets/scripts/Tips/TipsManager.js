//
// Restricted the scenes platform permissions
//

// init platform info
const isAndroid = cc.sys.platform === cc.sys.ANDROID;
const isNative = cc.sys.isNative;
const isNativeWindows = isNative && cc.sys.os === cc.sys.OS_WINDOWS;
const isNativeMacOS = isNative && cc.sys.os === cc.sys.OS_OSX;
const isBrowser = cc.sys.isBrowser;
const isMobile = cc.sys.isMobile;
const isIphone = cc.sys.platform === cc.sys.IPHONE;
const isDesktopBrowser = cc.sys.platform === cc.sys.DESKTOP_BROWSER;

const isWechat = cc.sys.platform === cc.sys.WECHAT_GAME;
const isQQPlay = cc.sys.platform === cc.sys.QQ_PLAY;
const isBaidu = cc.sys.platform === cc.sys.BAIDU_GAME;
const isVivo = cc.sys.platform === cc.sys.VIVO_GAME;
const isOPPO = cc.sys.platform === cc.sys.OPPO_GAME;
const isXiaomi = cc.sys.platform === cc.sys.XIAOMI_GAME;
const isHuawei = cc.sys.platform === cc.sys.HUAWEI_GAME;
const isJkw = cc.sys.platform === cc.sys.JKW_GAME;
const isAlipay = cc.sys.platform === cc.sys.ALIPAY_GAME;
 
module.exports = {
    tispPrefab: null,

    SupportConfig: function (name) {
        console.log(name);
        switch (name) {
            case 'downloader-web':      return !isNative;
            case 'EditBoxTabIndex':     return !isNative && !isAlipay;
            case 'EditBox':
            case 'EditBoxEvent':        return !isAlipay;
            case 'OnMultiTouchInput':   return isMobile;
            case 'webp-test':           return cc.sys.capabilities['webp'];
            case 'DeviceMotion':        return isMobile && !isQQPlay && !isVivo;
            case 'Native_Call':         return isMobile && (isAndroid || isIphone) && !CC_RUNTIME;
            case 'TTFFontLabel':        return !isQQPlay;
            case 'MousePropagation':    return ((isNative && !isMobile && !isWechat && !isQQPlay && !isXiaomi && !isHuawei && !isAlipay) || isDesktopBrowser);
            case 'downloader-native':
                return isNative && !CC_RUNTIME;
            // Not support the VIVO_GAME and OPPO_GAME
            case 'capture_to_native':
                return isNative && !isVivo && !isOPPO;
            case 'SafeArea':
                return (isIphone || isAndroid) && isNative;
            case 'capture_to_wechat':
                return  isWechat;
            case 'capture_to_web':
            case 'ShadowLabel':
            case 'videoPlayer-stayOnBottom':
                return isBrowser;

            // Only support the RENDER_TYPE_WEBGL
            case 'MotionStreak':
            case 'Mask_IMAGE_STENCIL':
            case 'Mask_NESTED':
                return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;

            // Not support isMobile
            case 'KeyboardInput':
            case 'platform':
                return !isMobile && !isBaidu && !isXiaomi && !isHuawei && !isAlipay;

            // Not support the Simulator, QQ_PLAY, WECHAT_GAME
            case 'videoPlayer':
                return !isNativeWindows && !isNativeMacOS && !CC_RUNTIME && !isQQPlay && !isBaidu && !isXiaomi && !isHuawei && !isAlipay;

            // Not support the VIVO_GAME, OPPO_GAME, WECHAT_GAME, QQ_PLAY, CC_RUNTIME
            case 'webview':
                return (isMobile || isBrowser) && !CC_RUNTIME && !isQQPlay && !isWechat && !isBaidu && !isXiaomi && !isHuawei && !isAlipay;
            case 'mesh':
                return !isVivo && !isOPPO;
        }
    },

    init () {
        if (this.tipsPrefab) return;

        cc.resources.load('tips/Tips', (err, prefab) => {
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