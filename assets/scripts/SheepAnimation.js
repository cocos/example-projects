var SheepAnimation = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        _runnerAsset: {
            default: "",
            url: Runtime.SpriteAtlas
        }
    },
    onLoad: function() {
        this.runAnim = null;
        if (this._runnerAsset) {
            cc.spriteFrameCache.addSpriteFrames(this._runnerAsset);
        }
        var animationRun = createAnimation("sheep_run_", 4, 0.1);
        this.runAnim = cc.repeatForever(cc.animate(animationRun));
        this.runAction(this.runAnim);
    }
});
