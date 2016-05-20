function pauseresume () {
    if (this.paused) {
        cc.director.getActionManager().resumeTarget(this);
    }
    else {
        cc.director.getActionManager().pauseTarget(this);
    }
    this.paused = !this.paused;
}

cc.Class({
    extends: cc.Component,

    properties: {
    },
    
    onLoad: function () {
        this.node.paused = false;
        this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
    },
    
    unuse: function () {
        this.node.off(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
    },
    
    reuse: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
    }
});
