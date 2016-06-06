cc.Class({
    extends: cc.Component,

    properties: {
        sheep: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;

        // set initial move direction
        self.turnRight();

        //add keyboard input listener to call turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD, 
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        console.log('turn left');
                        self.turnLeft();
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        console.log('turn right');
                        self.turnRight();
                        break;
                }
            }
        }, self.node);
    },

    // called every frame
    update: function (dt) {
        this.sheep.x += this.speed * dt;
    },

    turnLeft: function() {
        this.speed = -100;
        this.sheep.scaleX = 1;
    },

    turnRight: function() {
        this.speed = 100;
        this.sheep.scaleX = -1;
    }
});
