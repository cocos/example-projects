cc.Class({
    extends: cc.Component,

    properties: {
        mySerializedText: '',
        myNonSerializedText: {
            default: '',
            visible: false
        },
        label1: {
            default: null,
            type: cc.Label
        },
        label2: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.myNonSerializedText = 'Can only set value in script';
        this.label1.string = this.mySerializedText;
        this.label2.string = this.myNonSerializedText;
    },
});
