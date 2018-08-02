let LineJoin = cc.Graphics.LineJoin;
let LineCap = cc.Graphics.LineCap;

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        this.graphics = this.getComponent(cc.Graphics);
        this.graphics.lineWidth = 20;
        
        this.time = 0;
        this.radius = 100;

        this.draw();
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.time += dt * 0.5;
        this.draw();
    },

    draw: function () {
        let graphics = this.graphics;
        graphics.clear();

        let rx = this.radius * Math.sin(this.time);
        let ry = -this.radius * Math.cos(this.time);

        // line join
        graphics.lineCap = LineCap.BUTT;

        graphics.lineJoin = LineJoin.BEVEL;
        this.drawLine(-200, 0, rx, ry);

        graphics.lineJoin = LineJoin.MITER;
        this.drawLine(0, 0, rx, ry);

        graphics.lineJoin = LineJoin.ROUND;
        this.drawLine(200, 0, rx, ry);

        // line cap
        graphics.lineJoin = LineJoin.MITER;

        graphics.lineCap = LineCap.BUTT;
        this.drawLine(0, -125, rx, ry);

        graphics.lineCap = LineCap.SQUARE;
        this.drawLine(-200, -125, rx, ry);

        graphics.lineCap = LineCap.ROUND;
        this.drawLine(200, -125, rx, ry);
    },

    drawLine: function (x, y, rx, ry) {
        let graphics = this.graphics;

        graphics.moveTo(x + rx, y + ry);
        graphics.lineTo(x, y);
        graphics.lineTo(x - rx, y + ry);
        graphics.stroke();
    }
});
