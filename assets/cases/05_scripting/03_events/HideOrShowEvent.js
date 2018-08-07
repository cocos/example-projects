cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        logItem: cc.Prefab,
    },
    
    onLoad () {
        let self = this;
        cc.game.on(cc.game.EVENT_HIDE, function(event) {
            let item = cc.instantiate(self.logItem);
            item.getComponent(cc.Label).string = `[${self.getTimes()}] EVENT_HIDE triggered`
            self.scrollViewContent.addChild(item);
        });
        cc.game.on(cc.game.EVENT_SHOW, function(event) {
            let item = cc.instantiate(self.logItem);
            item.getComponent(cc.Label).string = `[${self.getTimes()}] EVENT_SHOW triggered`
            self.scrollViewContent.addChild(item);
        });
    },

    getTimes () {
        let date = new Date();
        return `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
    },

    clearLog () {
        this.scrollViewContent.children.forEach(function(node){
            node.destroy();
        })
    },
});
