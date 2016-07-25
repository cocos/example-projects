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
        var loadStatus = "";
        if(event === cc.WebView.EventType.LOADED) {
            loadStatus = " is loaded!";
        } else if(event === cc.WebView.EventType.LOADING) {
            loadStatus = " is loading!";
        } else if (event === cc.WebView.EventType.ERROR) {
            loadStatus = ' load error!';
        }
        this.labelStatus.string = this.url.string + loadStatus;
    },

    visitURL: function () {
        this.webview.url = this.url.string;
    }

});
