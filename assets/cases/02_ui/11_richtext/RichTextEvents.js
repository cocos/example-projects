cc.Class({
    extends: cc.Component,

    properties: {
        logMessage: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    clickme: function (event) {
        var clickPosition = event.touch.getLocation();
        this.logMessage.string = "Clicked at: " +parseFloat(clickPosition.x.toFixed())
            + ", y = " + parseFloat(clickPosition.y.toFixed(2));
    }

});
