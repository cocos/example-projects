var KeyboardInput = Fire.Class({
    extends: Fire.Behavior,
    properties: {
    },
    onLoad: function() {
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if (keyCode === cc.KEY.space) {
                    Fire.log("space pressed!");
                }
            }
        }, self);
    }
});
