cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        
        label: {
            type: cc.Label,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        // cc.audioEngine.setMaxWebAudioSize(1024*10);
    },
    
    update: function () {
        if (!this.label) {
            return;
        }
        var audio = this.audioSource;
        this.label.string = audio.getCurrentTime().toFixed(1) + ' s / ' + audio.getDuration().toFixed(1) + ' s';
    },
    
    play: function () {
        this.audioSource.play();
    },
    
    pause: function () {
        this.audioSource.pause();
    },
    
    stop: function () {
        this.audioSource.stop();
    },
    
    resume: function () {
        this.audioSource.resume();
    }
});
