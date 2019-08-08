cc.Class({
    extends: cc.Component,

    properties: {
        skeleton : {
            type: sp.Skeleton,
            default: null,
        }
    },

    start () {
        this._swirlTime = 0;
        this._maxEffect = 3;
        this._index = 0;
        this._bound = cc.size(this.skeleton.node.width, this.skeleton.node.height);

        this._swirlEffect = new sp.VertexEffectDelegate();
        this._swirlEffect.initSwirlWithPowOut(0, 2);

        this._jitterEffect = new sp.VertexEffectDelegate();
        this._jitterEffect.initJitter(20, 20);
    },

    switchEffect () {
        this._index++;
        if (this._index >= this._maxEffect) {
            this._index = 0;
        }

        switch (this._index) {
            case 0:
                this.skeleton.setVertexEffectDelegate(null);
                break;
            case 1:
                this.skeleton.setVertexEffectDelegate(this._jitterEffect);
                break;
            case 2:
                this.skeleton.setVertexEffectDelegate(this._swirlEffect);
                break;
        }
    },

    update (dt) {
        if (this._index == 2) {
            this._swirlTime += dt;
            let percent = this._swirlTime % 2;
            if (percent > 1) percent = 1 - (percent -1 );

            let bound = this._bound;
            let swirlEffect = this._swirlEffect.getSwirlVertexEffect();
            swirlEffect.angle = 360 * percent;
            swirlEffect.centerX = bound.width * 0.5;
            swirlEffect.centerY = bound.height * 0.5;

            swirlEffect.radius = percent * Math.sqrt(bound.width * bound.width + bound.height * bound.height);
        }    
    } 
});
