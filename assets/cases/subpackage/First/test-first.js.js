
cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite
    },

    start () {
        this.getComponent(cc.Label).textKey = 'cases/subpackage1.loaded';
        cc.loader.loadRes('subpackage/First/gold', cc.SpriteFrame, (err, sp) => {
            if (err) {
                return console.log(err);
            }
            this.icon.spriteFrame = sp;
        });
    }
});
