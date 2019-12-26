cc.Class({
    extends: cc.Component,

    properties: {
        grayMaterial: cc.Material,
        normalMaterial: cc.Material,
        sp0: sp.Skeleton,
        sp1: sp.Skeleton,
        sp2: sp.Skeleton,
        batchLabel: cc.Label,
        cacheLabel: cc.Label,
        matLabel: cc.Label,
        tintLabel: cc.Label,
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
        this.sp0.setMaterial(0, material);
        this.sp0.markForRender(true);

        this.sp1.setMaterial(0, material);
        this.sp1.markForRender(true);

        this.sp2.setMaterial(0, material);
        this.sp2.markForRender(true);
    },

    onBatch () {
        this.isBatch = !this.isBatch;
        let label = "batch";
        if (this.isBatch) label = "no batch";
        this.batchLabel.string = label;

        this.sp0.enableBatch = this.isBatch;
        this.sp1.enableBatch = this.isBatch;
        this.sp2.enableBatch = this.isBatch;
    },

    onCache () {
        this.isCache = !this.isCache;

        let label = "cache";
        if (this.isCache) label = "no cache";
        this.cacheLabel.string = label;

        let mode = dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE;
        if (!this.isCache) mode = dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME;
        this.sp0.setAnimationCacheMode(mode);
        this.sp1.setAnimationCacheMode(mode);
        this.sp2.setAnimationCacheMode(mode);
    },

    onTint () {
        this.isTint = !this.isTint;

        let label = "tint";
        if (this.isTint) label = "no tint";
        this.tintLabel.string = label;

        this.sp0.useTint = this.isTint;
        this.sp1.useTint = this.isTint;
        this.sp2.useTint = this.isTint;
    }
});
