cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Sprite,
        speed: 0.1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable () {
        this.originState = cc.dynamicAtlasManager.enabled;
        cc.dynamicAtlasManager.enabled = false;
    },

    onDisable () {
        cc.dynamicAtlasManager.enabled = this.originState;
    },

    start () {
        this.time = 0;
    },

    update (dt) {
        if (!this.sprite) return;

        this.time += dt * this.speed;

        let material = this.sprite.getMaterial(0);
        material.setProperty('time', this.time);
    },
});
