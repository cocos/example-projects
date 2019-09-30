cc.Class({
    extends: cc.Component,

    toggle () {
        let shown = this.node.y < 0;
        let animation = this.getComponent(cc.Animation);
        animation.play(shown ? 'hide menu' : 'show menu');
    }
});
