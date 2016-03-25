cc.Class({
    extends: cc.Component,

    properties: {
        showWindow: {
            default: null,
            type: cc.Node
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
        this._lastType = "";
        this._curRes = null;
        this._curLabel = null;
        this._audioSource = null;
        // add load res url
        this._urls = {
            // Raw Asset, need extension
            Audio: cc.url.raw("resources/test assets/audio.mp3"),
            Txt: cc.url.raw("resources/test assets/text.txt"),
            Font: cc.url.raw("resources/test assets/font.fnt"),
            Plist: cc.url.raw("resources/test assets/atom.plist"),
            Texture: cc.url.raw("resources/test assets/image.png"),
            // Asset, no extension
            SpriteFrame: "resources://test assets/image.png/image",
            Prefab: "resources://test assets/prefab",
            Animation: "resources://test assets/anim",
            Scene: "resources://test assets/scene"
        };
        // registered event
        this._onRegisteredEvent();
    },

    _onRegisteredEvent () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    },

    _onClick (event) {
        this._onClear();
        this._lastType = this._curType;
        this._curType = event.target.name.split('_')[1];
        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);
            return;
        }
        if (this._curLabel) {
            this._curLabel.string = "Loaded " + this._curType;
        }
        this._curLabel = event.target.getChildByName("Label").getComponent("cc.Label");
        this.loadTips.string = this._curType + " Loading....";
        if (this._curType == "Animation") {
            this._loadSpriteAnimation();
        }
        else if (this._curType == "SpriteFrame" || this._curType == "Prefab" ||
                 this._curType == "Scene" ) {
            cc.loader.loadRes(this._urls[this._curType], this._loadCallBack.bind(this));
        }
        else {
            cc.loader.load(this._urls[this._curType], this._loadCallBack.bind(this));
        }
    },

    _loadCallBack: function (err, res) {
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        this._curRes = res;
        if (this._curType === "Audio") {
            this._curLabel.string = "Play ";
        }
        else {
            this._curLabel.string = "Create ";
        }
        this._curLabel.string += this._curType;
        this.loadTips.string = this._curType + " Loaded Successfully !";
    },

    _onClear () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    },

    _onShowResClick (event) {
        if (this._curType === "Scene") {
            cc.director.runScene(this._curRes.scene);
            return;
        }
        this._createNode(this._curType, this._curRes);
    },

    _createNode (type, res) {
        this.loadTips.string = "";
        var node = new cc.Node("New " + type);
        var component = null;
        switch (this._curType) {
            case "SpriteFrame":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = res;
                break;
            case "Texture":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Audio":
                component = node.addComponent(cc.AudioSource);
                component.clip = res.src;
                component.play();
                this._audioSource = component;
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
        this.showWindow.addChild(node);
        node.setPosition(0, 0);
    },

    _loadSpriteAnimation () {
        let plistUrl = 'resources://test assets/atlas.png';
        let pngUrl = 'resources://test assets/atlas.plist';
        let animUrl = 'resources://test assets/sprite-anim';
        cc.loader.loadRes([plistUrl, pngUrl], function(errs, results) {
            cc.loader.loadRes(animUrl, function(err, res) {
                this._loadCallBack(err, res)
            }.bind(this));
        }.bind(this));
    }
});
