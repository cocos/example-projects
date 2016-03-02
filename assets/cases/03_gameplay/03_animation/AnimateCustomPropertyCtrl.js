cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
        emissionRote: 0,
        num: 0,
        hpBar: {
            default: null,
            type: cc.ProgressBar
        },
        particle: {
            default: null,
            type: cc.ParticleSystem
        },
        score: {
            default: null,
            type: cc.Label
        }
    },

    update: function (dt) {
        this.hpBar.progress = this.hp;
        this.particle.emissionRate = this.emissionRote;
        this.score.string = Math.ceil(this.num);
    }
});
