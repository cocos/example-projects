cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            type: cc.AudioClip,
            default: null
        },

        label: {
            type: cc.Label,
            default: null
        }
    },

    _updateLabel () {
        this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;
    },

    onLoad () {
        this.maxNum = cc.audioEngine.getMaxAudioInstance();
        this.audioPool = [];
        this._updateLabel();

        // check deprecated
        ['playMusic', 'playEffect'].forEach(function (name) {
            if (!cc.audioEngine[name]) {
                cc.warn('.' + name + ' is not found!');
            }
        });
    },

    onDestroy () {
        cc.audioEngine.stopAll();
    },

    removeAudio (id) {
        var idx = this.audioPool.indexOf(id);
        if (idx > -1) {
            this.audioPool.splice(idx, 1);
        }
        this._updateLabel();
    },

    play () {
        if (!this.audio || this.audioPool.length === this.maxNum) return;
        var id = cc.audioEngine.play(this.audio, false, 1);
        this.audioPool.push(id);
        this._updateLabel();

        // set finish callback
        cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
    },

    stopAll () {
        cc.audioEngine.stopAll();
        this.audioPool = [];
        this._updateLabel();
    },

    pauseAll () {
        cc.audioEngine.pauseAll();
    },

    resumeAll () {
        cc.audioEngine.resumeAll();
    },
});
