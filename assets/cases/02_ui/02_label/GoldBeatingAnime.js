cc.Class({
    extends: cc.Component,

    properties: {
        speed: 50,
        gold_label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.curGold = 0;
        this.curIndex = 0;
    },

    update: function (dt) {
        this.curIndex += dt * this.speed;
        if (this.curIndex > 10) {
            this.curIndex = 0;
            this.curGold++;
            this.gold_label.string += this.curGold;
            if (this.gold_label.string.length > 10) {
                this.gold_label.string = "0";
                this.curGold = 0;
            }
        }
    }
});
