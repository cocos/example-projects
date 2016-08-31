cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        scrollView: cc.ScrollView,
        bufferZone: 0, // when item is away from bufferZone, we relocate it
        interfaceList: [cc.String],
        scriptName: ""
    },

    onLoad () {
        this.initItemCount = this.interfaceList.length;
        this.itemList = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        this.initList();
        this.system = this.scrollView.getComponent(this.scriptName) ;
    },

    // use this for initialization
    initList () {
        let y = 0;
        this.node.height = (this.interfaceList.length + 1) * 50;
        for (let i = 0; i < this.initItemCount; ++i) {
            let item = cc.instantiate(this.itemPrefab).getComponent('AnySDKItem');
            let itemName = this.interfaceList[i];
            item.init(this);
            this.node.addChild(item.node);
            y -= 50;
            item.updateItem (i, y, itemName);
            this.itemList.push(item);
        }
    },
    
    invoke: function(index){
        if(index >= this.interfaceList.length) return;
        this.system[this.interfaceList[index]]();
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
        let items = this.itemList;
        let buffer = this.bufferZone;
        let isDown = this.node.y < this.lastContentPosY; // scrolling direction
        let offset = 50 * (this.initItemCount - 1);
        for (let i = 0; i < this.initItemCount; ++i) {
            let item = items[i];
            let itemNode = item.node;
            let viewPos = this.getPositionInView(itemNode);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && itemNode.y + offset < 0) {
                    let newIdx = item.index - (this.initItemCount - 1);
                    let newInfo = this.interfaceList[newIdx];
                    item.updateItem(newIdx, itemNode.y + offset, newInfo.name, newInfo.url );
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && itemNode.y - offset > -this.node.height) {
                    let newIdx = item.index + (this.initItemCount - 1);
                    let newInfo = this.interfaceList[newIdx];
                    item.updateItem(newIdx, itemNode.y - offset, newInfo.name, newInfo.url);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.node.y;
    },
});
