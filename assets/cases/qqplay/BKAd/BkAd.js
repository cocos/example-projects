/**
 * @origin Javen 
 * @description Advertisement Test
 * 
 *  QQ 厘米游戏相关文档链接
 *  https://hudong.qq.com/docs/engine/api-new/mqq/advertisement/intro.html
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _videoHandle: null,
        _bannerHandle: null,
        label: cc.Label
    },

    /**
     * 加载视频广告。你可以通过 data 传入 videoType 数据。
     */
    loadVideoAd (event, data) {
        let videoType = data;
        this._fetchVideoAd(videoType);
    },

    _fetchVideoAd (videoType) {
        if (!videoType) {
            videoType = 0;
        }
        this.label.string = "开始拉取视频广告: " + videoType;
        BK.Advertisement.fetchVideoAd(videoType, function (retCode, msg, handle) {
            this.label.string = "retCode:" + retCode + " msg:" + msg;
            // if successed
            if (retCode == 0) {
                this._videoHandle = handle;
            } else {
                this.label.string = "拉取视频广告失败 error:" + retCode + " msg:" + msg;
            }
        }.bind(this));
    },

    /**
     * 显示视频广告
     */
    showVideoAd () {
        if (!this._videoHandle) {
            this.label.string = "视频广告尚未加载";
            return;
        }
        
        this.label.string = "准备播放广告...";
        this._videoHandle.jump();
        this._videoHandle.setEventCallack(
            function (code, msg) {}.bind(this), //关闭游戏（不再使用不需要监听） 
            function (code, msg) {
                if (code == 0) {
                    this.label.string = "达到看广告时长要求，可以下发奖励 endVide code:" + code + " msg:" + msg; //达到看广告时长要求，可以下发奖励 
                } else {
                    this.label.string = "其他异常,比如播放视频是程序返回到后台";
                }
            }.bind(this),
            function (code, msg) {
                this.label.string = "关闭视频webview endVide code:" + code + " msg:" + msg; //关闭视频webview
            }.bind(this),
            function (code, msg) {
                this.label.string = "开始播放视频 startVide code:" + code + " msg:" + msg; //开始播放视频
            }.bind(this));
    },
    /**
     * 加载条幅广告
     */
    loadBannerAd () {
        BK.Advertisement.fetchBannerAd(function (retCode, msg, bannerHandle) {
            this.label.string = "retCode:" + retCode + " msg:" + msg;
            if (retCode == 0) {
                this._bannerHandle = bannerHandle;
                bannerHandle.onClickContent(function () {
                    this.label.string = "用户点击了落地页";
                }.bind(this));
                bannerHandle.onClickClose(function () {
                    this.label.string = "用户点击了X关闭广告";
                }.bind(this));
            } else {
                this.label.string = "fetchBannerAd failed. retCode:" + retCode;
            }
        }.bind(this));
    },
    /**
     * 播放条幅广告
     */
    showBannerAd () {
        if (!this._bannerHandle) {
            this.label.string = "尚未加载条幅广告";
            return;
        }

        this._bannerHandle.show(function (succCode, msg, handle) {
            if (succCode == 0) {
                this.label.string = "banner展示成功 home";
            } else {
                this.label.string = "banner展示失败home msg:" + msg;
            }
        }.bind(this));
    },
    /**
     * 关闭条幅广告
     */
    closeBannerAd() {
        if (this._bannerHandle) {
            this._bannerHandle.close();
            Global.bannerHandle = undefined;
            this.label.string = "条幅广告已关闭";
        }
    }
});