cc.Class({
    extends: cc.Component,

    properties: {
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        }
    },

    dynamicCreate () {
        if (this.dragonBone.dragonAtlasAsset) {
            return;
        }
        cc.resources.load('dragonBones/NewDragonTest', dragonBones.DragonBonesAsset, (err, res) => {
            if (err) cc.error(err);
            this.dragonBone.dragonAsset = res;
            cc.resources.load('dragonBones/texture', dragonBones.DragonBonesAtlasAsset, this.onComplete.bind(this));
        });
    },

    onComplete (err, res) {
        if (err) cc.error(err);
        this.dragonBone.dragonAtlasAsset = res;
        this.dragonBone.armatureName = 'armatureName';
        this.dragonBone.playAnimation('stand', 0);
    }
});
