cc.Class({
    extends: cc.Component,

    properties: {
        positionMessage: cc.Label,
    },

    clickme (event) {
        var clickPosition = event.touch.getLocation();
        this.positionMessage.string = 'Clicked at: x = ' + parseInt(parseFloat(clickPosition.x)) + ', y = ' + parseInt(parseFloat(clickPosition.y));
    }
});
