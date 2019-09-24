cc.Class({
    extends: cc.Component,

    properties: {
        tips: require('LabelLocalized'),
        btn_gotoSub1: cc.Button,
        btn_gotoSub2: cc.Button,
    },

    start () {
        this.btn_gotoSub1.interactable = false;
        this.btn_gotoSub2.interactable = false;
    },

    onLoadSubpackageCallback (idx, err) {
        if (err) {
            console.error(err);
            this.tips.textKey = 'cases/subpackage.failed';
            return;
        }
        this.tips.textKey = 'cases/subpackage.complete';
        this.btn_gotoSub1.interactable = idx === 1;
        this.btn_gotoSub2.interactable = idx === 2;
    },

    loadSubpackage1 () {
        cc.loader.downloader.loadSubpackage('First', this.onLoadSubpackageCallback.bind(this, 1));
    },

    loadSubpackage2 () {
        cc.loader.downloader.loadSubpackage('Second', this.onLoadSubpackageCallback.bind(this, 2));
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
