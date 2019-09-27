const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        tmplID: 0,
        itemID: 0,
    },
    
    onLoad: function () {
        this.node.on('touchend', function () {
            console.log("Item " + this.itemID + ' clicked');
        }, this);
    },

    initItem: function (tmplID, itemID) {
        this.tmplID = tmplID;
        this.itemID = itemID;
        this.label.textKey = i18n.t("cases/02_ui/05_scrollView/Item.js.1") + this.tmplID + ' Item#' + this.itemID;
    },

    updateItem: function(itemID) {
        this.itemID = itemID;
        this.label.textKey = i18n.t("cases/02_ui/05_scrollView/Item.js.1") + this.tmplID + ' Item#' + this.itemID;
    },
});
