const {ccclass, property} = cc._decorator;

@ccclass
export default class EnablePhysics3D extends cc.Component {

    @property
    needPhysics : boolean = false;

    @property({type:cc.Node})
    needPhysicsWord:cc.Node = null;

    onLoad () {
        cc.director.getPhysics3DManager().enabled = true;
        let showWarn = this.needPhysics && CC_PHYSICS_BUILTIN;
        if (this.needPhysicsWord) {
            this.needPhysicsWord.active = showWarn;
        }
    }
}
