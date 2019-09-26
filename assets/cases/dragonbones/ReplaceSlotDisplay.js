cc.Class({
    extends: cc.Component,

    properties: {
        armatureDisplay:{
            type:dragonBones.ArmatureDisplay,
            default:null,
        },
        replaceArmatureDisplay:{
            type:dragonBones.ArmatureDisplay,
            default:null,
        }
    },

    start () {
        this.replaceArmatureDisplay.node.active = false;
        this._leftWeaponIndex = 0;
        this._rightDisplayIndex = 0;
        this._rightDisplayNames = ["weapon_1004_r", "weapon_1004d_r"];
        this._rightDisplayOffset = [{x:0,y:0}, {x:-60,y:100}];
    },

    left () {
        let armature = this.armatureDisplay.armature();
        let slot = armature.getSlot("weapon_hand_l");
        slot.displayIndex = slot.displayIndex == 0 ? 4 : 0;
    },

    right () {
        this._rightDisplayIndex++;
        this._rightDisplayIndex %= this._rightDisplayNames.length;
        let armature = this.armatureDisplay.armature();
        let slot = armature.getSlot("weapon_hand_r");
        const displayName = this._rightDisplayNames[this._rightDisplayIndex];
        let factory = dragonBones.CCFactory.getInstance();
        factory.replaceSlotDisplay(this.replaceArmatureDisplay.getArmatureKey(), "weapon", "weapon_r", displayName, slot);

        let offset = this._rightDisplayOffset[this._rightDisplayIndex];
        slot.parent.offset.x = offset.x;
        slot.parent.offset.y = offset.y;
        armature.invalidUpdate();
    },
});
