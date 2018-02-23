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
        },
        currentTime: {
            default: null,
            type: cc.Label
        },
        totalTime: {
            default: null,
            type: cc.Label
        }
    },


    play: function() {
        this.videoPlayer.play();
    },

    pause: function() {
        this.videoPlayer.pause();
    },

    toggleFullscreen: function() {
        if (
            cc.sys.isBrowser &&
            cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ &&
            cc.sys.browserVersion <= 7.2 &&
            /Nexus 6/.test(navigator.userAgent)
        ) {
            return cc.log('May be crash, so prohibit full screen');
        }
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
        if (event === cc.VideoPlayer.EventType.META_LOADED) {
            this.totalTime.string = this.videoPlayer.getDuration().toFixed(2);
        } else if (event === cc.VideoPlayer.EventType.CLICKED) {
            if(this.videoPlayer.isPlaying()) {
                this.videoPlayer.pause();
            } else {
                this.videoPlayer.play();
            }
        }
    },

    toggleVisibility: function() {
        this.videoPlayer.enabled = !this.videoPlayer.enabled;
    },

    playOnlineVideo: function() {
        this.videoPlayer.resourceType = 0;
        this.videoPlayer.url = "http://benchmark.cocos2d-x.org/cocosvideo.mp4";
        this.videoPlayer.play();
    },

    update: function () {
        if (this.currentTime)
            this.currentTime.string = this.videoPlayer.currentTime.toFixed(2);
    }

});
