cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Widget
        },
        tips: {
            default: null,
            type: cc.Label
        },
        alignOnceBtn: {
            default: [],
            type: cc.Button
        }
    },

    onLoad: function () {
        this.alignOnceTips = "";
        this._anim = this.target.getComponent(cc.Animation);
    },

    onClickAlignOnce_True: function (event) {
        this.alignOnceBtn[0].interactable = false;
        this.alignOnceBtn[1].interactable = true;
        this.updateInfo(true);
    },

    onClickAlignOnce_False: function (event) {
        this.alignOnceBtn[0].interactable = true;
        this.alignOnceBtn[1].interactable = false;
        this.updateInfo(false);
    },

    updateInfo: function (hasAlignOnce) {
        this.target.enabled = false;
        this.target.isAlignOnce = hasAlignOnce;
        this.target.enabled = true;
        this._anim.stop("alignOnce_move");
        this._anim.play("alignOnce_move");
        this.alignOnceTips = "isAlignOnce: " + hasAlignOnce;
    },

    update: function () {
        if(this.alignOnceTips !== "") {
            this.tips.string = this.alignOnceTips + ", Widget enabled: " + this.target.enabled;
        }
    }
});
