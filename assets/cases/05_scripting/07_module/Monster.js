cc.Class({
    extends: cc.Component,

    properties: {
        nickname: {
            default: null,
            type: cc.Label
        },
        lv: {
            default: null,
            type: cc.Label
        },
        hp: {
            default: null,
            type: cc.Label
        },
        atk: {
            default: null,
            type: cc.Label
        },
        defense: {
            default: null,
            type: cc.Label
        },
        image: {
            default: null,
            type: cc.Sprite
        },
        loadSpriteFrame:null
    },

    initInfo: function (info) {
        this.nickname.string = info.name;
        this.lv.string = info.lv;
        this.hp.string = info.hp;
        this.atk.string = info.atk;
        this.defense.string = info.defense;

        var image = this.image;
        let self = this;
        cc.resources.load(info.imageUrl, cc.SpriteFrame, function (error, spriteFrame) {
            if (!error) {
                self.loadSpriteFrame = spriteFrame.addRef();
                image.spriteFrame = spriteFrame;
            }
        });
    },

    onDestroy () {
        if(this.loadSpriteFrame){
            this.loadSpriteFrame.decRef();

        }
        this.image.spriteFrame = null;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
