cc.Class({
    extends: cc.Component,

    properties: {
        playLabel: {
            default: null,
            type: cc.Label
        },

        pauseLabel: {
            default: null,
            type: cc.Label
        },

        stateLabel: {
            default: null,
            type: cc.Label
        },

        animation: {
            default: null,
            type: cc.Animation
        }
    },

    // use this for initialization
    onLoad: function () {
        var animation = this.animation;

        animation.on('play',      this.onPlay,        this);
        animation.on('stop',      this.onStop,        this);
        animation.on('lastframe', this.onLastFrame,   this);
        animation.on('finished',  this.onFinished,    this);
        animation.on('pause',     this.onPause,       this);
        animation.on('resume',    this.onResume,      this);
    },

    onPlayButtonClicked: function () {
        if (this.playLabel.string === 'play') {
            this.playLabel.string = 'stop';
            this.animation.play('linear');
        }
        else {
            this.playLabel.string = 'play';
            this.animation.stop('linear');
        }
    },

    onPauseButtonClicked: function () {
        if (this.pauseLabel.string === 'pause') {
            this.pauseLabel.string = 'resume';
            this.animation.pause('linear');
        }
        else {
            this.pauseLabel.string = 'pause';
            this.animation.resume('linear');
        }
    },

    onPlay: function () {
        cc.log('onPlay');
        this.stateLabel.string = 'onPlay';
    },

    onStop: function () {
        cc.log('onStop');
        this.stateLabel.string = 'onStop';
        this.playLabel.string = 'play';
    },

    onLastFrame: function () {
        cc.log('onLastFrame');
        this.stateLabel.string = 'onLastFrame';
    },

    onFinished: function () {
        cc.log('onFinished');
        this.stateLabel.string = 'onFinished';
    },

    onPause: function () {
        cc.log('onPause');
        this.stateLabel.string = 'onPause';
    },

    onResume: function () {
        cc.log('onResume');
        this.stateLabel.string = 'onResume';
    }
});
