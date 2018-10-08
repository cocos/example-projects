cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.Button,
    },
    
    onInteractable (event) {
        this.btn.interactable = event.isChecked;
    },

    onColorTransition (event) {
        this.btn.transition = cc.Button.Transition.COLOR;
    },

    onSpriteTransition (event) {
        this.btn.transition = cc.Button.Transition.SPRITE;
    },

    onScaleTransition (event) {
        this.btn.transition = cc.Button.Transition.SCALE;
    },
});
