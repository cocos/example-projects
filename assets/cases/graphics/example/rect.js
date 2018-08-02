cc.Class({
    extends: cc.Component,


    // use this for initialization
    onLoad: function () {
        var g = this.getComponent(cc.Graphics);

        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');
        
        // rect
        g.rect(-250,0, 200,100);

        // round rect
        g.roundRect(50,0, 200,100, 20);

        g.stroke();
        g.fill();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
