
cc.Class({
    extends: cc.Component,

    properties: {
        meshRenderer: cc.MeshRenderer
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        setTimeout(() => {
            cc.loader.loadRes('materials/dynamic-load-material', cc.Material, (err, material) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                this.meshRenderer.setMaterial(0, material);
            })
        }, 1000);
    },

    // update (dt) {},
});
