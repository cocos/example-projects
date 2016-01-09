cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
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

    // use this for initialization
    onLoad: function () {
        var scenes = cc.game._sceneInfos;
        var list = {};
        if (scenes) {
            var i, j;
            for (i = 0; i < scenes.length; ++i) {
                let url = scenes[i].url;
                let dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                let scenename = cc.path.basename(url, '.fire');
                if (scenename === 'TestList') continue;

                if (!dirname) dirname = '_root';
                if (!list[dirname]) {
                    list[dirname] = {};
                }
                list[dirname][scenename] = url;
            }

            var dirs = Object.keys(list);
            dirs.sort();
            var y = -50;

            for (i = 0; i < dirs.length; ++i) {
                let dirname = dirs[i];
                let item = this.createItem(100, y, dirname);
                item.getComponent(cc.Widget).left = 60;
                item.getComponent(cc.Sprite).enabled = false;
                y -= 50;
                let scenenames = Object.keys(list[dirname]);
                scenenames.sort();
                for (j = 0; j < scenenames.length; ++j) {
                    let name = scenenames[j];
                    let url = list[dirname][name];
                    let item = this.createItem(200, y, name, url);
                    item.getComponent(cc.Widget).left = 120;
                    item.color = cc.Color.WHITE;
                    y -= 50;
                }
            }
            this.node.height = Math.abs(y) + 30;
        }
    },
});
