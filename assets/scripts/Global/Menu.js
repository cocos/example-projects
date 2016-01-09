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
        this.currentSceneUrl = '';
    },

    backToList: function () {
        cc.director.loadScene('TestList');
    },

    loadScene: function (url) {
        console.log('url: ' + url);
        this.currentSceneUrl = url;
        cc.director.loadScene(url);
    },

    onLoadSceneFinish: function () {
        console.log('scene url: ' + this.currentSceneUrl);
        this.sceneList = cc.find('Canvas/testList/viewport/list');
    },

    showReadme: function () {

    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
