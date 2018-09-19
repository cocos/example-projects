cc.Class({
    extends: cc.Component,

    properties: {
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        }   
    },

    dynamicCreate () {
        cc.loader.loadRes('dragonBones/NewDragonTest', dragonBones.DragonBonesAsset, this.onComplete.bind(this));
        cc.loader.loadRes('dragonBones/texture', dragonBones.DragonBonesAtlasAsset, this.onComplete.bind(this));
    },

    onComplete (err, res) {
        if (err) cc.error(err);
        switch (res._name) {
            case 'NewDragonTest':
                this.dragonBone.dragonAsset = res;
                break;
            case 'texture':
                this.dragonBone.dragonAtlasAsset = res;
                this.dragonBone.armatureName = 'armatureName';
                this.dragonBone.playAnimation('stand', 0);
                this.dragonBone.timeScale = 1;
                break;
        }
    }
});
