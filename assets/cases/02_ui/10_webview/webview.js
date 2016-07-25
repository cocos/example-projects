cc.Class({
    extends: cc.Component,

    properties: {
        labelStatus : {
            default: null,
            type: cc.Label
        },

        webview: {
            default: null,
            type: cc.WebView
        },

        url: {
            default: null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    onWebFinishLoad: function (sender, event) {
        if (event === cc.WebView.EventType.LOADED) {
            this.labelStatus.string = this.url.string + " loaded!";
        }
    },

    visitURL: function () {
        this.webview.URL = this.url.string;
    }

});
