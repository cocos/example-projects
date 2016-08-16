const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        tips: cc.Label,
        button: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        if (!(cc.sys.isMobile && cc.sys.platform == cc.sys.ANDROID) || cc.runtime) { return; }
        this.tips.textKey = i18n.t("cases/native_call/native_call.fire.2");
        this.button.active = true;
    },

    onClick: function () {
        var className = "org/cocos2dx/javascript/AppActivity";
        var methodName = "showAlertDialog";
        var methodSignature = "(Ljava/lang/String;Ljava/lang/String;)V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, "Title", "Native Call Test");
    }
});
