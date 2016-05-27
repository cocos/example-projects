var WallType = cc.Enum({
   Left: 0,
   Right: 1,
   Top: 2,
   Bottom: 3
});

cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: WallType.Left,
            type: WallType
        },
        
        width: 5
    },

    // use this for initialization
    start: function () {
        var collider = this.getComponent(cc.BoxCollider);
        if (!collider) {
            return;
        }
        
        var node = this.node;
        var type = this.type;
        
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        
        var wallWidth = this.width;
        
        if (type === WallType.Left) {
            node.height = height;
            node.width = wallWidth;
            node.x = 0;
            node.y = height/2;
        }
        else if (type === WallType.Right) {
            node.height = height;
            node.width = wallWidth;
            node.x = width;
            node.y = height/2;
        }
        else if (type === WallType.Top) {
            node.width = width;
            node.height = wallWidth;
            node.x = width/2;
            node.y = height;
        }
        else if (type === WallType.Bottom) {
            node.width = width;
            node.height = wallWidth;
            node.x = width/2;
            node.y = 0;
        }
        
        collider.size = node.getContentSize();
    }
});
