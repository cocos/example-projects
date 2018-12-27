
cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite
    },

    start () {
        this.getComponent(cc.Label).textKey = 'cases/subpackage2.loaded';
        cc.loader.loadRes('subpackage/Second/goldcoin', cc.SpriteFrame, (err, sp) => {
            if (err) {
                return console.log(err);
            }
            this.icon.spriteFrame = sp;
        });
    }
});
