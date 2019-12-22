cc.Class({
    extends: cc.Component,

    properties: {
        grayMaterial: cc.Material,
        normalMaterial: cc.Material,
        db0: dragonBones.ArmatureDisplay,
        db1: dragonBones.ArmatureDisplay,
        db2: dragonBones.ArmatureDisplay,
        batchLabel: cc.Label,
        cacheLabel: cc.Label,
        matLabel: cc.Label,
    },

    onGray () {
        this.isGray = !this.isGray;

        let label = "gray";
        if (this.isGray) label = "normal";
        this.matLabel.string = label;

        let material = this.grayMaterial;
        if (!this.isGray) {
            material = this.normalMaterial;
        }
        this.db0.setMaterial(0, material);
        this.db0.markForRender(true);

        this.db1.setMaterial(0, material);
        this.db1.markForRender(true);

        this.db2.setMaterial(0, material);
        this.db2.markForRender(true);
    },

    onBatch () {
        this.isBatch = !this.isBatch;
        let label = "batch";
        if (this.isBatch) label = "no batch";
        this.batchLabel.string = label;

        this.db0.enableBatch = this.isBatch;
        this.db1.enableBatch = this.isBatch;
        this.db2.enableBatch = this.isBatch;
    },

    onCache () {
        this.isCache = !this.isCache;

        let label = "cache";
        if (this.isCache) label = "no cache";
        this.cacheLabel.string = label;

        let mode = dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE;
        if (!this.isCache) mode = dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME;
        this.db0.setAnimationCacheMode(mode);
        this.db1.setAnimationCacheMode(mode);
        this.db2.setAnimationCacheMode(mode);
    },
});
