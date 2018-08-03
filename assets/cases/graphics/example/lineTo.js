cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        var g = this.getComponent(cc.Graphics);

        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');
        
        g.moveTo(-20, 0);
        g.lineTo(0, -100);
        g.lineTo(20, 0);
        g.lineTo(0, 100);
        g.close();

        g.stroke();
        g.fill();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
