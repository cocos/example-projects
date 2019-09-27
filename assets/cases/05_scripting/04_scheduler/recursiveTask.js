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
