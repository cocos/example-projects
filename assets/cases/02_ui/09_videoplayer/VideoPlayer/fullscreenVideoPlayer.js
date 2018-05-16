cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: cc.VideoPlayer,
        title: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this._ready = false;
        this.videoPlayer.node.on('completed', function () {
            this.videoPlayer.node.removeFromParent();
        }, this);

        this.node.on('touchend', function () {
            this.videoPlayer.enabled = true;
        }, this);
    },

    videoPlayerEvent: function(sender, event) {
        if (event === cc.VideoPlayer.EventType.READY_TO_PLAY) {
            this._ready = true;
        }
        if (this._ready && event === cc.VideoPlayer.EventType.CLICKED) {
            this.videoPlayer.play();
        }
    }

});
