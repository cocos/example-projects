cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: cc.VideoPlayer
    },

    start () {
        this._readyPlay = false;
    },

    videoPlayerEvent (sender, event) {
        if(event === cc.VideoPlayer.EventType.READY_TO_PLAY) {
            this._readyPlay = true;
            this.videoPlayer.play();
        }
        else if(event === cc.VideoPlayer.EventType.CLICKED) {
            this.videoPlayer.stop();
            this.videoPlayer.node.active = false;
        }
    },

    openVideoPlayer () {
        this.videoPlayer.node.active = true;
        if (this._readyPlay) {
            this.videoPlayer.play();
        }
    }
});
