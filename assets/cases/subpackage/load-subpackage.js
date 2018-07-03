cc.Class({
    extends: cc.Component,

    start () {
        this.label = cc.find('Canvas/New Label').getComponent(cc.Label);
        this.label.textKey = '';
    },

    loadSubpackage () {
        if (CC_PREVIEW || CC_QQPLAY) return;
        cc.loader.downloader.loadSubpackage('subpackage', err => {
            if (err) {
                console.error(err);
                this.label.textKey = 'cases/subpackage.failed';
                return;
            }
            console.log('load subpackage successfully.');
            cc.director.loadScene('subpackage');
        });
    }
});
