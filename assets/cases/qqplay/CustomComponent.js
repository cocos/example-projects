/**
 * @author Javen 
 * @copyright 2018-09-22 17:31:16 javendev@126.com 
 * @description 自定义组件 
 */

cc.Class({
    extends: cc.Component,
    statics: {
        count: 18,
    },
    start() {
        try {
            this._webSocket = cc.find("webSocket").getComponent("WebSocketComponent");
            cc.log(this._webSocket);
        } catch (error) {}
    },
});