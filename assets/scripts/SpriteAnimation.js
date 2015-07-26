var SpriteAnimation = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        _runnerAsset: {
            default: "",
            url: Runtime.SpriteAtlas
        }
    },
    onLoad: function() {
        this.runAnim = null;
        this.jumpAnim = null;
        this.downAnim = null;
        this.runningAction = null;
        this.jumpingAction = null;
        this.registerInputEvent();
        setResolution();
        if (this._runnerAsset) {
            cc.spriteFrameCache.addSpriteFrames(this._runnerAsset);
        }
        this.registerAnimations();
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if (Editor.KeyCode(keyCode) === 'a') {
                    self.playRunning();
                }
                if (Editor.KeyCode(keyCode) === 'b') {
                    self.playJumping();
                }
            }
        }, self);
    },
    registerAnimations: function() {
        // init run animation
        this.runAnim = createAnimation("sheep_run_", 4, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(this.runAnim));
        // init jump animation
        this.jumpAnim = createAnimation("sheep_jump_", 5, 0.1);
        this.jumpingAction = new cc.Animate(this.jumpAnim);
    },
    playRunning: function () {
        if (this.getNumberOfRunningActions() > 0) {
            this.stopAllActions();
        }
        this.runAction(this.runningAction);
    },
    playJumping: function() {
        this.stopAllActions();
        this.runAction(this.jumpingAction);
    }
});
