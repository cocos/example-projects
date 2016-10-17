cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: cc.VideoPlayer,
        title: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
    },

    videoPlayerEvent: function(sender, event) {
        if(event === cc.VideoPlayer.EventType.READY_TO_PLAY) {
            this.videoPlayer.play();
        } else if(event === cc.VideoPlayer.EventType.CLICKED) {
            this.videoPlayer.node.removeFromParent();
            this.title.enabled = true;
        }
    }

});
