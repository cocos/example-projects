/**
 * @author Javen 
 * @copyright 2018-09-22 17:32:21 javendev@126.com 
 * @description webSocket工具组件
 */


let Global = require("Global");
let BKTools = require("BKTools");

let WS_TYPE = cc.Enum({
    BK_WS: 1,
    WEB_WS: 2,
});

cc.Class({
    extends: cc.Component,
    // properties: {

    // },

    // onLoad () {},

    start() {
        // this.schedule(function () {
        //     if (this.hasConnected) {

        //     }
        // }, 5);
    },

    initWebSocket() {
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            this._ws = new BK.WebSocket("ws://" + Global.WEB_SOCKET.URL);
            this._wsType = WS_TYPE.BK_WS;
        } else {
            this._ws = new WebSocket("ws://" + Global.WEB_SOCKET.URL);
            this._wsType = WS_TYPE.WEB_WS;
        }
        this.addEventListener(this._ws);
    },

    addEventListener(ws) {
        let self = this;
        ws.onopen = function (event) {
            self._isConnected = true;
            BKTools.log("onopen....");
        };
        ws.onerror = function (event) {
            self._isConnected = false;
            BKTools.log("onerror....");
        };
        ws.onclose = function (event) {
            self._isConnected = false;
            BKTools.log("onclose....");
        };
        if (self._wsType == WS_TYPE.BK_WS) {
            ws.onMessage = function (ws, event) {
                if (event.isBinary) {
                    let buf = event.data;
                    //将游标pointer重置为0
                    buf.rewind();
                    let ab = new ArrayBuffer(buf.length);
                    let dv = new DataView(ab);
                    while (!buf.eof) {
                        dv.setUint8(buf.pointer, buf.readUint8Buffer());
                    }
                    self.toHander(ab);
                } else {
                    BKTools.log("BK.WebSocket data type is not binary");
                }
            }
        } else {
            ws.onmessage = function (event) {
                if (event.data instanceof Blob) {
                    let blob = event.data;
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onload = function (e) {
                        if (e.target.readyState == FileReader.DONE) {
                            let result = reader.result;
                            self.toHander(result);
                        }
                    }
                } else {
                    BKTools.log("webSocket data type is not blob");
                }
            };
        }
    },

    hasConnected() {
        return this._isConnected;
    },

    toHander(buffer) {
        let self = this;
        let cmd = proto.UserCmdOutComonProto.deserializeBinary(buffer);
        switch (cmd.getId()) {
            case proto.UserCmdOutType.RECONNECTION_RESULT:
                BKTools.log("重连结果....");
                break;
            case proto.UserCmdOutType.USER_CONNECT_SUCCESS:
                BKTools.log("客户端连接成功....");
                break;
            case proto.UserCmdOutType.USER_LOGIN_SUCCESS:
                BKTools.log("反馈登录消息开始...");
                break;
            case proto.UserCmdOutType.USER_LOGIN_SUCCESS_OVER:
                BKTools.log("反馈登录消息结束....");
                let loginOver = proto.PlayerLoginOverProtoOut.deserializeBinary(buffer);
                //回调给请求页
                Global.loginResponse(loginOver);
                break;
            default:
                break;
        }
    },

    send(bytes) {
        this._ws.send(bytes);
    },
    /**
     * 登录
     */
    toLogin() {
        if (!this.hasConnected()) {
            this.initWebSocket();
            return;
        }
        let login = new proto.UserLoginProto();
        login.setId(proto.UserCmdInType.USER_LOGIN);
        login.setToken(Global.WEB_SOCKET.TOKEN);
        this.send(login.serializeBinary());
    },
    // update (dt) {},
});