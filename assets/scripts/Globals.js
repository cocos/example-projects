globalCommand = function() {
    Fire.log("global command.");
};

createAnimation = function(animName, delay) {
    var animFrames = [];
    var frame,str;
    // init run animation
    for (var i = 0; i < 4; i++) {
        str = animName + i + ".png";
        frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    return new cc.Animation(animFrames, delay);
};

//global initialization
setResolution = function() {
    cc.view.setDesignResolutionSize(640, 480, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
};
