const {ccclass, property} = cc._decorator;

@ccclass
export default class Scale extends cc.Component {

    @property
    mx:boolean = true;

    @property
    my:boolean = true;

    @property
    mz:boolean = true;

    @property
    speed:number = 0.001;

    private originScale:cc.Vec3 = new cc.Vec3(1, 1, 1);
    private tempScale:cc.Vec3 = new cc.Vec3(1, 1, 1);

    start () {
        this.originScale.x = this.node.scaleX;
        this.originScale.y = this.node.scaleY;
        this.originScale.z = this.node.scaleZ;
        cc.Vec3.copy(this.tempScale, this.originScale);
    }

    update (dt) {
        let scale = this.tempScale;
        if (this.mx) {
            scale.x += this.speed;
        }

        if (this.my) {
            scale.y += this.speed;
        }
        
        if (this.mz) {
            scale.z += this.speed;
        }

        if (scale.x - this.originScale.x > 200 || 
            scale.x - this.originScale.x < 0 ||
            scale.y - this.originScale.y > 200 ||
            scale.y - this.originScale.y < 0 ||
            scale.z - this.originScale.z > 200 ||
            scale.z - this.originScale.z < 0 ) {
            this.speed *= -1;
        }

        this.node.scaleX = scale.x;
        this.node.scaleY = scale.y;
        this.node.scaleZ = scale.z;
    }
}
