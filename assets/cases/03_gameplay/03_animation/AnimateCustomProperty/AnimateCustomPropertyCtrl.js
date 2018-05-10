cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        emissionRote: 0,
        num: 0,
        hpBar: cc.ProgressBar,
        particle: cc.ParticleSystem,
        score: cc.Label
    },

    update: function (dt) {
        this.hpBar.progress = this.hp;
        this.particle.emissionRate = this.emissionRote;
        this.score.string = Math.ceil(this.num);
    }
});
