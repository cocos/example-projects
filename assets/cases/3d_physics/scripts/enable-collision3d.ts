const {ccclass, property} = cc._decorator;

@ccclass
export default class EnableCollision3D extends cc.Component {

    onLoad () {
        cc.director.getCollision3DManager().enable = true;
    }

    // update (dt) {}
}
