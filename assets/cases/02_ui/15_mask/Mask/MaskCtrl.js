cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Mask,
        slider: cc.Slider,
        label: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.slider.progress = this.mask.alphaThreshold;
    },

    update: function (dt) {
        this.mask.alphaThreshold = this.slider.progress;
        this.label.string = this.slider.progress.toFixed(1);
    }
});
