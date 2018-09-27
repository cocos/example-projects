/**
 * @author Javen 
 * @copyright 2018-09-22 17:25:10 javendev@126.com 
 * @description 常驻节点 参考https://github.com/ShawnZhang2015/CreatorPrimer
 */

cc.Class({
    extends: cc.Component,

    start() {
        if (!cc.game.isPersistRootNode(this.node)) {
            cc.game.addPersistRootNode(this.node);
        }
    },
});