cc.Class({
    extends: cc.Component,

    start () {
        this.getComponent(cc.Label).textKey = 'cases/subpackage.loaded';
    }
});
