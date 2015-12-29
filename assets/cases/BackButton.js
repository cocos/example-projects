cc.Class({
    extends: cc.Component,
    
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
    },

    backToList: function () {
        cc.director.loadScene('db://assets/cases/TestList.fire');
    }
});
