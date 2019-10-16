cc.Class({
    extends: cc.Component,

    properties: {
        motionStreak: cc.MotionStreak,
        newTexture: {
            default: null,
            type: cc.Texture2D
        }
    },

    onLoad: function () {
        this._changed = true;
        this.oldTexture = this.motionStreak.texture;
        this.animationCom = this.motionStreak.node.getComponent(cc.Animation);
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
    },

    lateUpdate () {
        if (!this.animationCom.getAnimationState("move_around").isPlaying) {
            this.animationCom.play();
        }
    },

    onDisable () {
        this.motionStreak.node.getComponent(cc.Animation).stop();
    }
});
