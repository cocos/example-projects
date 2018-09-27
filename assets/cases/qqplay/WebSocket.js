/**
 * @author Javen 
 * @copyright 2018-09-22 17:37:50 javendev@126.com 
 * @description webSocket 测试 
 */
let Global = require("Global");
let customComponent = require("CustomComponent");
cc.Class({
    extends: customComponent,

    properties: {

    },

    // onLoad () {},
    start() {
        this._super();
        this.initWebSocketResponseCallBack();
    },

    initWebSocketResponseCallBack() {
        Global.loginResponse = this.loginSocketCallBack.bind(this);
    },
    loginSocketCallBack(login) {
        BKTools.log("Userid>" + login.getUserid());
        BKTools.log("Nickname>" + login.getNickname());
    },

    // update (dt) {},
    btnClick(event, data) {
        if (data == 'webSocket') {
            cc.log("点击事件:");
            this._webSocket.toLogin();
        } else if (data == 'back') {
            cc.director.loadScene("QQPlay");
        }
    }
});