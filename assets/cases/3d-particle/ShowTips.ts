
const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowTips extends cc.Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private tips: any = null;
    private ifshow: boolean = false;

    showtip(){
        this.tips.active = !this.tips.active;
    }

    start () {
        // Your initialization goes here.
        this.tips = this.node.getChildByName('tips');
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
