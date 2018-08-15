cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: cc.Label,
        eventLabel: cc.Label,
    },
    
    setTimeDisplay (value) {
        this.timeLabel.string = value;
    },

    setEventDisplay (value) {
        this.eventLabel.string = value;
    },
});
