cc.Class({
    extends: cc.Component,

    properties: {
        jumper: {
            default: null,
            type: cc.Node
        },
        colorNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.squashAction = cc.scaleTo(0.2, 1, 0.6);
        this.stretchAction = cc.scaleTo(0.2, 1, 1.2);
        this.scaleBackAction = cc.scaleTo(0.1, 1, 1);
        this.moveUpAction = cc.moveBy(1, cc.p(0, 200)).easing(cc.easeCubicActionOut());
        this.moveDownAction = cc.moveBy(1, cc.p(0, -200)).easing(cc.easeCubicActionIn());
        var seq = cc.sequence(this.squashAction, this.stretchAction, 
            this.moveUpAction, this.scaleBackAction, this.moveDownAction, this.squashAction, this.scaleBackAction);
        // this is a temp api which will be combined to cc.Node
        this.jumper.runAction(seq);
        
        this.colorNode.runAction(cc.sequence(
            cc.tintTo(2, 255, 0, 0),
            cc.delayTime(0.5),
            cc.fadeOut(1),
            cc.delayTime(0.5),
            cc.fadeIn(1),
            cc.delayTime(0.5),
            cc.tintTo(2, 255, 255, 255)
        ).repeat(2));
    },
});
