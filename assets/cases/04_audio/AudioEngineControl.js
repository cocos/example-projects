cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            url: cc.AudioClip,
            default: null
        },
        
        label: {
            type: cc.Label,
            default: null
        }
    },

    onLoad: function () {
        this.maxNum = cc.audioEngine.getMaxAudioInstance();
        this.audioPool = [];
        
        // check deprecated
        ['playMusic', 'playEffect'].forEach(function (name) {
            if (!cc.audioEngine[name]) {
                cc.warn('.' + name + ' is not found!');
            }
        });
    },

    removeAudio: function (id) {
        var idx = this.audioPool.indexOf(id);
        if (idx > -1) {
            this.audioPool.splice(idx, 1);
        }
        this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;
    },

    play: function () {
        if (!this.audio || this.audioPool.length === this.maxNum) return;
        var id = cc.audioEngine.play(this.audio, false, 1);
        this.audioPool.push(id);
        this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;

        // set finish callback
        cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
    },
    
    stopAll: function () {
        if (!this.audio) return;
        cc.audioEngine.stopAll();
        this.audioPool = [];
        this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;
    },
    
    pauseAll: function () {
        if (!this.audio) return;
        cc.audioEngine.pauseAll();
    },
    
    resumeAll: function () {
        if (!this.audio) return;
        cc.audioEngine.resumeAll();
    },
});
