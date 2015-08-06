var SheepAnimation = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        sheepAtlasAsset: {
            default: "",
            url: Runtime.SpriteAtlas
        }
    },
    onLoad: function() {
        this.runAnim = null;
        if (this.sheepAtlasAsset) {
            cc.spriteFrameCache.addSpriteFrames(this.sheepAtlasAsset);
        }
        var animationRun = createAnimation("sheep_run_", 4, 0.1);
        this.runAnim = cc.repeatForever(cc.animate(animationRun));
        this.runAction(this.runAnim);
    }
});
