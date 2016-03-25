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
        this._btnLabel = null;
        this._audioSource = null;
        this._isLoading = false;
        // add load res url
        this._urls = {
            // Raw Asset, need extension
            Audio: cc.url.raw("resources/test assets/audio.mp3"),
            Txt: cc.url.raw("resources/test assets/text.txt"),
            Font: cc.url.raw("resources/test assets/font.fnt"),
            Plist: cc.url.raw("resources/test assets/atom.plist"),
            Texture: cc.url.raw("resources/test assets/PurpleMonster.png"),
            // Asset, no extension
            SpriteFrame: "test assets/image.png/image",
            Prefab: "test assets/prefab",
            Animation: "test assets/anim",
            Scene: "test assets/scene",
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
        if (this._isLoading) { return; }

        this._onClear();

        this._curType = event.target.name.split('_')[1];
        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.string = "Loaded " + this._lastType;
        }

        this._lastType = this._curType;

        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");

        this.loadTips.string = this._curType + " Loading....";
        this._isLoading = true;
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
        this._isLoading = false;
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        this._curRes = res;
        if (this._curType === "Audio") {
            this._btnLabel.string = "Play ";
        }
        else {
            this._btnLabel.string = "Create ";
        }
        this._btnLabel.string += this._curType;
        this.loadTips.string = this._curType + " Loaded Successfully!";
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
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.string = "Playing Music.";
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
        let plistUrl = 'test assets/atlas.png';
        let pngUrl = 'test assets/atlas.plist';
        let animUrl = 'test assets/sprite-anim';
        cc.loader.load([plistUrl, pngUrl], function(errs, results) {
            cc.loader.loadRes(animUrl, function(err, res) {
                this._loadCallBack(err, res)
            }.bind(this));
        }.bind(this));
    }
});
