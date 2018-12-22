const TipsManager = require('TipsManager');

const SceneList = cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        initItemCount: 0,
        scrollView: cc.ScrollView,
        bufferZone: 0, // when item is away from bufferZone, we relocate it
        searchBlock: cc.Node
    },

    createItem: function (x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent('ListItem');
        var label = itemComp.label;
        label.string = name;

        if (url) {
            itemComp.url = url;
        }

        // item.width = w;
        item.x = x;
        item.y = y;
        this.node.addChild(item);
        return item;
    },

    init (menu) {
        this.menu = menu;
        this.sceneList = [];
        this.itemList = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        TipsManager.init();
        this.initList();
    },

    // use this for initialization
    initList () {
        var scenes = cc.game._sceneInfos;
        var dict = {};

        if (scenes) {
            for (let i = 0; i < scenes.length; ++i) {
                let url = scenes[i].url;
                if (!url.startsWith('db://assets/cases/')) {
                    continue;
                }
                let dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                let scenename = cc.path.basename(url, '.fire');

                if (!dirname) dirname = '_root';
                if (!dict[dirname]) {
                    dict[dirname] = {};
                }
                dict[dirname][scenename] = url;
            }
        }
        else {
            cc.error('failed to get scene list!');
        }
        // compile scene dict to an array
        let dirs = Object.keys(dict);
        dirs.sort();
        for (let i = 0; i < dirs.length; ++i) {
            this.sceneList.push({
                name: dirs[i],
                url: null
            });
            let scenenames = Object.keys(dict[dirs[i]]);
            scenenames.sort();
            for (let j = 0; j < scenenames.length; ++j) {
                let name = scenenames[j];
                let url = dict[dirs[i]][name];
                this.sceneList.push({ name, url });
            }
        }
        let y = 0;
        this.node.height = (this.sceneList.length + 1) * 50;
        let initItemCount = Math.min(this.initItemCount, this.sceneList.length);
        for (let i = 0; i < initItemCount; ++i) {
            let item = cc.instantiate(this.itemPrefab).getComponent('ListItem');
            let itemInfo = this.sceneList[i];
            item.init(this.menu);
            this.node.addChild(item.node);
            y -= 50;
            item.updateItem (i, y, itemInfo.name, itemInfo.url);
            this.itemList.push(item);
        }

        // get item list in order to check the loadScene condition
        let searchComp = this.searchBlock.getComponent('SearchBlock');
        searchComp.init(this.menu);
        searchComp.setItemList(this.sceneList);
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
        let curItemCount = this.itemList.length;
        let offset = 50 * curItemCount;
        for (let i = 0; i < curItemCount; ++i) {
            let item = items[i];
            let itemNode = item.node;
            let viewPos = this.getPositionInView(itemNode);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && itemNode.y + offset < 0) {
                    let newIdx = item.index - curItemCount;
                    let newInfo = this.sceneList[newIdx];
                    item.updateItem(newIdx, itemNode.y + offset, newInfo.name, newInfo.url );
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && itemNode.y - offset > -this.node.height) {
                    let newIdx = item.index + curItemCount;
                    let newInfo = this.sceneList[newIdx];
                    item.updateItem(newIdx, itemNode.y - offset, newInfo.name, newInfo.url);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.node.y;
    },
});
