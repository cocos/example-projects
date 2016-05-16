const i18n = require('i18n');


//
// Tips：
// 找到的下载图片网址过长，可以忽略。
// 本教程主要还是体现如何使用Loader的进度条。
//

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },

        progressTips: {
            default: null,
            type: cc.Label
        },

        laodBg: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this._urls = [
            // Raw Asset, need extension
            {
                id: "ding.wav",
                url: cc.url.raw("resources/audio/ding.wav")
            },
            {
                id: "cheering.wav",
                url: cc.url.raw("resources/audio/cheering.wav")
            },
            {
                id: "music_logo.mp3",
                url: cc.url.raw("resources/audio/music_logo.mp3")
            },
            {
                id: "audio.mp3",
                url: cc.url.raw("resources/test assets/audio.mp3")
            },
            {
                id: "font.png",
                url: cc.url.raw("resources/test assets/font.png")
            },
            {
                id: "mikado_outline_shadow.png",
                url: cc.url.raw("resources/font/mikado_outline_shadow.png")
            },
            {
                id: "enligsh-chinese.png",
                url: cc.url.raw("resources/font/enligsh-chinese.png")
            }
        ];

        this.progressBar.progress = 0;
        cc.loader.releaseAll();
        cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
    },

    _progressCallback: function (completedCount, totalCount, res) {
        this.progress = completedCount / totalCount;
        this.resource = res;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
    },

    _completeCallback: function (error, res) {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.resource) {
            return;
        }
        var progress = this.progressBar.progress;
        if (progress >= 1) {
            this.progressTips.string = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1");
            this.laodBg.active = false;
            this.progressBar.node.active = false;
            this.enabled = false;
            return;
        }
        if (progress < this.progress) {
            progress += dt;
        }
        this.progressBar.progress = progress;
        this.progressTips.string = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2")+ this.resource.id + " (" + this.completedCount + "/" + this.totalCount + ")";
    }
});
