cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Node,
        music: cc.AudioSource,
        slider_h: cc.Slider,
        slider_v: cc.Slider
    },

    onLoad () {
        this.slider_v.progress = 0.5;
        this.slider_h.progress = 0.5;
        this._updateImageOpacity(this.slider_v.progress);
        this._updateMusicVolume(this.slider_h.progress);
    },

    _updateImageOpacity (progress) {
        this.image.opacity = progress * 255;
    },

    _updateMusicVolume (progress) {
        this.music.volume = progress;
    },

    onSliderVEvent (sender, eventType) {
        this._updateImageOpacity(sender.progress);
    },

    onSliderHEvent (sender, eventType) {
        this._updateMusicVolume(sender.progress);
    }
});
