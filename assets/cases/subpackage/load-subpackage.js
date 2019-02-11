cc.Class({
    extends: cc.Component,

    properties: {
        tips: require('LabelLocalized')
    },

    onLoadSubpackageCallback (err) {
        if (err) {
            console.error(err);
            this.tips.textKey = 'cases/subpackage.failed';
            return;
        }
        this.tips.textKey = 'cases/subpackage.complete';
    },

    loadSubpackage1 () {
        cc.loader.downloader.loadSubpackage('First', this.onLoadSubpackageCallback.bind(this));
    },

    loadSubpackage2 () {
        cc.loader.downloader.loadSubpackage('Second', this.onLoadSubpackageCallback.bind(this));
    },

    goSubpackage1 () {
        cc.director.loadScene('sub-first', (err) => {
            if (err) {
                this.tips.textKey = 'cases/goSubpackage1.failed';
            }
        });
    },

    goSubpackage2 () {
        cc.director.loadScene('sub-second', (err) => {
            if (err) {
                this.tips.textKey = 'cases/goSubpackage2.failed';
            }
        });
    },

});
