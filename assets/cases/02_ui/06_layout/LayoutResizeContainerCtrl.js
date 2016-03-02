cc.Class({
    extends: cc.Component,

    properties: {
        itemTemp: {
            default: null,
            type: cc.Prefab
        },
        layoutHorizontalNum: 5,
        layoutHorizontal: {
            default: null,
            type: cc.Node
        },
        layoutVerticalNum: 3,
        layoutVertical: {
            default: null,
            type: cc.Node
        },
        gridLayoutAxisHorizontalNum: 10,
        gridLayoutAxisHorizontal: {
            default: null,
            type: cc.Node
        },
        gridLayoutAxisVerticalNum: 12,
        gridLayoutAxisVertical: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        this._curTime = 0;
        this._curIndex = 0;
    },

    _createItem: function (parentNode, idx) {
        var item = cc.instantiate(this.itemTemp);
        var label = item.getComponentInChildren(cc.Label);
        label.string = idx;
        item.parent = parentNode;
    },

    update: function (dt) {
        this._curTime += dt;
        if (this._curTime >= 1) {
            this._curTime = 0;
            if (this._curIndex < this.layoutHorizontalNum) {
                this._createItem(this.layoutHorizontal, this._curIndex);
            }
            if (this._curIndex < this.layoutVerticalNum) {
                this._createItem(this.layoutVertical, this._curIndex);
            }
            if (this._curIndex < this.gridLayoutAxisHorizontalNum) {
                this._createItem(this.gridLayoutAxisHorizontal, this._curIndex);
            }
            if (this._curIndex < this.gridLayoutAxisVerticalNum) {
                this._createItem(this.gridLayoutAxisVertical, this._curIndex);
            }
            this._curIndex++;
        }
    }

});
