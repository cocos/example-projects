cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: {
            default: null,
            type: cc.Label
        },
        _audioTask: null,
        _audioID: null,
    },

    setAudioTask (audio) {
        this._audioTask = audio;
    },

    playAudio () {
        // return current audio object
        this._audioID = cc.audioEngine.play(this._audioTask, false);
    },

    stopAudio () {
        cc.audioEngine.stop(this._audioID);
    },

    pauseAudio () {
        cc.audioEngine.pause(this._audioID);
    },

    resumeAudio () {
        cc.audioEngine.resume(this._audioID);
    },

    stopAllAudio () {
        cc.audioEngine.stopAll();
    },

    pauseAllAudio () {
        cc.audioEngine.pauseAll();
    },

    resumeAllAudio () {
        cc.audioEngine.resumeAll();
    },

    currentTime () {
        if (!this._audioTask || this._audioID === null) {
            return;
        }
        let currentTime = cc.audioEngine.getCurrentTime(this._audioID).toFixed(1);
        let durationTime = cc.audioEngine.getDuration(this._audioID).toFixed(1);
        this.timeLabel.string = `${currentTime} s / ${durationTime} s`;
    },
});
