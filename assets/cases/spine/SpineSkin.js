cc.Class({
    extends: cc.Component,

    properties: {
        goblin:{
            type:sp.Skeleton,
            default:null,
        },
        goblingirl:{
            type:sp.Skeleton,
            default:null,
        }
    },

    start () {
        this._skinIdx = 0;
        this.parts = ["left-arm", "left-hand", "left-shoulder"];
    },

    change () {
        if (this._skinIdx == 0) {
            this._skinIdx = 1;
            for (let i = 0; i < this.parts.length; i++) {
                let goblin = this.goblin.findSlot(this.parts[i]);
                let goblingirl = this.goblingirl.findSlot(this.parts[i]);
                let attachment = goblingirl.getAttachment();
                goblin.setAttachment(attachment);
            }
        } else if (this._skinIdx == 1) {
            this._skinIdx = 0;
            this.goblin.setSkin('goblin');
            this.goblin.setSlotsToSetupPose();
        }
    }
});
