const TipsManager = require('TipsManager');

cc.Class({
    extends: cc.Component,

    properties: {
        basicNode: cc.Node,
        preNode: cc.Node,
        childNode: cc.Node,
        tip: cc.Label
    },

    start () {
        TipsManager.init();
    },

    changePosition () {
        this.resetNode();
        function positionChanged () {
            this.tip.string = 'Position_changed successd';
        }
        this.basicNode.on(cc.Node.EventType.POSITION_CHANGED, positionChanged, this);
        this.basicNode.x -= 40;
        this.basicNode.y += 10;
        this.basicNode.off(cc.Node.EventType.POSITION_CHANGED, positionChanged, this);
    },

    changeScale () {
        this.resetNode();
        function scaleChanged () {
            this.tip.string = 'Scale_changed successd';
        }
        this.basicNode.on(cc.Node.EventType.SCALE_CHANGED, scaleChanged, this);
        this.basicNode.scaleX += 0.2;
        this.basicNode.scaleY += 0.2;
        this.basicNode.off(cc.Node.EventType.POSITION_CHANGED, scaleChanged, this);
    },

    changeSize () {
        this.resetNode();
        // The oldSize only available in editor
        function sizeChanged (oldSize) {
            this.tip.string = 'Size_changed successd';
        }
        this.basicNode.on(cc.Node.EventType.SIZE_CHANGED, sizeChanged, this);
        this.basicNode.width += 100;
        this.basicNode.height += 100;
        this.basicNode.off(cc.Node.EventType.SIZE_CHANGED, sizeChanged, this);
    },

    changeAnchor () {
        this.resetNode();
        function anchorChanged () {
            this.tip.string = 'Anchor_changed successd';
        }
        this.basicNode.on(cc.Node.EventType.ANCHOR_CHANGED, anchorChanged, this);
        this.basicNode.anchorX -= 0.05;
        this.basicNode.anchorY -= 0.1;
        this.basicNode.off(cc.Node.EventType.ANCHOR_CHANGED, anchorChanged, this);
    },

    changeColor () {
        this.resetNode();
        function colorChanged () {
            this.tip.string = 'Color_changed successd';
        }
        this.basicNode.on(cc.Node.EventType.COLOR_CHANGED, colorChanged, this);
        this.basicNode.color = new cc.Color(100, 100, 100);
        this.basicNode.off(cc.Node.EventType.COLOR_CHANGED, colorChanged, this);
    },

    addingChild () {
        function childAdded (child) {
            this.tip.string = `Add_child successd\n zIndex order: ${this.getChildrenContent()}`;
            console.log(child);
        }
        this.preNode.on(cc.Node.EventType.CHILD_ADDED, childAdded, this);
        if (this.preNode.children.length !== 2) {
            TipsManager.createTips(`Only support when there is 2 stars existing`);
            return;
        }
        this.preNode.addChild(this.childNode);
        this.preNode.off(cc.Node.EventType.CHILD_ADDED, childAdded, this);
    },

    removingChild () {
        this.resetChildNode();
        function childRemoved (child) {
            this.tip.string = `Remove_child successd\n zIndex order: ${this.getChildrenContent()}`;
            console.log(child);
        }
        this.preNode.on(cc.Node.EventType.CHILD_REMOVED, childRemoved, this);
        if (this.preNode.children.length !== 3) {
           TipsManager.createTips(`Only support when there is 3 stars existing`);
           return;
        }
        this.preNode.removeChild(this.childNode);
        this.preNode.off(cc.Node.EventType.CHILD_REMOVED, childRemoved, this);
    },

    reorderChild () {
        this.resetChildNode();
        function childReordered (parent) {
            this.tip.string = `Reorder_child successd\n zIndex order: ${this.getChildrenContent()}`;
            console.log(parent);
        }
        this.preNode.on(cc.Node.EventType.CHILD_REORDER, childReordered, this);
        this.preNode.children[0].zIndex = 10;
        this.preNode.sortAllChildren();
        this.preNode.off(cc.Node.EventType.CHILD_REORDER, childReordered, this);
    },

    changeGroup () {
        this.resetNode();
        function groupChanged (node) {
            this.tip.string = `Group_changed successd: ${this.basicNode.group}`;
            console.log(node);
        }
        this.basicNode.on(cc.Node.EventType.GROUP_CHANGED, groupChanged, this);
        this.basicNode.group = 'Collider';
        this.basicNode.off(cc.Node.EventType.GROUP_CHANGED, groupChanged, this);
    },

    resetNode () {
        this.basicNode.x = -200;
        this.basicNode.y = 75;
        this.basicNode.scaleX = 1
        this.basicNode.scaleY = 1;
        this.basicNode.width = 256;
        this.basicNode.height = 256;
        this.basicNode.anchorX = 0.5;
        this.basicNode.anchorY = 0.5;
        this.basicNode.color = new cc.Color(255, 255, 255);
        this.basicNode.group = 'Default';
    },

    resetChildNode () {
        let children = this.preNode.children;
        for (let i = 0; i < children.length; i++) {
            switch (children[i].name) {
                case 'star1':
                    children[i].zIndex = 0;
                    break;
                case 'star2':
                    children[i].zIndex = 1;
                    break;
                case 'star3':
                    children[i].zIndex = 2;
                    break;
            }
        }
        this.preNode.sortAllChildren();
    },

    getChildrenContent () {
        let str = '';
        let children = this.preNode.children.sort((a, b) => {
            return a.zIndex - b.zIndex;
        });

        let tempObj = children[0];
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.zIndex > tempObj.zIndex) {
                tempObj = child;
            }
            str += `${child.name} `;
            child.color = new cc.Color(255, 255, 255);
        }
        tempObj.color = new cc.Color(255, 0, 0);
        return str;
    }
});
