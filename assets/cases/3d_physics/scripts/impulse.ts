const {ccclass, property} = cc._decorator;

@ccclass
export default class Impulse extends cc.Component {

    @property
    public impulse: cc.Vec3 = new cc.Vec3;

    @property
    public worldPoint: cc.Vec3 = new cc.Vec3;

    @property
    public localPoint: cc.Vec3 = new cc.Vec3;

    start () {

    }

    onWorldImpulse () {
        let rigidbody = this.getComponent(cc.RigidBody3D);
        if (rigidbody) {
            rigidbody.applyImpulse(this.impulse, this.worldPoint);
        }
    }

    onLocalImpulse () {
        let rigidbody = this.getComponent(cc.RigidBody3D);
        if (rigidbody) {
            rigidbody.applyLocalImpulse(this.impulse, this.localPoint);
        }
    }
}
