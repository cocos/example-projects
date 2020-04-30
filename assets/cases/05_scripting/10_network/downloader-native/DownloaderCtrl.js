cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        sprite: cc.Sprite,
        imgUrl: "https://download.cocos.com/test-case/logo.png",
        txtUrl: "https://download.cocos.com/test-case/LICENSE.md",
        tempImgUrl: "https://www.cocos.com/wp-content/uploads/2018/03/%E9%BB%98%E8%AE%A4%E6%A0%87%E9%A2%98_%E5%85%AC%E4%BC%97%E5%8F%B7%E5%BA%95%E9%83%A8%E4%BA%8C%E7%BB%B4%E7%A0%81_2018.03.08.png",
        audioUrl: "https://download.cocos.com/test-case/ss.mp3",
        _downloader: null,
        _imgTask: null,
        _txtTask: null,
        _audioTask: null,
        _storagePath: "",
        _inited: false,
        _downloading: false
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
        this._storagePath = jsb.fileUtils.getWritablePath() + '/example-cases/downloader/';
        this._inited = jsb.fileUtils.createDirectory(this._storagePath);
        if (!this._inited) {
            this.label.string = 'Failed to create storage path, downloader won\'t work correctly';
        }
        this._audioID = -1;
    },

    onSucceed (task) {
        if (this._audioID !== -1) {
            cc.audioEngine.stop(this._audioID);
        }
        switch (task.requestURL) {
        case this.imgUrl:
            cc.assetManager.loadRemote(task.storagePath, (err, tex) => {
                this.sprite.spriteFrame = new cc.SpriteFrame(tex);
                this.sprite.node.active = true;
                this.label.node.active = false;
            });
            break;
        case this.txtUrl:
            let content = jsb.fileUtils.getStringFromFile(task.storagePath);
            this.sprite.node.active = false;
            this.label.node.active = true;
            this.label.string = content.substr(0, 350);
            break;
        case this.audioUrl:
            this.sprite.node.active = false;
            this.label.node.active = true;
            this.label.string = 'Audio Download Complete.';
            cc.assetManager.loadRemote(task.storagePath, (err, clip) => {
                this._audioID = cc.audioEngine.play(clip);
            });
        }
        // download success
        this._downloading = false;
    },

    onProgress (task, bytesReceived, totalBytesReceived, totalBytesExpected) {

    },

    onError (task, errorCode, errorCodeInternal, errorStr) {
        this._downloading = false;
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = 'Failed to download file (' + task.requestURL + '): ' + errorStr + '(' + errorCode + ')';
    },

    downloadImg () {
        if (!this.imgUrl || !this._inited || this._downloading) {
            return;
        }
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = 'Downloading image';
        this._imgTask = this._downloader.createDownloadFileTask(this.imgUrl, this._storagePath + 'download1.png');
        this._downloading = true;
    },

    loadImg () {
        if (!this.tempImgUrl || !this._inited || this._downloading) {
            return;
        }

        this._downloading = true;
        this.label.string = 'Downloading image (mem)';
        cc.assetManager.loadRemote(this.tempImgUrl, (error, tex) => {
            this._downloading = false;
            if (error) {
                console.log("Load remote image failed: " + error);
            }
            else {
                this.sprite.spriteFrame = new cc.SpriteFrame(tex);
                this.sprite.node.active = true;
                this.label.node.active = false;
                cc.audioEngine.stop(this._audioID);
            }
        });
    },

    downloadTxt () {
        if (!this.txtUrl || !this._inited || this._downloading) {
            return;
        }
        this.label.node.active = true;
        this.sprite.node.active = false;
        this.label.string = 'Downloading Text';
        this._downloading = true;
        this._txtTask = this._downloader.createDownloadFileTask(this.txtUrl, this._storagePath + 'imagine.txt');
    },

    downloadAudio () {
        if (!this.audioUrl || !this._inited || this._downloading) {
            return;
        }
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = 'Downloading Audio';
        if (this._audioID !== -1) {
            cc.audioEngine.stop(this._audioID);
        }
        this._downloading = true;
        this._audioTask = this._downloader.createDownloadFileTask(this.audioUrl, this._storagePath + 'audioTest.mp3');
    },

    onDisable () {
        cc.audioEngine.stop(this._audioID);
    }

});
