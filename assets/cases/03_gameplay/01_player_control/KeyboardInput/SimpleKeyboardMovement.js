cc.Class({
    extends: cc.Component,

    properties: {
        sheep: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad () {
        // set initial move direction
        this.turnRight();

        //add keyboard input listener to call turnLeft and turnRight
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                console.log('turn left');
                this.turnLeft();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                console.log('turn right');
                this.turnRight();
                break;
        }
    },

    // called every frame
    update (dt) {
        this.sheep.x += this.speed * dt;
    },

    turnLeft () {
        this.speed = -100;
        this.sheep.scaleX = 1;
    },

    turnRight () {
        this.speed = 100;
        this.sheep.scaleX = -1;
    }
});
