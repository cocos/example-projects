const i18n = require('i18n');
const TipsManager = require('TipsManager');

function getStatus (event) {
    switch (event) {
        case cc.VideoPlayer.EventType.PLAYING:
            return 'PLAYING';
        case cc.VideoPlayer.EventType.PAUSED:
            return 'PAUSED';
        case cc.VideoPlayer.EventType.STOPPED:
            return 'STOPPED';
        case cc.VideoPlayer.EventType.COMPLETED:
            return 'COMPLETED';
        case cc.VideoPlayer.EventType.META_LOADED:
            return 'META_LOADED';
        case cc.VideoPlayer.EventType.CLICKED:
            return 'CLICKED';
        case cc.VideoPlayer.EventType.READY_TO_PLAY:
            return 'READY_TO_PLAY';
        default:
            return 'NONE';
    }
};

cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: cc.VideoPlayer,
        statusLabel: cc.Label,
        currentTime: cc.Label,
        resSwitchBtnLabel: cc.Label,
        controlButtons: cc.Node,
        keep_Ratio_Switch: cc.Node,
        playVideoArea: cc.Node,
        visibility: cc.Label,
    },

    start () {
        TipsManager.init();
        this.controlButtons.active = false;
        this.keep_Ratio_Switch.active = !(cc.sys.isBrowser || cc.sys.platform === cc.sys.WECHAT_GAME);
        this.playVideoArea.on('touchend', () => {
            this.videoPlayer.play();
        });
    },

    onVideoPlayerEvent (sender, event) {
        this.statusLabel.string = 'Status: ' + getStatus(event);
        if (event === cc.VideoPlayer.EventType.CLICKED) {
            if (this.videoPlayer.isPlaying()) {
                this.videoPlayer.pause();
            } else {
                this.videoPlayer.play();
            }
        }
        else if (event === cc.VideoPlayer.EventType.READY_TO_PLAY || event === cc.VideoPlayer.EventType.META_LOADED) {
            this.controlButtons.active = true;
            this.playVideoArea.active = true;
        }
        else if (event === cc.VideoPlayer.EventType.PLAYING) {
            this.playVideoArea.active = false;
        }
    },

    toggleFullscreen () {
        if (
            cc.sys.isBrowser &&
            cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ &&
            cc.sys.browserVersion <= 7.2 &&
            /Nexus 6/.test(navigator.userAgent)
        ) {
            TipsManager.createTips(i18n.t('cases/02_ui/09_videoplayer/videoPlayer.nonsupport_fullscreen'));
            return cc.log('May be crash, so prohibit full screen');
        }
        this.videoPlayer.isFullscreen = true;
    },

    toggleVisibility (event) {
        this.videoPlayer.node.active = !this.videoPlayer.node.active;
        this.playVideoArea.active = this.videoPlayer.node.active;
        this.visibility.string = 'Visibility: ' + this.videoPlayer.node.active;
    },

    keepRatioSwitch () {
        this.videoPlayer.keepAspectRatio = !this.videoPlayer.keepAspectRatio;
    },

    switchOnlineVideo () {
        this.videoPlayer.remoteURL = 'https://www.w3school.com.cn/i/movie.mp4';
        this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
        this.playVideoArea.active = true;
    },

    switchLoaclVide () {
        this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.LOCAL;
        this.playVideoArea.active = true;
    },

    play () {
        this.videoPlayer.play();
        this.playVideoArea.active = false;
    },

    pause () {
        this.videoPlayer.pause();
    },

    stop () {
        this.videoPlayer.stop();
    },

    update () {
        if (this.currentTime && this.videoPlayer.currentTime >= 0) {
            this.currentTime.string = this.videoPlayer.currentTime.toFixed(2) + ' / ' + this.videoPlayer.getDuration().toFixed(2);
        }
    }

});
