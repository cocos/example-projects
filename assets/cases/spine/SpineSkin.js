cc.Class({
    extends: cc.Component,

    properties: {
        skeleton:{
            type:sp.Skeleton,
            default:null,
        }
    },

    start () {
        this._skinIdx = 0;
        this.skinArr = ['goblin','goblingirl'];
        this.change();
    },

    change () {
        if (this._skinIdx == 0) this._skinIdx = 1;
        else if (this._skinIdx == 1) this._skinIdx = 0;
        this.skeleton.setSkin(this.skinArr[this._skinIdx]);
        this.skeleton.setSlotsToSetupPose();
    }
});
