cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        itemID: 0
    },

    updateItem: function(tmplId, itemId) {
        this.itemID = itemId;
        this.label.string = 'Tmpl#' + tmplId + ' Item#' + this.itemID;
    },
});
