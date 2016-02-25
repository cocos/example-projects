cc.Class({
    extends: cc.Component,

    properties: {

        speed: 100,

        progressBar: {
            default: null,
            type: cc.Node
        },

        ground: {
            default: null,
            type: cc.Node
        }
    },

    update: function (dt) {
        if (this.progressBar.width < 500 ) {
            this.progressBar.width += dt * this.speed;
        }
        if (this.ground.width < 1000 ) {
            this.ground.width += dt * this.speed;
        }
    }

});
