cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        cc.director.getCollisionManager().enabled = true;

        this._speed = 1000;

        let useless = cc.find("Canvas/tiledmap/game/img58");
        useless.active = false;

        let theParent = cc.find("Canvas/tiledmap");
        this.node.parent = theParent;
    },

    update (dt) {
        this.node.x += dt * this._speed;
    },

    onCollisionEnter (other) {
        let otherName = other.node.name;
        switch (otherName) {
            case "to-right":
                this._speed = 1000;
                this.node.scaleX = 1.3;
                break;
            case "to-index-1":
                this.node.setSiblingIndex(1);
                break;
            case "to-left":
                this._speed = -1000;
                this.node.scaleX = -1.3;
                break;
            case "to-index-4":
                this.node.setSiblingIndex(6);
                break;
        } 
    }
});
