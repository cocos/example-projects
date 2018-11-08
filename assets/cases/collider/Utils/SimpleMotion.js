cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 100,
        rotationSpeed: 90
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x += dt * this.moveSpeed;
        this.node.angle += dt * this.rotationSpeed;
    },
});
