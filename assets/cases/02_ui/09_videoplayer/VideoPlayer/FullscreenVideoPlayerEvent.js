let videoPlayer = null;

cc.Class({
    extends: cc.Component,

    videoPlayerEvent (sender, event) {
        if (!videoPlayer) {
            videoPlayer = this.node.getComponent(cc.VideoPlayer);
        }
        if (event === cc.VideoPlayer.EventType.COMPLETED) {
            videoPlayer.isFullscreen = false;
            videoPlayer.node.removeFromParent();
            videoPlayer = null;
        }
    }
});
