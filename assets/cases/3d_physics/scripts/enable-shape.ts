const {ccclass, property} = cc._decorator;

@ccclass
export default class EnableAllShapde extends cc.Component {

    @property({type:cc.Label})
    toState:cc.Label = null;

    start () {

    }

    switchState () {
        let toStateStr = this.toState.string;
        if (toStateStr == "disable") {
            this.disableAllShape();
            this.toState.string = "enable";
        } else {
            this.enableAllShape();
            this.toState.string = "disable";
        }
    }

    enableAllShape () {
        let children = this.node.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let collider = child.getComponent(cc.Collider3D);
            collider.enabled = true;
        }
    }

    disableAllShape () {
        let children = this.node.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let collider = child.getComponent(cc.Collider3D);
            collider.enabled = false;        
        }
    }
}
