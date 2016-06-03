const i18n = require('i18n');


var emptyFunc = function (event) {
    event.stopPropagation();
};

cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type: cc.Label
        },
        readme: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        btnInfo: {
            default: null,
            type: cc.Button
        },
        btnBack: {
            default: null,
            type: cc.Button
        }
    },

    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.contentPos = null;
        this.isMenu = true;
        this.loadInstruction(this.currentSceneUrl);
    },

    backToList: function () {
        this.showReadme(null, false);
        this.currentSceneUrl = 'TestList.fire';
        this.isMenu = true;
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function (url) {
        this.contentPos = cc.find('Canvas/testList').getComponent(cc.ScrollView).getContentPosition();
        this.currentSceneUrl = url;
        this.isMenu = false;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);
        if (this.isMenu && this.contentPos) {
            cc.find('Canvas/testList').getComponent(cc.ScrollView).setContentPosition(this.contentPos);
        }
    },

    loadInstruction: function (url) {
        let self = this;
        let urlArr = url.split('/');
        let fileName = urlArr[urlArr.length - 1].replace('.fire', '');
        cc.loader.loadRes('readme/' + fileName, function(err, txt) {
            if (err) {
                self.text.string = i18n.t("scripts/Global/Menu.js.1");
                return;
            }
            self.text.string = txt;
        });
    },

    showReadme: function (event, active) {
        if (active === undefined) {
            this.readme.active = !this.readme.active;
        }
        else {
            this.readme.active = active;
        }
        if (this.readme.active) {
            this.mask.on('touchstart', emptyFunc, this);
        } else {
            this.mask.off('touchstart', emptyFunc, this);
        }
        let labelTxt = this.readme.active ? '关闭说明' : '查看说明';
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).textKey = labelTxt;
    }
});
