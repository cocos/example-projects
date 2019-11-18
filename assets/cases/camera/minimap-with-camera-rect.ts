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

// camera z value should between camera nearClip and farClip
const MINI_CAMERA_Z = 100;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Camera)
    miniMapCamera: cc.Camera = null;

    @property(cc.Graphics)
    cameraInfo: cc.Graphics = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    cameraPos = cc.v3(0, 0, MINI_CAMERA_Z);
    cameraOrthoSize = 1;

    _tweens: cc.Tween[] = [];

    start () {
        if (!CC_EDITOR) {
            let t = cc.tween(this.target)
                .by(6, {angle: 360})
                .repeatForever()
                .start()
            this._tweens.push(t);

            t = cc.tween(this)
                .set({cameraPos: cc.v3(0, 0, MINI_CAMERA_Z), cameraOrthoSize: cc.Canvas.instance.node.height / 2})
                .to(6, {cameraOrthoSize: this.target.width / 2})
                .delay(1)
                .to(3, {cameraPos: cc.v3(100, 0, MINI_CAMERA_Z)})
                .union()
                .repeatForever()
                .start()
            this._tweens.push(t);
        }
        else {
            this.cameraOrthoSize = cc.Canvas.instance.node.height / 2;
        }
    }

    onDestroy () {
        this._tweens.forEach(t => {
            t.stop();
        })
    }

    update (dt) {
        let { width: canvasWidth, height: canvasHeight } = cc.Canvas.instance.node;
        
        let deviceWidth = canvasWidth, deviceHeight = canvasHeight;
        if (!CC_EDITOR) {
            deviceWidth = cc.game.canvas.width / cc.view._scaleX;
            deviceHeight = cc.game.canvas.height / cc.view._scaleY;
        }

        let orthoHeight = this.cameraOrthoSize;
        let orthoWidth = orthoHeight * (deviceWidth / deviceHeight);
        
        let rect = this.miniMapCamera.rect;
        this.cameraInfo.clear();

        // draw mini camera border
        this.cameraInfo.rect((rect.x - 0.5) * deviceWidth, (rect.y - 0.5) * deviceHeight, rect.width * deviceWidth, rect.height * deviceHeight);
        this.cameraInfo.strokeColor = cc.Color.YELLOW;
        this.cameraInfo.stroke();

        // draw mini camera ortho size
        this.cameraInfo.rect(this.cameraPos.x - orthoWidth, this.cameraPos.y - orthoHeight, orthoWidth * 2, orthoHeight * 2);
        this.cameraInfo.strokeColor = cc.Color.BLUE;
        this.cameraInfo.stroke();
        
        this.miniMapCamera.node.position = this.cameraPos;
        this.miniMapCamera.orthoSize = this.cameraOrthoSize;
    }
}
