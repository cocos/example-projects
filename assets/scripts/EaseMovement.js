var EaseMovement = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        _runnerAsset: {
            default: "",
            url: Runtime.SpriteAtlas
        },
        useEase: false
    },
    onLoad: function() {
        this.jumpWithoutEase = null;
        this.jumpWithEase = null;
        setResolution();
        if (this._runnerAsset) {
            cc.spriteFrameCache.addSpriteFrames(this._runnerAsset);
        }
        this.registerActions();
        if (this.useEase) {
            Fire.log("ease");
            this.runAction(cc.repeatForever(this.jumpWithEase));
        } else {
            Fire.log("no ease");
            this.runAction(cc.repeatForever(this.jumpWithoutEase));
        }
    },
    registerActions: function() {
        // init jump animation
        var jumpAnim = createAnimation("sheep_jump_", 5, 0.1);
        var downAnim = createAnimation("sheep_down_", 3, 0.1);
        // move action with jump
        var moveUp = cc.moveBy(0.6, Fire.v2(0, 150));
        var moveUpEase = cc.moveBy(0.6, Fire.v2(0, 150)).easing(cc.easeCubicActionOut());
        var moveDown = cc.moveBy(0.6, Fire.v2(0, -150));
        var moveDownEase = cc.moveBy(0.6, Fire.v2(0, -150)).easing(cc.easeCubicActionIn());
        var playDown = cc.animate(downAnim);
        // create a sequence with callback to run again
        var seq = new cc.Sequence(moveUp, moveDown, playDown);
        var seqEase = new cc.Sequence(moveUpEase, moveDownEase, playDown);
        this.jumpWithoutEase = cc.spawn(cc.animate(jumpAnim), seq);
        this.jumpWithEase = cc.spawn(cc.animate(jumpAnim), seqEase);
    }
});
