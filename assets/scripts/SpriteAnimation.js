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
        setResolution();
        this.registerInputEvent();
        if (this._runnerAsset) {
            cc.spriteFrameCache.addSpriteFrames(this._runnerAsset);
        }
        this.registerAnimations();
        this.playRunning();
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if (keyCode === cc.KEY.space) {
                    self.playJumping();
                }
            }
        }, self);
    },
    registerAnimations: function() {
        // init run animation
        var animationRun = createAnimation("sheep_run_", 4, 0.1);
        this.runAnim = new cc.RepeatForever(new cc.Animate(animationRun));
        // move action with run
        this.moveAction = cc.moveBy(4, Fire.v2(-700, 0));
        // init jump animation
        this.jumpAnim = createAnimation("sheep_jump_", 5, 0.1);
        this.downAnim = createAnimation("sheep_down_", 3, 0.1);
        // move action with jump
        var moveUp = new cc.MoveBy(0.5, Fire.v2(0, 120));
        var moveDown = new cc.MoveBy(0.5, Fire.v2(0, -120));
        var playDown = new cc.Animate(this.downAnim);
        // create a sequence with callback to run again
        var seq = new cc.Sequence(moveUp, moveDown, playDown, cc.callFunc(this.playRunning, this));
        this.jumpingAction = new cc.Spawn(new cc.Animate(this.jumpAnim), seq);
    },
    playRunning: function () {
        if (this.getNumberOfRunningActions() > 0) {
            this.stopAllActions();
        }
        this.runAction(this.runAnim);
        this.runAction(this.moveAction);
    },
    playJumping: function() {
        this.stopAllActions();
        this.runAction(this.jumpingAction);
    }
});
