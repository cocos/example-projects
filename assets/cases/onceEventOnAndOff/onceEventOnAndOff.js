cc.Class({
    extends: cc.Component,

    /** 属性栏
     *  button： 被注册事件的触发按钮
     *  label： 被注册事件出发时加一后的数字显示处
     *  _count： 注册事件显示的数字
     */
    properties: {
        button: cc.Button,
        label: cc.Label,
        _count: 0
    },

    // 加一事件的逻辑实现
    onClick: function (button) {
        this._count++;
        this.label.string = this._count;
    },

    // 加一事件注册按钮的逻辑实现
    eventOn: function () {
        if (!this.button) 
            return;
        
        this.button.node.once(cc.Node.EventType.TOUCH_START,this.onClick,this);
    },

    // 加一事件注销按钮的逻辑实现
    eventOff: function () {
        if(!this.button)
            return;

        this.button.node.off(cc.Node.EventType.TOUCH_START,this.onClick,this);
    },


});
