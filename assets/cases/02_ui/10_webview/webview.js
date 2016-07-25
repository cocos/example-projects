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

    onWebFinishLoad: function () {
        this.labelStatus.string = "WebView loaded!";
    },

    visitURL: function () {
        this.webview.URL = this.url.string;
    }

});
