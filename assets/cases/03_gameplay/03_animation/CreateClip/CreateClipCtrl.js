cc.Class({
    extends: cc.Component,

    properties: {
        atlas: null,
    },

    // use this for initialization
    onLoad: function () {
        var animation = this.getComponent(cc.Animation);
        
        cc.resources.load("test_assets/atlas", cc.SpriteAtlas, (err, atlas) => {
            this.atlas = atlas.addRef();
            var spriteFrames = atlas.getSpriteFrames();
            
            var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
            clip.name = 'run';
            clip.wrapMode = cc.WrapMode.Loop;

            animation.addClip(clip);
            animation.play('run');
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onDestroy: function () {
        this.atlas.decRef();
        this.atlas = null;
    }
});
