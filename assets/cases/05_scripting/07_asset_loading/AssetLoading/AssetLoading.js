const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        showWindow: cc.Node,
        loadAnimTestPrefab: cc.Prefab,
        loadTips: cc.Label,
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
            // Raw Asset
            Audio: "test assets/audio",
            Txt: "test assets/text",
            Texture: "test assets/PurpleMonster",
            Font: "test assets/font",
            // Raw Asset, use raw url
            Plist: cc.url.raw("resources/test assets/atom.plist"),
            // Asset
            SpriteFrame: "test assets/image",
            Prefab: "test assets/prefab",
            Animation: "test assets/sprite-anim",
            Scene: "test assets/scene",
            Spine: "spineboy/spineboy",
        };
        // registered event
        this._onRegisteredEvent();
    },

    _onRegisteredEvent: function () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    },

    _onClick: function (event) {
        if (this._isLoading) {
            return;
        }

        this._onClear();

        this._curType = event.target.name.split('_')[1];
        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.1") + this._lastType;
        }

        this._lastType = this._curType;

        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");

        this.loadTips.textKey = this._curType + " Loading....";
        this._isLoading = true;

        this._load();
    },

    _load: function () {
        var url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
                break;
            case 'Spine':
                // specify the type to avoid the duplicated name from spine atlas
                cc.loader.loadRes(url, sp.SkeletonData, loadCallBack);
                break;
            case 'Font':
                cc.loader.loadRes(url, cc.Font, loadCallBack);
                break;
            case 'Animation':
            case 'Prefab':
            case 'Scene':
            case 'Texture':
            case 'Txt':
            case 'Audio':
                cc.loader.loadRes(url, loadCallBack);
                break;
            default:
                cc.loader.load(url, loadCallBack);
                break;
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
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.2");
        }
        else {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.3");
        }
        this._btnLabel.textKey += this._curType;
        this.loadTips.textKey = this._curType + " Loaded Successfully!";
    },

    _onClear: function () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    },

    _onShowResClick: function (event) {
        if (this._curType === "Scene") {
            cc.director.runScene(this._curRes.scene);
            cc.loader.releaseAsset(this._curRes);
            this._curRes = null;

            return;
        }
        this._createNode(this._curType, this._curRes);
    },

    _createNode: function (type, res) {
        this.loadTips.textKey = "";
        var node = new cc.Node("New " + type);
        node.setPosition(0, 0);
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
                this.loadTips.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.4");
                break;
            case "Txt":
                component = node.addComponent(cc.Label);
                component.lineHeight = 40;
                component.string = res;
                break;
            case "Font":
                component = node.addComponent(cc.Label);
                component.font = res;
                component.lineHeight = 40;
                component.string = "This is BitmapFont!";
                break;
            case "Plist":
                component = node.addComponent(cc.ParticleSystem);
                component.file = this._urls.Plist;
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
            case "Spine":
                component = node.addComponent(sp.Skeleton);
                component.skeletonData = res;
                component.animation = "walk";
                node.y = -248;
                break;
        }
        this.showWindow.addChild(node);
    }
});
