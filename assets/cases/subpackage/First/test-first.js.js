
cc.Class({
    extends: cc.Component,

    start () {
        this.getComponent(cc.Label).textKey = 'cases/subpackage1.loaded';
    }
});
