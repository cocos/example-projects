const MAX_VALUE = 5;
const TIPS_STR = 'repeat count: '+ MAX_VALUE +' / value';

cc.Class({
    extends: cc.Component,

    properties: {
        tips: cc.Label
    },

    // use this for initialization
    onLoad () {
        this.setTips(0);
        let count = 0;
        let action1 = cc.delayTime(1);
        let action2 = cc.callFunc(() => {
            count++;
            this.setTips(count);
        }, this);
        this.node.runAction(cc.repeat(cc.sequence(action1, action2), 5));
    },

    setTips (count) {
        this.tips.string = TIPS_STR.replace(/value/, count);
    }

});
