cc.Class({
    extends: cc.Component,

    properties: {
        sheep: {
            default: null,
            type: cc.ENode
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        var self = this;

        // set initial move direction
        self.turnRight();

        // delete this when integrated keyboard control
        setTimeout(function() {
            // turn left
            self.turnLeft();
        }, 1000);

        //TODO: add keyboard input listener to call turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD, 
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.turnLeft();
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.turnRight();
                        break;
                }
            }
        }, self.node._sgNode);
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
