cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.updateTimer = 0;
        this.updateInterval = 0.5;

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;

    },
});
