cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        sprite: cc.Sprite,
        imgUrl: "http://www.cocos.com/wp-content/themes/cocos/img/download1.png",
        txtUrl: "http://api.lololyrics.com/0.5/getLyric?artist=John%20Lennon&track=Imagine",
        _downloader: null,
        _imgTask: null,
        _txtTask: null,
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

        this._storagePath = jsb.fileUtils.getWritablePath() + '/example-cases/downloader/';
        this._inited = jsb.fileUtils.createDirectory(this._storagePath);
        if (!this._inited) {
            this.label.string = 'Failed to create storage path, downloader won\'t work correctly';
        }
    },

    onSucceed (task) {
        var atlasRelated = false;
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

    downloadTxt () {
        if (!this.txtUrl || !this._inited) {
            return;
        }
        this._txtTask = this._downloader.createDownloadFileTask(this.txtUrl, this._storagePath + 'imagine.txt');
    }
});
