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

    play: function () {
        if (!this.audio) return;
        var id = cc.audioEngine.play(this.audio, false, 1);
        this.audioPool.push(id);
        this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;

        // set finish callback
        cc.audioEngine.setFinishCallback(id, () => {
            this.audioPool.splice(i, 1);
            this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;
        });
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
