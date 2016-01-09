cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: {
            default: null,
            type: cc.Node
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        spawnCount: 0,
        totalCount: 0,
        spacing: 0,
        display: {
        	default: null,
        	type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
    	this.content = this.scrollView.content;
    	this.initialSpawn();
    },

    initialSpawn: function () {
    	for (let i = 0; i < this.spawnCount; ++i) {
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		this.content.height = item.height * ( i + 1 ) + this.spacing * (i + 2);
    		this.updateItem(item, i);
    	}
    },

    updateItem: function(item, index) {
    	cc.find('label', item).getComponent(cc.Label).string = 'Item #' + index;
    },

    update: function() {
    	this.display.string = this.scrollView.getContentPosition();
    }
});