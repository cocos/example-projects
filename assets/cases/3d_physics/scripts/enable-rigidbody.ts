const {ccclass, property} = cc._decorator;

@ccclass
export default class EnableRigidBody extends cc.Component {

    @property(cc.Label)
    toState: cc.Label = null;

    @property(cc.RigidBody3D)
    rigidBody: cc.RigidBody3D = null;

    switchState () {
        let toStateStr = this.toState.string;
        if (toStateStr == "disable") {
            this.disableRigidBody();
            this.toState.string = "enable";
        } else {
            this.enableRigidBody();
            this.toState.string = "disable";
        }
    }

    enableRigidBody () {
        this.rigidBody.enabled = true;
    }

    disableRigidBody () {
        this.rigidBody.enabled = false;
    }
}
