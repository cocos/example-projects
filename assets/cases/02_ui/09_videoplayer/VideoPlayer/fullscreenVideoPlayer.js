cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: cc.VideoPlayer
    },

    videoPlayerEvent (sender, event) {
        if(event === cc.VideoPlayer.EventType.CLICKED) {
            this.videoPlayer.stop();
            this.videoPlayer.enabled = false;
        }
    },

    openVideoPlayer () {
        this.videoPlayer.enabled = true;
        this.videoPlayer.play();
    }
});
