cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {

    },

    onComeBlack: function () {
        cc.director.loadScene("AssetLoading.fire");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
