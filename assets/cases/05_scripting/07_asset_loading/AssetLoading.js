cc.Class({
    extends: cc.Component,

    properties: {
        showWindow: {
            default: null,
            type: cc.Node
        },

        showResource: {
            default: null,
            type: cc.Node
        },

        showResourceLabel: {
            default: null,
            type: cc.Label
        },

        loadAnimTestPrefab: {
            default: null,
            type: cc.Prefab
        },

        loadTips: {
            default: null,
            type: cc.Label
        },

        loadList: {
            default: [],
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        // cur load Target
        this._curType = "";
        this._curRes = null;
        this._curNode = null;
        // add load res url
        this._urls = {
            Image: cc.url.raw("loadRes/image.png"),
            Audio: cc.url.raw("loadRes/audio.mp3"),
            Txt: cc.url.raw("loadRes/text.txt"),
            Font: cc.url.raw("loadRes/font.fnt"),
            Plist: cc.url.raw("loadRes/atom.plist"),
            Prefab: {
                src: "4f64edb9-7bc7-430f-a229-97ace8f02a04",
                type: "uuid"
            },
            Scene: {
                src: "00e919ea-2eda-473f-92ac-0abdcd582a6e",
                type: "uuid"
            },
            Animation: {
                src: "295cf1dc-f3ba-4d4e-b6e2-d4be6ee535aa",
                type: "uuid"
            }
        };
        // registered event
        this.onRegisteredEvent();
    },

    loadCallBack: function (err, res) {
        if (err) { return; }

        this._curRes = res;

        if (this._curType === "Audio") {
            this.showResourceLabel.string = "Play ";
        }
        else {
            this.showResourceLabel.string = "Create ";
        }
        this.showResourceLabel.string += this._curType;
        this.loadTips.string = this._curType + " Loaded Successfully !";
        this.showResource.active = true;
    },

    onRegisteredEvent: function () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.MOUSE_DOWN, this.onLoadResClick.bind(this));
        }
        this.showResource.on(cc.Node.EventType.MOUSE_DOWN, this.onShowResClick.bind(this));
        this.showResource.active = false;
    },

    onClear: function () {
        if (this._curNode) {
            this._curNode.destroy();
        }

        if (this._curRes instanceof cc.Audio) {
            this._curRes.stop();
        }
    },

    onLoadResClick: function (event) {
        this.onClear();
        this.showResource.active = false;
        this._curType = event.target.name.split('_')[1];
        this.loadTips.string = this._curType + " Loading....";
        cc.loader.load(this._urls[this._curType], this.loadCallBack.bind(this));
    },

    onShowResClick: function (event) {
        this.onClear();
        if (this._curType === "Scene") {
            cc.loader.release(this._urls.Scene.src);
            cc.director.runScene(this._curRes.scene);
        }
        else if (this._curType === "Audio") {
            this._curRes.play();
            this.loadTips.string = "Open sound music!!";
        }
        else {
            this._createNode(this._curType, this._curRes);
        }
    },

    _createNode: function (type, res) {
        this.loadTips.string = "";
        var node = new cc.Node("New " + type);
        node.parent = this.showWindow;
        var component = null;
        switch (this._curType) {
            case "Image":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Txt":
                component = node.addComponent(cc.Label);
                component.lineHeight = 40;
                component.string = res;
                break;
            case "Font":
                component = node.addComponent(cc.Label);
                component.file = this._urls.Font;
                component.lineHeight = 40;
                component.string = "This is Font!";
                break;
            case "Plist":
                component = node.addComponent(cc.ParticleSystem);
                component.file =  this._urls.Plist;
                component.resetSystem();
                break;
            case "Prefab":
                var prefab = cc.instantiate(res);
                prefab.parent = node;
                prefab.setPosition(0, 0);
                break;
            case "Animation":
                var loadAnim = cc.instantiate(this.loadAnimTestPrefab);
                loadAnim.parent = node;
                loadAnim.setPosition(0, 0);
                var AanimCtrl = loadAnim.getComponent(cc.Animation);
                AanimCtrl.addClip(res);
                AanimCtrl.play(res.name);
                break;

        }
        node.setPosition(0, 0);
        this._curNode = node;
    }

});
