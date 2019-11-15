// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Camera)
    miniMapCamera: cc.Camera = null;


    @property(cc.Graphics)
    border: cc.Graphics = null;

    @property(cc.Graphics)
    cameraInfo: cc.Graphics = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    cameraPos = cc.v3(0, 0, 100);
    cameraOrthoSize = 1;

    start () {

        if (!CC_EDITOR) {
            cc.tween(this.target)
            .by(6, {angle: 360})
            .repeatForever()
            .start()
        
            cc.tween(this)
                .set({cameraPos: cc.v3(0, 0, 100), cameraOrthoSize: cc.Canvas.instance.node.height / 2})
                .to(6, {cameraOrthoSize: this.target.width / 2})
                .delay(1)
                .to(3, {cameraPos: cc.v3(100, 0, 100)})
                .union()
                .repeatForever()
                .start()
        }
        else {
            this.cameraOrthoSize = cc.Canvas.instance.node.height / 2;
        }
    }

    update (dt) {
        let { width, height } = cc.Canvas.instance.node;

        let orthoHeight = this.cameraOrthoSize;
        let orthoWidth = orthoHeight * (width / height);

        this.cameraInfo.clear();
        this.cameraInfo.rect(this.cameraPos.x - orthoWidth, this.cameraPos.y - orthoHeight, orthoWidth * 2, orthoHeight * 2);
        this.cameraInfo.stroke();

        let rect = this.miniMapCamera.rect;
        this.border.clear();
        this.border.rect(width * (rect.x - 0.5), height * (rect.y - 0.5), rect.width * width, rect.height * height);
        this.border.stroke();
        
        this.miniMapCamera.node.position = this.cameraPos;
        this.miniMapCamera.orthoSize = this.cameraOrthoSize;
    }
}
