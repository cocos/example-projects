var KeyboardInput = Fire.Class({
    extends: Fire.Behavior,
    onLoad: function() {
        setResolution();
        this.textKeycode = getNodeByName('keycode');
        this.textKeyname = getNodeByName('key_name');
        this.registerInputEvent();
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                Fire.log(keyCode);
                self.textKeycode.setString("keycode: " + keyCode);
                self.textKeyname.setString("key name: " + Editor.KeyCode(keyCode));
            }
        }, self);
    }
});
