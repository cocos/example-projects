const i18n = require('i18n');
const SceneList = require('SceneList');

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
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.contentPos = null;
        this.isMenu = true;
        this.loadInstruction(this.currentSceneUrl);
    },
    
    onEnable: function () {
        // for this component, onEnable should be called after
        // each time new scene launched
        var sceneListNode = cc.find('Canvas/testList/viewport/list');
        if (sceneListNode) {
            // in main scene
            this.sceneList = sceneListNode.getComponent('SceneList');
            this.sceneList.init(this);
        }
        else {
            // in other scene, this.sceneList should be destroyed
            this.sceneList = null;
        }
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

        // en: fix Collider DebugDraw always displayed on top of the problem.
        // zh：解决 Collider DebugDraw 一直显示在最上层的问题。
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.active) {
            this.showDebugDraw = enabledDebugDraw;
            cc.director.getCollisionManager().enabledDebugDraw = false;
        }
        else {
            cc.director.getCollisionManager().enabledDebugDraw = this.showDebugDraw;
        }
        // en: fix Video Player always displayed on top of the problem.
        // zh：修复 Video Player 一直显示在最上层的问题。
        var videoPlayer = cc.find('Canvas/VideoPlayer');
        if (videoPlayer) {
            videoPlayer.active = !this.readme.active;
        }
    }
});
