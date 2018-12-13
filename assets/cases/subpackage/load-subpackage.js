cc.Class({
    extends: cc.Component,

    properties: {
        tips1: cc.Label,
        tips2: cc.Label
    },

    loadSubpackage1 () {
        if (CC_PREVIEW || CC_QQPLAY) return;
        cc.loader.downloader.loadSubpackage('First', err => {
            if (err) {
                console.error(err);
                this.tips1.textKey = 'cases/subpackage.failed';
                return;
            }
            cc.director.loadScene('subpackage');
        });
    },

    loadSubpackage2 () {
        if (CC_PREVIEW || CC_QQPLAY) return;
        cc.loader.downloader.loadSubpackage('Second', err => {
            if (err) {
                console.error(err);
                this.tips2.textKey = 'cases/subpackage.failed';
                return;
            }
            cc.director.loadScene('subpackage');
        });
    }

});
