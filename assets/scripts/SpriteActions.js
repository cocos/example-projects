var SpriteActions = Fire.Class({
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
        this.registerInputEvent();
        if (this._runnerAsset) {
            cc.spriteFrameCache.addSpriteFrames(this._runnerAsset);
        }
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                Fire.log("Key with keycode " + Editor.KeyCode(keyCode) + " pressed");
            },
            onKeyReleased: function(keyCode, event){
                Fire.log("Key with keycode " + keyCode + " released");
            }
        }, self);
    },
    registerAnimations: function() {
        // init run animation
        this.runAnim = createAnimation("sheep_run_", 0.1);
        // init jump animation
        this.runAnim = createAnimation("sheep_jump_", 0.1);
    },
    dynamicCommand: function() {
        Fire.log("dynamic command!");
    },
    playRunning: function () {
        this.runningAction = new cc.RepeatForever(new cc.Animate(this.runAnim));
        this.runAction(self.runningAction);
    }
});
