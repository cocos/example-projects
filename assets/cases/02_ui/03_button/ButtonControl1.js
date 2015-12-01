cc.Class({
    extends: cc.Component,

    properties: {
        buttonLeft: {
            default: null,
            type: cc.ENode
        },
        buttonRight: {
            default: null,
            type: cc.ENode
        },
        reporter: {
            default: null,
            type: cc.ENode
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
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
    },

    // called every frame
    update: function (dt) {

    },
});
