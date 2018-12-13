
cc.Class({
    extends: cc.Component,

    start () {
        this.getComponent(cc.Label).textKey = 'cases/subpackage2.loaded';
    }
});
