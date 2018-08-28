cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        sprite: cc.Sprite,
        audioControlBtns: cc.Node,
        audioBtnLabel: cc.Label,
        imgUrl: "http://www.cocos.com/wp-content/themes/cocos/img/download1.png",
        txtUrl: "https://raw.githubusercontent.com/cocos-creator/tutorial-dark-slash/master/LICENSE.md",
        tempImgUrl: "http://www.cocos.com/wp-content/uploads/2018/03/%E9%BB%98%E8%AE%A4%E6%A0%87%E9%A2%98_%E5%85%AC%E4%BC%97%E5%8F%B7%E5%BA%95%E9%83%A8%E4%BA%8C%E7%BB%B4%E7%A0%81_2018.03.08.png",
        audioUrl: "http://tools.itharbors.com/christmas/res/sounds/ss.mp3",
        _downloader: null,
        _imgTask: null,
        _txtTask: null,
        _audioTask: null,
        _audioPlayer: null,
        _storagePath: "",
        _inited: false
    },

    // use this for initialization
    onLoad () {
        if (!CC_JSB) {
            this.label.string = 'Downloader is a NATIVE ONLY feature.';
            return;
        }

        this._downloader = new jsb.Downloader();
        this._downloader.setOnFileTaskSuccess(this.onSucceed.bind(this));
        this._downloader.setOnTaskProgress(this.onProgress.bind(this));
        this._downloader.setOnTaskError(this.onError.bind(this));
        this._audioPlayer = this.node.getComponent('AudioCtrl');
        this._storagePath = jsb.fileUtils.getWritablePath() + '/example-cases/downloader/';
        this._inited = jsb.fileUtils.createDirectory(this._storagePath);
        if (!this._inited) {
            this.label.string = 'Failed to create storage path, downloader won\'t work correctly';
        }
    },

    onSucceed (task) {
        switch (task.requestURL) {
        case this.imgUrl:
            var self = this;
            cc.loader.load(task.storagePath, function (err, tex) {
                var spriteFrame = new cc.SpriteFrame(tex);
                self.sprite.spriteFrame = spriteFrame;

                self.sprite.node.active = true;
                self.label.node.active = false;
            });
            break;
        case this.txtUrl:
            var content = jsb.fileUtils.getStringFromFile(task.storagePath);
            this.sprite.node.active = false;
            this.label.node.active = true;
            this.label.string = content.substr(0, 350);
            break;
        case this.audioUrl:
            this.audioBtnLabel.string = 'Show';
            this.label.string = 'Audio Download Complete.';
            let _self = this;
            cc.loader.load(task.storagePath, function (err, audio) {
                _self._audioPlayer.setAudioTask(audio);
            });
        }
    },

    onProgress (task, bytesReceived, totalBytesReceived, totalBytesExpected) {

    },

    onError (task, errorCode, errorCodeInternal, errorStr) {
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = 'Failed to download file (' + task.requestURL + '): ' + errorStr + '(' + errorCode + ')';
    },

    downloadImg () {
        if (!this.imgUrl || !this._inited) {
            return;
        }
        this._imgTask = this._downloader.createDownloadFileTask(this.imgUrl, this._storagePath + 'download1.png');
    },

    loadImg () {
        if (!this.tempImgUrl || !this._inited) {
            return;
        }
        var self = this;
        cc.loader.load(this.tempImgUrl, function (error, tex) {
            if (error) {
                console.log("Load remote image failed: " + error);
            }
            else {
                var spriteFrame = new cc.SpriteFrame(tex);
                self.sprite.spriteFrame = spriteFrame;

                self.sprite.node.active = true;
                self.label.node.active = false;
            }
        });
    },

    downloadTxt () {
        if (!this.txtUrl || !this._inited) {
            return;
        }
        this._txtTask = this._downloader.createDownloadFileTask(this.txtUrl, this._storagePath + 'imagine.txt');
    },

    downloadAudio () {
        if (!this.audioUrl || !this._inited) {
            return;
        }
        if (!this._audioTask) {
            this._audioTask = this._downloader.createDownloadFileTask(this.audioUrl, this._storagePath + 'audioTest.mp3');
        }
        else {
            this.controlAudioBtns();
        }
    },

    controlAudioBtns () {
        this.audioControlBtns.active = !this.audioControlBtns.active;
        console.log(this.audioControlBtns.active);
        this.audioBtnLabel.string = this.audioControlBtns.active ? 'Hide' : 'Show';
    },

    onDisable () {
        this._audioPlayer.stopAudio();
    }

});
