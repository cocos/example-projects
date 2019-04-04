
cc.Class({
    extends: cc.Component,

    properties: {
        tips: require('LabelLocalized')
    },

    start () {
        this.tips.textKey = 'cases/subpackage1.loaded';
    },

    goLoadSubpackage () {
        cc.director.loadScene('Subpackages');
    },

});
