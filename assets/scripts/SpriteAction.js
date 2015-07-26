var SpriteAction = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        scaleBy: 1,
        moveBy: Fire.Vec2.zero,
        colorTo: Fire.Color.white
    },
    onLoad: function() {
        this.actionScale = cc.scaleBy(0.5, this.scaleBy);
        this.actionMove = cc.moveBy(0.5, this.moveBy);
        this.actionTint = cc.tintTo(0.5, convertColor(this.colorTo.r),
            convertColor(this.colorTo.g), convertColor(this.colorTo.b));
        this.actionTintBack = cc.tintTo(0.5, 255, 255, 255);
        this.isTinted = false;
        this.registerInputEvent();
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if (Editor.KeyCode(keyCode) === 'a') {
                    self.toggleScale();
                }
                if (Editor.KeyCode(keyCode) === 'b') {
                    self.moveAround();
                }
                if (Editor.KeyCode(keyCode) === 'c') {
                    self.tintColor();
                }
            }
        }, self);
    },
    toggleScale: function() {
        if (this.scaleX >= 1) {
            this.runAction(this.actionScale.reverse());
        } else {
            this.runAction(this.actionScale);
        }
    },
    moveAround: function() {
        if (this.x >= 500) {
            this.runAction(this.actionMove);
        } else {
            this.runAction(this.actionMove.reverse());
        }
    },
    tintColor: function() {
        if (this.isTinted) {
            this.runAction(this.actionTintBack);
            this.isTinted = false;
        } else {
            this.runAction(this.actionTint);
            this.isTinted = true;
        }
    }
});
