const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Node
    },

    onClick: function () {
        var className = "org/cocos2dx/javascript/AppActivity";
        var methodName = "showAlertDialog";
        var methodSignature = "(Ljava/lang/String;Ljava/lang/String;)V";
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, "Title", "Native Call Test");
    }
});
