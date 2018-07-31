cc.Class({
    extends: cc.Component,

    properties: {
        sheepAnim: {
            default: null,
            type: cc.Animation
        }
    },

    // use this for initialization
    onLoad: function () {
        var anim = this.sheepAnim;
        this._playAnimCallback = function() {
            anim.play('sheep_jump');
        };
        this.scheduleOnce(this._playAnimCallback, 2);
    },

    // called every frame
    update: function (dt) {

    },
});
