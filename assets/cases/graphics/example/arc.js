cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.WHITE );
        }

        var g = this.getComponent(cc.Graphics);

        g.lineWidth = 5;
        g.fillColor = cc.hexToColor('#ff0000');
        
        g.arc(0, 0, 100, Math.PI/2, Math.PI, false);
        g.lineTo(0, 0);
        g.close();

        g.stroke();
        g.fill();

        g.fillColor = cc.hexToColor('#00ff00');

        g.arc(-10, 10, 100, Math.PI/2, Math.PI, true);
        g.lineTo(-10, 10);
        g.close();

        g.stroke();
        g.fill();
    },

    onDisable: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.BLACK );
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
