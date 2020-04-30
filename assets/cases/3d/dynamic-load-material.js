cc.Class({
    extends: cc.Component,

    properties: {
        meshRenderer: cc.MeshRenderer,
        _material: cc.Material,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scheduleOnce(() => {
            cc.resources.load('materials/dynamic-load-material', cc.Material, (err, material) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                this._material = material.addRef();
                this.meshRenderer.setMaterial(0, material);
            })
        }, 1);
    },

    onDestroy () {
        this._material && this._material.decRef();
        this._material = null;
    }
    // update (dt) {},
});
