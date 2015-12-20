cc.Class({
    extends: cc.Component,

    properties: {
        nodeList: {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        setInterval(function () {
            self.toggleNodesVisibility();
        }, 1000);
    },

    // called every frame
    update: function (dt) {

    },

    toggleNodesVisibility: function() {
        console.log('toggle visibility');
        for (var i = 0; i < this.nodeList.length; ++i) {
            this.nodeList[i].active = !this.nodeList[i].active;
        }
    }
});
