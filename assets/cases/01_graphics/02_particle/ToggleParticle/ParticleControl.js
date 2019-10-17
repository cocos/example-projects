cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.ParticleSystem,
        particle2: cc.ParticleSystem,
        _playing: false
    },

    toggleParticlePlay: function() {
        var myParticle = this.particle;
        if (myParticle.particleCount > 0) { // check if particle has fully plaed
            myParticle.stopSystem(); // stop particle system
        } else {
            myParticle.resetSystem(); // restart particle system
        }
    },

    lateUpdate () {
        if (!this._playing) {
            this._playing = true;
            this.scheduleOnce(()=>{
                this.particle && this.particle.getComponent(cc.ParticleSystem).resetSystem();
                this.particle2 && this.particle2.getComponent(cc.ParticleSystem).resetSystem();
            });
        }
    }
});
