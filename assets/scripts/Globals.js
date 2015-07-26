globalCommand = function() {
    Fire.log("global command.");
};

createAnimation = function(animName, count, delay) {
    var animFrames = [];
    var frame,str;
    // init run animation
    for (var i = 0; i < count; i++) {
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

getSheep = function() {
    return cc.director.getRunningScene().getChildByName('sheep');
};

getStar = function() {
    return cc.director.getRunningScene().getChildByName('star');
};
