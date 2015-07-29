var UpdateMovement = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        speed: 0
    },
    onLoad: function() {
        this.counter = 0;
        setResolution();
    },
    update: function(dt) {
        this.setPositionX(this.x + this.speed * dt);
    }
});
