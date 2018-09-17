cc.Class({
    extends: cc.Component,

    properties: {
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        }   
    },

    start () {
        let dragonAsseturl = 'dragonBones/test';
        let altasUrl = 'dragonBones/testTexture';

        cc.loader.loadRes(dragonAsseturl, dragonBones.DragonBonesAsset, this.onComplete.bind(this));
        cc.loader.loadRes(altasUrl, dragonBones.DragonBonesAtlasAsset, this.onComplete.bind(this));
    },

    onComplete (err, res) {
        if (err) cc.error(err);
        switch (res._name) {
            case 'test':
                this.dragonBone.dragonAsset = res;
                break;
            case 'testTexture':
                this.dragonBone.dragonAtlasAsset = res;
                this.dragonBone.armatureName = 'armatureName';
                this.dragonBone.playAnimation('stand', 0);
                this.dragonBone.timeScale = 1;
                break;
        }
    }
});
