const {ccclass, property} = cc._decorator;

enum ERaycastType {
    ALL,
    CLOSEST
}

@ccclass
export default class RayTest extends cc.Component {

    @property({ type: cc.Material })
    defaultMaterial: cc.Material = null;

    @property({ type: cc.Material })
    rayMaterial: cc.Material = null;

    @property({type:cc.Label})
    rayState:cc.Label = null;

    private _raycastType: ERaycastType = ERaycastType.ALL;
    private _maxDistance: number = 100000;
    private _rayTool: any = null;

    start () {
        this._rayTool = cc.director.getPhysics3DManager();
        let canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    switchRay () {
        if (this._raycastType == ERaycastType.ALL) {
            this._raycastType = ERaycastType.CLOSEST;
            this.rayState.string = "ray close";
        } else {
            this._raycastType = ERaycastType.ALL;
            this.rayState.string = "ray all";
        }
    }

    onTouchStart (event) {
        this.resetAll();
        let touchLoc = event.touch.getLocation();
        let ray = cc.Camera.main.getRay(touchLoc);
        switch (this._raycastType) {
            case ERaycastType.ALL:
                const results = this._rayTool.raycast(ray, "Ball", this._maxDistance);
                if (results) {
                    for (let i = 0; i < results.length; i++) {
                        const item = results[i];
                        const modelCom = item.collider.node.getComponent(cc.MeshRenderer);
                        modelCom.setMaterial(0, this.rayMaterial);
                        modelCom.markForRender(true);
                    }
                }
                break;
            case ERaycastType.CLOSEST:
                const result = this._rayTool.raycastClosest(ray, "Ball", this._maxDistance);
                if (result) {
                    const modelCom = result.collider.node.getComponent(cc.MeshRenderer);
                    modelCom.setMaterial(0, this.rayMaterial);
                    modelCom.markForRender(true);
                }
                break;
        }
    }

    resetAll () {
        for (let i = 0; i < this.node.children.length; i++) {
            if (this.node.children[i].name == 'Sphere2') continue;
            let mesh = this.node.children[i].getComponent(cc.MeshRenderer);
            mesh.setMaterial(0, this.defaultMaterial);
            mesh.markForRender(true);
        }
    }
}
