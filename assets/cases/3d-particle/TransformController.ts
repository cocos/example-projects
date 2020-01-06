
const { ccclass, property } = cc._decorator;

const Node = cc.Node;
const Vec3 = cc.Vec3;

let _temp_num: number = 0;

@ccclass
export default class TransformController extends cc.Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type:Node,
    })
    public particle1: Node = null;
    @property({
        type:Node,
    })
    public particle2: Node = null;
    @property({
        type:Node,
    })
    public particle3: Node = null;
    @property({
        type:Node,
    })
    public particle4: Node = null;

    @property({
        type:cc.Toggle,
    })
    public check1: cc.Toggle = null;
    @property({
        type:cc.Toggle,
    })
    public check2: cc.Toggle = null;
    @property({
        type:cc.Toggle,
    })
    public check3: cc.Toggle = null;
    @property({
        type:cc.Toggle,
    })
    public check4: cc.Toggle = null;

    private _translate: Vec3 = new Vec3();
    private _rotate: Vec3 = new Vec3();

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onTranslateChanged (slider: cc.Slider, data: string) {
        this._translate.set(cc.v3(0, 0, slider.progress * 10 - _temp_num));
        _temp_num = slider.progress * 10;
        if (this.check1.isChecked) {
            this.particle1.x += this._translate.x;
            this.particle1.y += this._translate.y;
            this.particle1.z += this._translate.z;
        }
        if (this.check2.isChecked) {
            this.particle2.x += this._translate.x;
            this.particle2.y += this._translate.y;
            this.particle2.z += this._translate.z;
        }
        if (this.check3.isChecked) {
            this.particle3.x += this._translate.x;
            this.particle4.y += this._translate.y;
            this.particle3.z += this._translate.z;
        }
        if (this.check4.isChecked) {
            this.particle4.x += this._translate.x;
            this.particle4.y += this._translate.y;
            this.particle4.z += this._translate.z;
        }
    }

    onRotateChanged (slider: cc.Slider, data: string) {
        this._rotate.set(cc.v3(slider.progress * 90, 0, 0));
        if (this.check1.isChecked) {
            this.particle1.eulerAngles = cc.v3(0, this._rotate.x, 0)
        }
        if (this.check2.isChecked) {
            this.particle2.eulerAngles = cc.v3(0, this._rotate.x, 0)
        }
        if (this.check3.isChecked) {
            this.particle3.eulerAngles = cc.v3(0, this._rotate.x, 0)
        }
        if (this.check4.isChecked) {
            this.particle4.eulerAngles = cc.v3(0, this._rotate.x, 0)
        }
    }
}
