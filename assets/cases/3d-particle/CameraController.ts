const {ccclass, property} = cc._decorator;

const Vec3 = cc.Vec3;
const Quat = cc.Quat;

@ccclass
export default class CameraController extends cc.Component {

    @property
    public translateDelta = 1;

    @property
    public rotateDelta = 5;

    private _rotateDelta = 0;

    private _temp_vec3:Vec3 = new Vec3();
    private _temp_quat:Quat = new Quat();

    private _quat:Quat = new Quat();
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        this._rotateDelta = cc.math.toRadian(this.rotateDelta);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    translate (leftRight, backForth, dt) {
        Vec3.set(this._temp_vec3, leftRight * this.translateDelta * dt, 0, backForth * this.translateDelta * dt);
        this.node.x += this._temp_vec3.x;
        this.node.y += this._temp_vec3.y;
        this.node.z += this._temp_vec3.z;
    }

    rotate (longitudinal, perpendicular, dt) {
        Quat.fromEuler(this._temp_quat, perpendicular * this.rotateDelta * dt, longitudinal * this.rotateDelta * dt, 0);
        Quat.normalize(this._temp_quat, this._temp_quat);
        this.node.getRotation(this._quat);
        this._quat.multiply(this._temp_quat);
        this.node.setRotation(this._quat);
    }

    onPushJoystick (event: any, customEventData: string) {
        let dt = 0.2;
        switch (customEventData) {
            case 'F':
                this.translate(0, -1, dt);
                break;
            case 'B':
                this.translate(0, 1, dt);
                break;
            case 'L':
                this.translate(-1, 0, dt);
                break;
            case 'R':
                this.translate(1, 0, dt);
                break;
            case 'U':
                this.rotate(0, 1, dt);
                break;
            case 'D':
                this.rotate(0, -1, dt);
                break;
            case 'RL':
                this.rotate(1, 0, dt);
                break;
            case 'RR':
                this.rotate(-1, 0, dt);
                break;
        }
    }
}
