const {ccclass, property} = cc._decorator;

let tempVec3 = new cc.Vec3();

@ccclass
export default class Velocity extends cc.Component {
    start () {

    }

    rotate () {
        let rigidBody = this.node.getComponent(cc.RigidBody3D);
        if (rigidBody) {
            if (rigidBody.isSleeping) {
                rigidBody.wakeUp();
            }
            tempVec3.x = 0;
            tempVec3.y = 10;
            tempVec3.z = 0;
            rigidBody.setAngularVelocity(tempVec3);
        }
    }

    jump () {
        let rigidBody = this.node.getComponent(cc.RigidBody3D);
        if (rigidBody) {
            if (rigidBody.isSleeping) {
                rigidBody.wakeUp();
            }
            tempVec3.x = 0;
            tempVec3.y = 10;
            tempVec3.z = 0;
            rigidBody.setLinearVelocity(tempVec3);
        }
    }
}
