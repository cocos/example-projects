
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
        this.loadInstruction(this.currentSceneUrl);
    },

    backToList: function () {
        this.showReadme(false);
        this.currentSceneUrl = 'TestList.fire';
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function (url) {
        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);
    },

    loadInstruction: function (url) {
        let self = this;
        let mdUrl = url.replace(/\.fire$/, '.md').replace('db://assets/', '');
        cc.loader.loadTxt(cc.url.raw(mdUrl), function(err, txt) {
            if (err) {
                self.text.string = '说明暂缺';
                return;
            }
            self.text.string = txt;
        } );
    },

    showReadme: function (active) {
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
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).string = labelTxt;
    },
});
