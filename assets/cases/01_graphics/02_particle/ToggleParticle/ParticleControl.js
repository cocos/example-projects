cc.Class({
    extends: cc.Component,

    properties: {
        particle: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        // use space to toggle particle
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD, 
            onKeyPressed: function(keyCode, event) {
                if (keyCode === cc.KEY.space) {
                    self.toggleParticlePlay();
                }
            }
        }, self); 
    },

    toggleParticlePlay: function() {
        var myParticle = this.particle.getComponent(cc.ParticleSystem);
        if (myParticle.isFull()) { // check if particle has fully plaed
            myParticle.stopSystem(); // stop particle system
        } else {
            myParticle.resetSystem(); // restart particle system
        }
    }
});
