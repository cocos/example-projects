cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        var touchEvent = this.getComponent('TouchEvent');
        
        // Emit CUSTOM_EVENT to its listeners while touch end
        touchEvent._callback = (function () {
            this.node.emit('CUSTOM_EVENT');
        }).bind(this);
        
        var addButton = cc.find('Canvas/add');
        var cancelButton = cc.find('Canvas/cancel');
        
        function onCustomEvent (event) {
            this.runAction(cc.sequence(
                cc.scaleTo(0.5, 2, 1),
                cc.scaleTo(0.25, 1, 1)
            ));
        }
        
        this.node.on('CUSTOM_EVENT', onCustomEvent, addButton);
        this.node.on('CUSTOM_EVENT', onCustomEvent, cancelButton);
    },
});
