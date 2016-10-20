//
// 用于提示用户哪些范例不支持平台
//
const i18n = require('i18n');


// 平台检查
var PlatformType = cc.Enum({
    Node: 0,
    Native: 1,
    Native_Desktop: 2,
    Native_Android: 3,

    Runtime: 20,

    WebGl: 30
});

var canvas = null;

cc.Class({
    extends: cc.Component,

    properties: {
        tempTips: cc.Prefab,
        support: false,
        // 需要检测的平台
        platform: {
            default: PlatformType.Node,
            type: PlatformType
        }
    },

    _addWidget () {
        var widget = this.node.addComponent(cc.Widget);
        widget.isAlignVerticalCenter = true;
        widget.isAlignHorizontalCenter = true;
        widget.horizontalCenter = 0;
        widget.verticalCenter = 0;
        widget.isAlignOnce = false;
    },

    _init () {
        var tips = cc.instantiate(this.tempTips);
        this.node.addChild(tips);
        tips.position = cc.p(0, 0);
        tips.zIndex = 99;
        return tips.getChildByName('Content').getComponent(cc.Label);
    },

    _checkNonSupport () {
        var showed = false, textKey = '';
        switch (this.platform) {
            case PlatformType.Native_Desktop:
                showed = (cc.sys.isNative && (cc.sys.platform === cc.sys.WIN32 ||
                          cc.sys.platform === cc.sys.MACOS)) || cc.runtime;
                textKey = i18n.t("example_case_native_desktop_tips");
                break;
            case PlatformType.Runtime:
                showed = cc.runtime;
                textKey = i18n.t("example_case_runtime_tips");
                break;
        }
        return {
            showed: showed,
            textKey: textKey
        }
    },

    _checkSupport () {
        var showed = false, textKey = '';
        switch (this.platform) {
            case PlatformType.Native:
                showed = !cc.sys.isMobile || cc.runtime;
                textKey = i18n.t("example_case_native");
                break;
            case PlatformType.WebGl:
                showed = cc._renderType !== cc.game.RENDER_TYPE_WEBGL;
                textKey = i18n.t("example_case_support_webGl_tips");
                break;
            case PlatformType.Native_Android:
                showed = !(cc.sys.isMobile && cc.sys.platform === cc.sys.ANDROID) || cc.runtime;
                textKey = i18n.t("example_case_support_native_android_tips");
                break;
        }
        return {
            showed: showed,
            textKey: textKey
        }
    },

    _showTips () {
        if (this.type === PlatformType.Node) { return; }
        var info = null;
        if (this.support) {
            info = this._checkSupport();
        }
        else {
            info = this._checkNonSupport();
        }
        if (info.showed) {
            var content = this._init();
            content.textKey = info.textKey;
        }
    },

    onLoad () {
        this._addWidget();
        this._showTips();
    }
});
