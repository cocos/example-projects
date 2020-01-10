// 开启 Canvas 背景支持 alpha 通道
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;

function randomNum (min, max){
    return Math.random() * (max - min + 1) + min;
}

const TIPS = [
    '这个是一个范例，该范例是让用户知道如何把 UI 渲染到 VideoPlayer 上',
    'UI 渲染到 VideoPlayer 上只需三个步骤：1。创建代码开启 cc.macro.ENABLE_TRANSPARENT_CANVAS 2。设置摄像机的背景颜色的透明度为零 3。勾选 VideoPlayer 组件上的 stayOnBottom 属性 -- 就 OK 了',
    'UI 居然可以显示在 VidePlayer 上面了，👍👍👍👍👍',
    '哇，可以做弹幕功能了... 💐💐💐💐💐',
    '哇，可以做约会游戏了... 💐💐💐💐💐',
    '注意：该功能只支持 web 平台',
    '注意：该功能的效果在各个浏览器的限制下不能保持效果一致',
    '我是打酱油的...',
    'Cococs Creator 是最棒的，不接收反驳...',
    '前面的说的对...',
    '其实我也不知道要说什么，反正只是为了充数用而已'
];

cc.Class({
    extends: cc.Component,

    properties: {
        tempBarrage: cc.Prefab,
        videoPlayer: cc.VideoPlayer,
        barrageRoot: cc.Node,
        tips: cc.Node,
    },

    start () {
        this.__id = 0;
        this._animList = [];

        let node = cc.find('Canvas/Play');
        this.btnPlay = node.getComponent(cc.Button);
        this.btnPlay.interactable = true;

        node = cc.find('Canvas/Pause');
        this.btnPause = node.getComponent(cc.Button);
        this.btnPause.interactable = false;

        node = cc.find('Canvas/Stop');
        this.btnStop = node.getComponent(cc.Button);
        this.btnStop.interactable = false;
    },

    // 创建弹幕
    onCreateBarrage () {
        let node = cc.instantiate(this.tempBarrage);
        ++this.__id;
        node.___id = this.__id;
        node.y = randomNum(300, -120);
        node.parent = this.node;
        let r = randomNum(0, 255);
        let g = randomNum(0, 255);
        let b = randomNum(0, 255);
        node.color = cc.color(r, g, b);
        let label = node.getComponent(cc.Label);
        let idx = Math.floor(randomNum(0, TIPS.length - 1));
        label.string = TIPS[idx];
        let animComp = node.getComponent(cc.Animation);
        animComp.on('stop', () => {
            delete this._animList[node.___id];
            node.destroy();
        });
        this._animList[this.__id] = animComp;
    },

    // 清空弹幕
    onClearBarrages () {
        this._intervalID && clearInterval(this._intervalID);
        let keys = Object.keys(this._animList);
        for (let i = 0, len = keys.length; i < len; ++i) {
            let key = keys[i];
            let anim = this._animList[key];
            anim.node.destroy();
        }
        this._animList.length = 0;
    },

    // 开启弹幕
    onOpenBarrages () {
        this._intervalID = setInterval(() => {
            this.onCreateBarrage();
        }, 1000);
        this.onPlayAnim();
    },

    // 关闭弹幕
    onCloseBarrages () {
        this._intervalID && clearInterval(this._intervalID);
        this.onPauseAnim();
    },

    // 播放弹幕动画
    onPlayAnim () {
        let keys = Object.keys(this._animList);
        for (let i = 0, len = keys.length; i < len; ++i) {
            let key = keys[i];
            let anim = this._animList[key];
            if (anim.getAnimationState('barrage-animClip').isPaused) {
                anim.resume();
            }
            else {
                anim.play();
            }
        }
    },

    // 暂停弹幕动画
    onPauseAnim () {
        for (let key in this._animList) {
            let anim = this._animList[key];
            anim.pause();
        }
    },

    // 播放视频
    play () {
        this.tips.active = false;
        this.btnPlay.interactable = false;
        this.btnPause.interactable = true;
        this.btnStop.interactable = true;
        this.videoPlayer.play();
        this.onOpenBarrages();
    },

    // 暂停视频
    pause () {
        this.btnPlay.interactable = true;
        this.btnPause.interactable = false;
        this.btnStop.interactable = true;
        this.videoPlayer.pause();
        this.onCloseBarrages();
    },

    // 停止视频
    stop () {
        this.tips.active = true;
        this.btnPlay.interactable = true;
        this.btnPause.interactable = false;
        this.btnStop.interactable = false;
        this.videoPlayer.stop();
        this.onClearBarrages();
    },
});
