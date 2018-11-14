/**
 * @origin Javen 
 * @description Get user info
 * 
 *  QQ 厘米游戏相关文档链接:
 *  https://hudong.qq.com/docs/engine/engine/native/login/intro.html
 *  https://hudong.qq.com/docs/engine/userInfo/intro.html
 */

let BKTools = require("../BKTools");

cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Sprite,
            tooltip: "用户图像",
        },
        nick: cc.Label
    },
    /**
     * 获取用户信息
     */
    getUserInfo (event, data) {
        BKTools.log("获取用户信息");
        if (BK.MQQ) {
            this.getHeadEx();
            this.getNick();
        }
    },
    /**
     * 获取用户头像并保存本地
     */
    getHeadEx () {
        let self = this;
        let absolutePath = "GameSandBox://_head/" + GameStatusInfo.openId + ".jpg";
        let isExit = BK.FileUtil.isFileExist(absolutePath);
        cc.log(absolutePath + " is exit :" + isExit);
        //如果指定目录中存在此图像就直接显示否则从网络获取
        if (isExit) {
            cc.loader.load(absolutePath, function (err, texture) {
                if (err !== undefined) {
                    cc.error("Load header img error: " + err);
                    return;
                }
                self.head.spriteFrame = new cc.SpriteFrame(texture);
            });
        } else {
            BK.MQQ.Account.getHeadEx(GameStatusInfo.openId, function (oId, imgPath) {
                cc.log("openId:" + oId + " imgPath:" + imgPath);
                var image = new Image();
                image.onload = function () {
                    var tex = new cc.Texture2D();
                    tex.initWithElement(image);
                    self.head.spriteFrame = new cc.SpriteFrame(tex);
                }
                image.src = imgPath;
            });
        }
    },

    /**
     * 获取昵称
     */
    getNick () {
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            // getNick(openID, callBack)
            BK.MQQ.Account.getNick(GameStatusInfo.openId, (openId, nick) => {
                this.nick.string = nick;
            });
        }
    },
});