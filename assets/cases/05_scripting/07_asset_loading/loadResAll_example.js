cc.Class({
    extends: cc.Component,

    properties: { },

    onLoad: function () {
        cc.loader.loadResAll("test assets", function (err, assets) {
            cc.log("load resource all");
            cc.log(assets);
        });
        cc.loader.loadResAll("test assets", cc.SpriteFrame, function (err, assets) {
            cc.log("load all sprite frame: assets");
            cc.log(assets);
        });
    }
});
