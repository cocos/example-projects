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

    update: function () {
        if (!this.label) return;
        for (var i=0; i<this.audioPool.length; i++) {
            var id = this.audioPool[i];
            var state = cc.audioEngine.getState(id);
            if (state < 0) {
                this.audioPool.splice(i, 1);
                i--;
            }
        }
        this.label.string = 'Instance: ' + this.audioPool.length + ' / ' + this.maxNum;
    },
    
    play: function () {
        if (!this.audio) return;
        var id = cc.audioEngine.play(this.audio, false, 1);
        this.audioPool.push(id);
    },
    
    stopAll: function () {
        if (!this.audio) return;
        cc.audioEngine.stopAll();
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
