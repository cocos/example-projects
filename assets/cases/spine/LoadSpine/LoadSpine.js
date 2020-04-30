const i18n = require('i18n');

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    start () {
        cc.resources.load('loadSpine/alien-ess', sp.SkeletonData, this.onProcess.bind(this), this.onComplete.bind(this));
    },

    onProcess (completeCount, totalCount, item) {},

    onComplete (err, res) {
        if (err) {
            this.label.textKey = i18n.t('sprite_loadRes_asset_failed');
            cc.error(err);
        }

        let spine = this.getComponent('sp.Skeleton');
        spine.skeletonData = res;
        let animate = spine.setAnimation(0, 'run', true);    
        this.label.textKey = i18n.t('sprite_loadRes_asset_success');
    }

});
