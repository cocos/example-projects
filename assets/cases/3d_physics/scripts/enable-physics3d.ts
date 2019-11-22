const {ccclass, property} = cc._decorator;

@ccclass
export default class EnablePhysics3D extends cc.Component {

    onLoad () {
        cc.director.getPhysics3DManager().enable = true;
    }
}
