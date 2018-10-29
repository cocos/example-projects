/**
 * @author Javen 
 * @copyright 2018-09-25 21:51:14 javendev@126.com 
 * @description 获取用户图像
 */
let BKTools = require("BKTools");
cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Node,
            tooltip: "用户图像",
        },
        nick: {
            default: null,
            type: cc.Label
        }
    },

    getHead() {
        let self = this;
        let absolutePath = "GameSandBox://_head/" + GameStatusInfo.openId + ".jpg";
        let isExit = BK.FileUtil.isFileExist(absolutePath);
        cc.log(absolutePath + " is exit :" + isExit);
        //如果指定目录中存在此图像就直接显示否则从网络获取
        if (isExit) {
            cc.loader.load(absolutePath, function (err, texture) {
                if (err == null) {
                    self.head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        } else {
            BK.MQQ.Account.getHeadEx(GameStatusInfo.openId, function (oId, imgPath) {
                cc.log("openId:" + oId + " imgPath:" + imgPath);
                var image = new Image();
                image.onload = function () {
                    var tex = new cc.Texture2D();
                    tex.initWithElement(image);
                    tex.handleLoadedTexture();
                    self.head.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                }
                image.src = imgPath;
            });
        }
    },

    // onLoad () {},
    btn(event, data) {
        cc.log("点击了按钮>" + data);
        if (data == 'back') {
            cc.director.loadScene("QQPlay");
        } else {
            if (cc.sys.platform == cc.sys.QQ_PLAY) {
                this.getHead();
            } else {
                cc.log("请在QQ玩一玩平台中测试");
            }
        }
    },
    start() {
        let self = this;
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            BKTools.getNick(function (openId, nick) {
                self.nick.string = nick;
            });
        } else {
            this.nick.string = "Javen";
        }

    },

    // update (dt) {},
});