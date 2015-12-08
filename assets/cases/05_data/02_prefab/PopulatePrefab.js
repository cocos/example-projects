cc.Class({
    extends: cc.Component,

    properties: {
        prefab: {
            default: null,
            type: cc.Prefab
        },
        numberToSpawn: 0
    },

    // use this for initialization
    onLoad: function () {
        this.randomRange = cc.p(400, 300);
    },

    getRandomPosition: function() {
        return cc.p(cc.random0To1() * this.randomRange.x, cc.random0To1() * this.randomRange.y);
    },

    // called every frame
    update: function (dt) {
        // console.log(this.getRandomPosition());
    },
});
