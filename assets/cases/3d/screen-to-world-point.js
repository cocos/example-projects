// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const WHITE = cc.Color.WHITE;

cc.Class({
    extends: cc.Component,

    properties: {
        box: cc.Node,
        distanceLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        
        this.distance = 0.5;
    },

    onTouchStart (event) {
        this.moveBox(event.touch.getLocation());
    },

    onTouchMove (event) {
        this.moveBox(event.touch.getLocation());
    },

    moveBox (touchPos) {
        let camera = cc.Camera.findCamera(this.box);
        let pos = camera.getScreenToWorldPoint(cc.v3(touchPos.x, touchPos.y, this.distance));
        this.box.position = this.box.parent.convertToNodeSpaceAR(pos);
    },

    distanceChanged (slider) {
        this.distance = parseFloat(slider.progress.toFixed(2));
        this.distanceLabel.string = 'distance : ' + this.distance;
    }
});
