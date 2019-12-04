// Learn TypeScript:
import { SpriteFrame } from '../../../creator.d';
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

    @property(cc.Sprite)
    renderTextureSprite: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    cameraPos = cc.v3(0, 0, MINI_CAMERA_Z);
    cameraOrthoSize = 1;

    _renderTexture: cc.RenderTexture = new cc.RenderTexture();

    onEnable () {
        cc.view.on('design-resolution-changed', this._delayInitRenderTexture, this);
    }

    onDisable () {
        cc.view.off('design-resolution-changed', this._delayInitRenderTexture, this);
    }

    _delayInitRenderTexture () {
        // should calculate size after canvas updated
        this.scheduleOnce(this._initRenderTexture.bind(this), 0.1);
    }

    _initRenderTexture () {
        let { width: canvasWidth, height: canvasHeight } = cc.Canvas.instance.node;
        let width = canvasWidth * 0.2;
        let height = canvasHeight * 0.2;

        this._renderTexture.initWithSize(width, height);
        this.miniMapCamera.targetTexture = this._renderTexture;

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(this._renderTexture);
        this.renderTextureSprite.spriteFrame = spriteFrame;

        let deviceWidth = canvasWidth, deviceHeight = canvasHeight;
        if (!CC_EDITOR) {
            deviceWidth = cc.game.canvas.width / cc.view._scaleX;
            deviceHeight = cc.game.canvas.height / cc.view._scaleY;
        }

        let node = this.renderTextureSprite.node;
        node.x = deviceWidth / 2 - width / 2;
        node.y = deviceHeight / 2 - height / 2;
        node.width = width;
        node.height = height;
    }

    _tweens: cc.Tween[] = [];

    start () {
        this._initRenderTexture();
        
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
        let orthoHeight = this.cameraOrthoSize;
        let orthoWidth = orthoHeight * (this._renderTexture.width / this._renderTexture.height);
        
        this.cameraInfo.clear();

        // draw mini camera border
        let renderTextureNode = this.renderTextureSprite.node;
        this.cameraInfo.rect(renderTextureNode.x - renderTextureNode.width/2, renderTextureNode.y - renderTextureNode.height/2, renderTextureNode.width, renderTextureNode.height);
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
