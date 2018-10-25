cc.Class({
    extends: cc.Component,

    properties: {
        rotationToNode: cc.Node,
        rotateByNode: cc.Node
    },

    onToClick: function () {
        var rotationTo = cc.rotateTo(1, 0, 100);
        this.rotationToNode.runAction(rotationTo);
    },

    onReverseToClick: function () {
        var rotationTo = cc.rotateTo(1, 100, 0);
        this.rotationToNode.runAction(rotationTo);
    },

    onToRecoverClick: function () {
        this.rotationToNode.eulerAngles = cc.v3();
    },

    onByClick: function () {
        var rotateBy = cc.rotateBy(1, 0, 100);
        this.rotateByNode.runAction(rotateBy);
    },

    onReverseByClick: function () {
        var rotateBy = cc.rotateBy(1, 100, 100);
        this.rotateByNode.runAction(rotateBy);
    },

    onByRecoverClick: function () {
        this.rotateByNode.eulerAngles = cc.v3();
    }

});
