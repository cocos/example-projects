cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
    },

    toggleParticlePlay: function() {
        var myParticle = this.particle;
        if (myParticle.particleCount > 0) { // check if particle has fully plaed
            myParticle.stopSystem(); // stop particle system
        } else {
            myParticle.resetSystem(); // restart particle system
        }
    }
});
