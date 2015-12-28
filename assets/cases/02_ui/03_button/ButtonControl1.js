cc.Class({
    extends: cc.Component,

    properties: {
        buttonLeft: {
            default: null,
            type: cc.Button
        },
        buttonRight: {
            default: null,
            type: cc.Button
        },
        display: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        // You can also register event listener using the method below
        // this.buttonLeft.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnLeftClicked, this);
        // this.buttonRight.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnRightClicked, this);
    },

    onBtnLeftClicked: function() {
        console.log('Left button clicked!');
        this.display.string = 'Left button clicked!';
    },

    onBtnRightClicked: function() {
        console.log('Right button clicked!');
        this.display.string = 'Right button clicked!';
    },

    onBtnInScrollClicked: function(){
        console.log('Button in Scrollview clicked!');
        this.display.string = 'Button in ScrollView clicked!';
    }
});
