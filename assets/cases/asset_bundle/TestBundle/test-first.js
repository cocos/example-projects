cc.Class({
    extends: cc.Component,

    properties: {
        tips: require('LabelLocalized')
    },

    start () {
        this.tips.textKey = 'cases/AssetBundle.8';
    },

    goLoadSubpackage () {
        cc.director.loadScene('AssetBundle');
    },

});
