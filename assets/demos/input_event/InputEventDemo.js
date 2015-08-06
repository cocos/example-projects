var InputEventDemo = Fire.Class({
    extends: Fire.Behavior,
    onLoad: function() {
        setResolution();
        this.textKeycode = getNodeByName('keycode');
        this.textKeyname = getNodeByName('key_name');
        this.textTouchInfo = getNodeByName('touchInfo');
        this.registerInputEvent();
    },
    registerInputEvent: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                // Fire.log(keyCode);
                self.textKeycode.setString("keycode: " + keyCode);
                self.textKeyname.setString("key name: " + Editor.KeyCode(keyCode));
            }
        }, self);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function (touch, event) {
                // Fire.log('touched!');
                self.textTouchInfo.setString("touch at: (" + Math.floor(touch.getLocationX()) + ", " + Math.floor(touch.getLocationY()) + ")");
            }
        }, self);

    }
});
