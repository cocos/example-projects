cc.Class({
    extends: cc.Component,

    properties: {
        backgroud: cc.Sprite,
        content: cc.Sprite,
        customEffects: [cc.EffectAsset],
        contentTexture: {
            default: null,
            type: cc.Texture2D
        },
        gold: {
            default: null,
            type: cc.Texture2D
        },
        speed: 0.1,
        _effectIndex: 0,
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
        this.bgSpriteMaterial = this.backgroud.getMaterial(0);
        this.contentSpriteMaterial = this.content.getMaterial(0);
    },

    changeEffect () {
        this.time = 0;
        if (this._effectIndex >= this.customEffects.length) {
            this._effectIndex = 0;
        }
        this.newMaterial = new cc.Material();
        let newEffect = this.customEffects[this._effectIndex];
        this._effectIndex++;
        this.newMaterial.effectAsset = newEffect;
        this.newMaterial.name = newEffect.name;
        if (newEffect.name === "custom_material") {
            this.newMaterial.setProperty("texture", this.contentTexture);
            this.newMaterial.setProperty("texture2", this.gold);
        }
        this.content.setMaterial(0, this.newMaterial);
    },

    update (dt) {
        if (!this.bgSpriteMaterial || !this.contentSpriteMaterial) return;

        this.time += dt * this.speed;

        if (this.newMaterial) {
            this.newMaterial.setProperty('time', this.time)
        }
        else {
            this.contentSpriteMaterial.setProperty('time', this.time);
        }
        this.bgSpriteMaterial.setProperty('time', this.time * 10);
    },
});
