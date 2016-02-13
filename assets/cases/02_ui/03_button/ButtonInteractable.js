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
        labelLeft: {
            default: null,
            type: cc.Label
        },
        labelRight: {
            default: null,
            type: cc.Label
        }
    },

    onBtnLeftClicked: function() {
        console.log('Left button clicked!');
        this.buttonLeft.interactable = false;
        this.buttonRight.interactable = true;
        
        this.updateInfo();
    },

    onBtnRightClicked: function() {
        console.log('Right button clicked!');
        this.buttonRight.interactable = false;
        this.buttonLeft.interactable = true;
        
        this.updateInfo();
    },
    
    updateInfo: function () {
        this.labelLeft.string = 'interactable: ' + this.buttonLeft.interactable;
        this.labelRight.string = 'interactable: ' + this.buttonRight.interactable;
    }
});
