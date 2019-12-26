const {ccclass, property} = cc._decorator;

@ccclass
export default class Rotate extends cc.Component {

    @property
    mx:boolean = true;

    @property
    my:boolean = true;

    @property
    mz:boolean = true;

    @property
    speed:number = 1;

    private tempAngle:cc.Vec3 = new cc.Vec3();

    start () {
        if (Math.random() > 0.5) {
            this.speed *= -1;
        }
        cc.Vec3.copy(this.tempAngle, this.node.eulerAngles);
    }

    update (dt) {
        let euler = this.tempAngle;
        if (this.mx) {
            euler.x += this.speed;
        }

        if (this.my) {
            euler.y += this.speed;
        }
        
        if (this.mz) {
            euler.z += this.speed;
        }

        if (Math.abs(euler.x - 90) < 0.001) {
            euler.x = 0;
        }

        if (Math.abs(euler.y - 90) < 0.001) {
            euler.y = 0;
        }

        if (Math.abs(euler.z - 90) < 0.001) {
            euler.z = 0;
        }

        this.node.eulerAngles = euler;
    }
}
