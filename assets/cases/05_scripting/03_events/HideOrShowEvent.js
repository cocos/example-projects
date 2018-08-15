cc.Class({
    extends: cc.Component,

    properties: {
        scrollViewContent: cc.Node,
        logItem: cc.Prefab,
    },
    
    onLoad () {
        let self = this;
        cc.game.on(cc.game.EVENT_HIDE, this.addHideLogItem, this);
        cc.game.on(cc.game.EVENT_SHOW, this.addShowLogItem, this);
    },

    onDestroy () {
        cc.game.off(cc.game.EVENT_HIDE, this.addHideLogItem, this);
        cc.game.off(cc.game.EVENT_SHOW, this.addShowLogItem, this);
    },

    addHideLogItem () {
        let item = cc.instantiate(this.logItem);
        let comp = item.getComponent('HideOrShowEventLogItem');
        comp && comp.setTimeDisplay(this.getTimes());
        comp && comp.setEventDisplay('EVENT_HIDE triggered');
        this.scrollViewContent.addChild(item);
    },

    addShowLogItem () {
        let item = cc.instantiate(this.logItem);        
        let comp = item.getComponent('HideOrShowEventLogItem');
        comp && comp.setTimeDisplay(this.getTimes());
        comp && comp.setEventDisplay('EVENT_SHOW triggered');
        this.scrollViewContent.addChild(item);
    },

    getTimes () {
        let date = new Date();
        return `[${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}]`;
    },

    clearLog () {
        this.scrollViewContent.children.forEach(function(node){
            node.destroy();
        });
        this.scrollViewContent.children.length = 0;
    },
});
