cc.Class({
    extends: cc.Component,
    // 做完动画后删除自身
    onFinish: function () {
        this.node.destroy();
    }
});
