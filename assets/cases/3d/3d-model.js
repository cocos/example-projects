cc.Class({
    extends: cc.Component,

    properties: {
        playingIndex: 0,
    },

    start () {
        this.playNextAnimation();
    },

    playNextAnimation () {
        let animation = this.getComponent(cc.Animation);
        let clips = animation.getClips();
        if (!clips[this.playingIndex]) {
            this.playingIndex = 0;
        }

        animation.play(clips[this.playingIndex].name);
        this.playingIndex++;
    }

});
