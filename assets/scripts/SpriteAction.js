var SpriteAction = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        scaleBy: 1,
        moveBy: Fire.Vec2.zero,
        colorTo: Fire.Color.white
    },
    onLoad: function() {
        this.origColor = this.color;
        this.actionScale = cc.scaleBy(0.5, this.scaleBy);
        this.actionMove = cc.moveBy(0.5, this.moveBy);
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
    }
});
