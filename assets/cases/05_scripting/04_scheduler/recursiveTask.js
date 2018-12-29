// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        label: require('LabelLocalized')
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    run () {
        this.schedule(this.task1, 1, 0, 1);
    },

    task1: function () {
        this.unschedule(this.task1);
        this.label.textKey = 'cases/05_scripting/04_scheduler/recursiveScheduler.fire.1';
        this.schedule(this.task2, 1, 0, 1);
    },

    task2: function () {
        this.label.textKey = 'cases/05_scripting/04_scheduler/recursiveScheduler.fire.2';
    }
});
