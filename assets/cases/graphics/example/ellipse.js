cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        var g = this.getComponent(cc.Graphics);

        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');

        g.circle(150,0, 100);
        
        g.ellipse(-150,0, 100,70);

        g.stroke();
        g.fill();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
