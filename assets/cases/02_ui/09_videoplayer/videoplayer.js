cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: {
            default: null,
            type: cc.VideoPlayer
        },
        statusLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    play: function() {
        this.videoPlayer.play();
    },

    pause: function() {
        this.videoPlayer.pause();
    },

    toggleFullscreen: function() {
        this.videoPlayer.isFullscreen = true;
    },

    stop: function() {
        this.videoPlayer.stop();
    },

    keepRatioSwitch: function() {
        this.videoPlayer.keepAspectRatio = !this.videoPlayer.keepAspectRatio; 
    },

    onVideoPlayerEvent: function(sender, event) {
        this.statusLabel.string = event;
    },

    toggleVisibility: function() {
        this.videoPlayer.enabled = !this.videoPlayer.enabled;
    },

    playOnlineVideo: function() {
        this.videoPlayer.resourceType = 0;
        this.videoPlayer.url = "http://benchmark.cocos2d-x.org/cocosvideo.mp4";
        this.videoPlayer.play();
    }

});
