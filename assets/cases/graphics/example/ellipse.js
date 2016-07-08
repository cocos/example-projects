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

        g.lineWidth = 10;
        g.fillColor = cc.hexToColor('#ff0000');

        g.circle(150,0, 100);
        
        g.ellipse(-150,0, 100,70);

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
