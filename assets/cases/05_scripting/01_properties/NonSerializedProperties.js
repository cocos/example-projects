cc.Class({
    extends: cc.Component,

    properties: {
        myNumber: 10,
        myNonSerializedNumber: {
            default: 0,
            visible: false
        },
        labelNum1: {
            default: null,
            type: cc.Label
        },
        labelNum2: {
            default: null,
            type: cc.Label
        }        
    },

    // use this for initialization
    onLoad: function () {
        this.myNumber += 1;
        this.myNonSerializedNumber += 1;
        this.labelNum1.string = this.myNumber.toString();
        this.labelNum2.string = this.myNonSerializedNumber.toString();
    },

    // called every frame
    update: function (dt) {

    },
});
