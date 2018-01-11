const i18n = require('i18n');
const SceneList = require('SceneList');

cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type: cc.Label
        },
        readme: {
            default: null,
            type: cc.ScrollView
        },
        btnInfo: {
            default: null,
            type: cc.Button
        },
        btnBack: {
            default: null,
            type: cc.Button
        },
        testList: {
            default: null,
            type: cc.ScrollView
        }
    },

    onLoad: function () {
        this._isLoadingScene = false;
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.contentPos = null;
        this.isMenu = true;
        this.btnBack.node.active = false;
        this.loadInstruction(this.currentSceneUrl);
        this.node.zIndex = 999;

        cc.game.addPersistRootNode(this.testList.node);
        if (this.testList && this.testList.content) {
            // in main scene
            this.sceneList = this.testList.content.getComponent('SceneList');
            this.sceneList.init(this);
        }
        if (typeof cocosAnalytics !== 'undefined' && cocosAnalytics.isInited()) {
            // Cocos Analytics service, to learn more please visit:
            // https://analytics.cocos.com/docs/
            cocosAnalytics.CAEvent.onEvent({
                eventName: "打开范例"
            });
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.b) {
                this.backToList();
            }
        }, this);

        this._updateInfoButton();
    },

    backToList: function () {
        if (this._isLoadingScene) {
            return;
        }
        this._isLoadingScene = true;
        this.showReadme(null, false);
        this.currentSceneUrl = 'TestList.fire';
        this.isMenu = true;
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function (url) {
        this._isLoadingScene = true;
        this.contentPos = this.testList.getContentPosition();
        this.currentSceneUrl = url;
        this.isMenu = false;
        this.testList.node.active = false;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
        if (typeof cocosAnalytics !== 'undefined' && cocosAnalytics.isInited()) {
            // Cocos Analytics service, to learn more please visit:
            // https://analytics.cocos.com/docs/
            cocosAnalytics.CALevels.begin({
                level: url
            });
        }
    },

    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);
        if (this.isMenu && this.contentPos) {
            this.btnBack.node.active = false;
            this.testList.node.active = true;
            this.testList.setContentPosition(this.contentPos);
        }
        else {
            this.btnBack.node.active = true;
            this.testList.node.active = false;
        }
        this._isLoadingScene = false;
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

    _updateInfoButton: function () {
        let labelTxt = i18n.t("scripts/Global/Menu.js." + (this.readme.node.active ? "view" : "hide") + ".info");
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).textKey = labelTxt;
    },

    showReadme: function (event, active) {
        if (active === undefined) {
            this.readme.node.active = !this.readme.node.active;
        }
        else {
            this.readme.node.active = active;
        }
        if (this.readme.node.active) {
            this.readme.scrollToTop();
        }
        this._updateInfoButton()

        // en: fix Collider DebugDraw always displayed on top of the problem.
        // zh：解决 Collider DebugDraw 一直显示在最上层的问题。
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.node.active) {
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
            videoPlayer.active = !this.readme.node.active;
        }
    },

    restart: function () {
        cc.game.restart();
    },
    
    gc: function () {
        cc.sys.garbageCollect();
    }
});
