// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import * as i18n from '../../../../i18n/i18n';

@ccclass
export default class PreloadAssets extends cc.Component {

    @property(cc.Label)
    public loadTips: any = null;

    @property(cc.Node)
    public showWindow: cc.Node = null;

    @property(cc.Prefab)
    public loadAnimTestPrefab: cc.Prefab = null;

    @property({type: [cc.Node]})
    public loadList: Array<cc.Node> = [];

    private _curType: string = '';

    private _lastType: string = '';

    private _btnLabel: any = null;

    private _audioSource: cc.AudioSource = null;

    private _isLoading: Boolean = false;

    private _urls: Record<string, string> = null;

    private _assets: Array<cc.Asset> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // add load res url
        this._urls = {
            Audio: "test_assets/audio",
            Txt: "test_assets/text",
            Texture: "test_assets/PurpleMonster",
            Font: "test_assets/font",
            Plist: "test_assets/atom",
            SpriteFrame: "test_assets/image",
            Prefab: "test_assets/prefab",
            Animation: "test_assets/sprite-anim",
            Scene: "test_assets/preloadscene",
            Spine: "spineboy/spineboy",
            Dir: "audio",
        };
        // registered event
        this._onRegisteredEvent();
    }

    _onRegisteredEvent () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    }

    _onClick (event) {
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
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/PreloadAssets.js.1") + this._lastType;
        }

        this._lastType = this._curType;

        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");

        this.loadTips.textKey = this._curType + " Loading....";
        this._isLoading = true;

        this._load();
    }

    _load () {
        var url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                cc.resources.preload(url, cc.SpriteFrame, loadCallBack);
                break;
            case 'Spine':
                // specify the type to avoid the duplicated name from spine atlas
                cc.resources.preload(url, sp.SkeletonData, loadCallBack);
                break;
            case 'Font':
                cc.resources.preload(url, cc.Font, loadCallBack);
                break;
            case 'Plist':
                cc.resources.preload(url, cc.ParticleAsset, loadCallBack);
                break;
            case 'Animation':
            case 'Prefab':
            case 'Texture':
            case 'Txt':
            case 'Audio':
                cc.resources.preload(url, loadCallBack);
                break;
            case 'Scene':
                cc.resources.preloadScene(url, loadCallBack);
                break;
            case 'Dir': 
                cc.resources.preloadDir(url, loadCallBack);
                break;
            default:
                break;
        }
    }

    _loadCallBack (err, res) {
        this._isLoading = false;
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        if (this._curType === "Audio") {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/PreloadAssets.js.2");
        }
        else {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/PreloadAssets.js.3");
        }
        this._btnLabel.textKey += this._curType;
        this.loadTips.textKey = this._curType + " preloaded Successfully!";
    }

    _onClear () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    }

    _onShowResClick (event) {
        let url = this._urls[this._curType];
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                cc.resources.load(url, cc.SpriteFrame, (err: Error, res: cc.Asset) => {
                    this._assets.push(res.addRef());
                    this._createNode(this._curType, res);
                });
                break;
            case 'Spine':
                // specify the type to avoid the duplicated name from spine atlas
                cc.resources.load(url, sp.SkeletonData, (err: Error, res: cc.Asset) => {
                    this._assets.push(res.addRef());
                    this._createNode(this._curType, res);
                });
                break;
            case 'Font':
                cc.resources.load(url, cc.Font, (err: Error, res: cc.Asset) => {
                    this._assets.push(res.addRef());
                    this._createNode(this._curType, res);
                });
                break;
            case 'Plist':
                cc.resources.load(url, cc.ParticleAsset, (err: Error, res: cc.Asset) => {
                    this._assets.push(res.addRef());
                    this._createNode(this._curType, res);
                });
                break;
            case 'Animation':
            case 'Prefab':
            case 'Texture':
            case 'Txt':
            case 'Audio':
                cc.resources.load(url, (err: Error, res: cc.Asset) => {
                    this._assets.push(res.addRef());
                    this._createNode(this._curType, res);
                });
                break;
            case 'Scene':
                cc.resources.loadScene(url, (err: Error, res: cc.SceneAsset) => {
                    cc.director.runScene(res);
                });
                break;
            case 'Dir': 
                cc.resources.loadDir(url, (err: Error, res: cc.Asset[]) => {
                    this.loadTips.textKey = "The asset loaded: ";
                    res.forEach((r) => {
                        this._assets.push(r.addRef());
                        this.loadTips.textKey += `${r.name};`;
                    });
                    
                });
                break;
            default:
                break;
        }
    }

    _createNode (type, res) {
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
            case "CORS":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Audio":
                component = node.addComponent(cc.AudioSource);
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.textKey = i18n.t("cases/05_scripting/07_asset_loading/PreloadAssets.js.4");
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
                component.file = res;
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

    onDestroy () {
        this._assets.forEach(x => x.decRef());
        this._assets = null;
    }

    // update (dt) {}
}
