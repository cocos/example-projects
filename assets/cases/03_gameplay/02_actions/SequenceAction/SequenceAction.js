cc.Class({
    extends: cc.Component,

    properties: {
       label: {
           default: null,
           type: cc.Label
       },
    },

    start () {
        var startTime = 0; 
        const eachTime = 0.5;

        let sequence1 = cc.sequence(
            cc.moveBy(eachTime, cc.v2(0, -300)),
            cc.moveBy(eachTime / 2, cc.v2(0, 300)),
        ).repeat(2);

        let sequence2 = cc.sequence(
            cc.moveBy(eachTime, cc.v2(0, -200)),
            cc.moveBy(eachTime, cc.v2(0, 200)),
        ).repeat(2);

        this.node.runAction(
            cc.sequence(
                cc.callFunc(() => {
                    startTime = Date.now();
                }),
                sequence1,
                sequence2,
                cc.callFunc(() => {
                    var difference = Math.abs(Date.now() - startTime) / 1000;
                    if (difference - eachTime * 7 >= 0.05) {
                        this.label.string = "Failed - ElapseTime: " + difference.toFixed(1);
                        this.label.node.color = cc.color(255,0,0);
                    }
                    else {
                        this.label.string = "Succeed - ElapseTime: " + difference.toFixed(1);
                        this.label.node.color = cc.color(0,255,0);
                    } 
                })
            )
        );
    }
});
