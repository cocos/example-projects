const {ccclass, property} = cc._decorator;

@ccclass
export default class Born extends cc.Component {

    @property({type:cc.Node})
    ball:cc.Node = null;

    @property({type:cc.Node})
    checkNode:cc.Node = null;

    @property({type:cc.Node})
    box:cc.Node = null;

    start () {
        this.checkNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.rotate();
    }

    rotate () {
        this.box.runAction(cc.repeatForever(cc.sequence(cc.rotate3DTo(1, 1, 0, 20),cc.rotate3DTo(1, 1, 0, -20))));
    }

    onTouchStart (event) {
        let newBall = cc.instantiate(this.ball);
        newBall.active = true;
        this.node.addChild(newBall);
    }
}
