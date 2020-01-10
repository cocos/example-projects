const { ccclass, property } = cc._decorator;

@ccclass
export class triggertesting extends cc.Component {

    private static _idCounter = 0;
    public readonly id: number;

    private _prev: Boolean[] = [];
    
    @property({ type: cc.Material })
    colliderMaterial: cc.Material = null;

    @property({ type: cc.Material })
    unColliderMaterial: cc.Material = null;

    private _colliderCount:number = 0;

    private _enterType = 'collision-enter';
    private _stayType = 'collision-stay';
    private _exitType = 'collision-exit';

    @property
    isTrigger:boolean = false;

    constructor () {
        super();
        this.id = triggertesting._idCounter++;
    }

    start () {
        if (this.isTrigger || CC_PHYSICS_BUILTIN) {
            this._enterType = 'trigger-enter';
            this._stayType = 'trigger-stay';
            this._exitType = 'trigger-exit';
        }

        let trigger = this.getComponent(cc.Collider3D);
        if (trigger) {
            trigger.on(this._enterType, this.onTrigger, this);
            trigger.on(this._stayType, this.onTrigger, this);
            trigger.on(this._exitType, this.onTrigger, this);
        }
    }

    onTrigger (event) {
        if (event.type == this._enterType) {
            this._colliderCount++;
        }
        else if (event.type == this._stayType) {
            if (!this._prev[event.otherCollider._id]) {
                this._prev[event.otherCollider._id] = true;
            } else {
                return;
            }
        } else if (event.type == this._exitType) {
            this._prev[event.otherCollider._id] = false;
            this._colliderCount--;
        }

        const modelCom = this.node.getComponent(cc.MeshRenderer);
        if (this._colliderCount > 0) {
            modelCom.setMaterial(0, this.colliderMaterial);
            modelCom.markForRender(true);
        } else {
            modelCom.setMaterial(0, this.unColliderMaterial);
            modelCom.markForRender(true);
        } 

        // let infoStr = event.selfCollider.node.name + '__' + event.type + '__' + event.otherCollider.node.name + ' ';
        // console.log(infoStr);
    }
}
