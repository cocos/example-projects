cc.Class({
    extends: cc.Component,

    properties: {
        motionStreak: cc.MotionStreak,
        newTexture: cc.Texture2D,
        content: cc.Node,
        tips: cc.Node
    },

    onLoad: function () {
        if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) {
            this.tips.active = true;
            this.content.active = false;
            return;
        }
        this._changed = true;
        this.oldTexture = this.motionStreak.texture;
    },

    onClick: function () {
        if (this._changed) {
            this.setMotionStreak(2, 3, 20, this.newTexture);
        }
        else {
            this.setMotionStreak(0.5, 1, 30, this.oldTexture);
        }
        this._changed = !this._changed;
    },

    setMotionStreak: function (fadeTime, minSeg, stroke, texture) {
        this.motionStreak.fadeTime = fadeTime;
        this.motionStreak.minSeg = minSeg;
        this.motionStreak.stroke = stroke;
        this.motionStreak.texture = texture;
    }


});
