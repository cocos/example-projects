cc.Class({
    extends: cc.Component,

    properties: {
       buttons: [cc.Node]
    },

    // use this for initialization
    onLoad: function () {
    	cc.director.setDisplayStats(true);
    	var g = this.getComponent(cc.Graphics);
    	if(g) {
	   		g.lineWidth = 10;
	        g.fillColor = cc.hexToColor('#ff0000');
	        
	        g.moveTo(-20, 0);
	        g.lineTo(0, -100);
	        g.lineTo(20, 0);
	        g.lineTo(0, 100);
	        g.close();

	        g.stroke();
	        g.fill();
    	}

     
    },

    spawnGameObject: function (event, data) {
    	cc.log("data : = " +　data)
    	var node = this.buttons[data|0];
    	node.runAction(cc.sequence(cc.moveBy(1, cc.p(600,0)), cc.moveBy(1, cc.p(-600,0))));
    },

    onDestroy: function () {
    	cc.director.setDisplayStats(false);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
