cc.Class({
    extends: cc.Component,

    properties: {
        reporter: {
            default: null,
            type: cc.ENode
        }
    },

    // use this for initialization
    onLoad: function () {
        // You can also register event listener using the method below
        // this.buttonLeft.getComponent(cc.EButton).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnLeftClicked, this);
        // this.buttonRight.getComponent(cc.EButton).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnRightClicked, this);
    },

    onBtnLeftClicked: function() {
        console.log('Left button clicked!');
        this.reporter.getComponent(cc.ELabel).string = 'Left button clicked!';
    },

    onBtnRightClicked: function() {
        console.log('Right button clicked!');
        this.reporter.getComponent(cc.ELabel).string = 'Right button clicked!';
    }
});
