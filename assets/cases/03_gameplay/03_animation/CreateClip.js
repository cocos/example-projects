cc.Class({
    extends: cc.Component,


    // use this for initialization
    onLoad: function () {
        var animation = this.getComponent(cc.Animation);
        
        cc.loader.loadRes("test assets/atlas", cc.SpriteAtlas, (err, atlas) => {
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
});
