cc.Class({
    extends: cc.Component,

    properties: {
        labelStatus: cc.Label,
        webview: cc.WebView,
        url: cc.EditBox
    },

    onWebFinishLoad: function (sender, event) {
        var loadStatus = "";
        if (event === cc.WebView.EventType.LOADED) {
            loadStatus = " is loaded!";
        } else if (event === cc.WebView.EventType.LOADING) {
            loadStatus = " is loading!";
        } else if (event === cc.WebView.EventType.ERROR) {
            loadStatus = ' load error!';
        }
        this.labelStatus.string = this.webview.url + loadStatus;
    },

    visitURL: function () {
        this.webview.url = this.url.string;
    }
});
