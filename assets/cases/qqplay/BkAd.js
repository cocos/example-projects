/**
 * @author Javen 
 * @copyright 2018-09-26 15:53:52 javendev@126.com 
 * @description 广告测试
 */
let BKTools = require("BKTools");
var Global = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},
    btnClick(event, data) {
        BKTools.log("点击了>" + data);
        if (data == 'loadVideo') {
            //如果需要判断是否加载成功可以在封装的函数中添加回调
            BKTools.loadVideoAd();
        } else if (data == 'showVideo') {
            if (Global.videoHandle) {
                this.jumpVideoAd();
            } else {
                BKTools.log("无视频广告句柄");
                BKTools.loadVideoAd();
            }
        } else if (data == 'loadBanner') {
            BKTools.loadBannerAd();
        } else if (data == 'showBanner') {
            if (Global.bannerHandle) {
                this.showBannerAd();
            } else {
                BKTools.log("无条幅广告句柄");
                BKTools.loadBannerAd();
            }
        } else if (data == 'closeBanner') {
            BKTools.closeBannerAd();
        } else if (data == 'back') {
            cc.director.loadScene("QQPlay");
        }
    },
    jumpVideoAd() {
        BKTools.log("准备调起广告...");
        Global.videoHandle.jump();
        Global.videoHandle.setEventCallack(
            function (code, msg) {}.bind(this), //关闭游戏（不再使用不需要监听） 
            function (code, msg) {
                if (code == 0) {
                    BKTools.log("达到看广告时长要求，可以下发奖励 endVide code:" + code + " msg:" + msg); //达到看广告时长要求，可以下发奖励 
                } else {
                    BKTools.log("其他异常,比如播放视频是程序返回到后台");
                }
            }.bind(this),
            function (code, msg) {
                BKTools.log("关闭视频webview endVide code:" + code + " msg:" + msg); //关闭视频webview
            }.bind(this),
            function (code, msg) {
                BKTools.log("开始播放视频 startVide code:" + code + " msg:" + msg); //开始播放视频
            }.bind(this));
    },
    showBannerAd() {
        Global.bannerHandle.show(function (succCode, msg, handle) {
            if (succCode == 0) {
                BKTools.log("banner展示成功 home");
            } else {
                BKTools.log("banner展示失败home msg:" + msg);
            }
        });
    },
    start() {

    },

    // update (dt) {},
});