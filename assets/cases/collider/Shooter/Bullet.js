cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100
    },

    // use this for initialization
    onLoad: function () {

    },

    onCollisionEnter: function (other, self) {
        this.node.destroy();
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y += this.speed * dt;
    },
});
