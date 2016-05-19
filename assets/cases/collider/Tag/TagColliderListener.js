cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },
    
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    
    onCollisionEnter: function (other, self) {
        this.label.string = 'Collision on tag : ' + self.tag;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
