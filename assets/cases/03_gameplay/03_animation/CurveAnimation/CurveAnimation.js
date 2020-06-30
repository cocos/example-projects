cc.Class({
    extends: cc.Component,

    properties: {
        size: {
            default: null,        
            type: cc.CurveRange, 
            serializable: true, 
        },

        sheep: {
            default: null,        
            type: cc.Sprite, 
            serializable: true, 
        }
    },
    start () {
        
    },

    onEnable () {
        this.duration = 10;
        this._time = 0;
    },

    update (dt) {
        this._time += dt;
        if (this._time >= this.duration) {
            this._time = 0;
        }

        let scale = this.size.evaluate(this._time / this.duration);
        this.sheep.node.setScale(scale, scale);
    }
});
