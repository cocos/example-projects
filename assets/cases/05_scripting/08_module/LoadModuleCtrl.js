cc.Class({
    extends: cc.Component,

    properties: {
        monsterTemp: {
            default: null,
            type: cc.Prefab
        },
        btn_createMonster: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.btn_createMonster.on(cc.Node.EventType.TOUCH_END, this.createMoster.bind(this));
    },

    createMoster: function () {
        var monster = cc.instantiate(this.monsterTemp);
        var Monster = require("Monster");
        var monsterComp = monster.getComponent(Monster);
        var InitData = require("InitData");
        monsterComp.initInfo(InitData.monsterInfo);
        monster.parent = this.node;
        monster.setPosition(cc.p(0, 0));
        this.btn_createMonster.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
