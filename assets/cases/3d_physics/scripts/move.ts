const {ccclass, property} = cc._decorator;

@ccclass
export default class Move extends cc.Component {

    @property
    mx:boolean = true;

    @property
    my:boolean = true;

    @property
    mz:boolean = true;

    private originPos:cc.Vec3 = new cc.Vec3();
    private nowPos:cc.Vec3 = new cc.Vec3();

    @property
    speed:number = 1;

    @property
    dis:number = 30;

    start () {
        this.nowPos.x = this.originPos.x = this.node.x;
        this.nowPos.y = this.originPos.y = this.node.y;
        this.nowPos.z = this.originPos.z = this.node.z;
        if (Math.random() > 0.5) {
            this.speed *= -1;
        }
    }

    update (dt) {
        let dis = cc.Vec3.distance(this.originPos, this.nowPos);
        if (dis > this.dis) {
            this.speed *= -1;
        }

        if (this.mx) {
            this.nowPos.x += this.speed;
            this.node.x = this.nowPos.x;
        }

        if (this.my) {
            this.nowPos.y += this.speed;
            this.node.y = this.nowPos.y;
        }
        
        if (this.mz) {
            this.nowPos.z += this.speed;
            this.node.z = this.nowPos.z;
        }
    }
}
