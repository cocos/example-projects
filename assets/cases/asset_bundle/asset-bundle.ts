const {ccclass, property} = cc._decorator;
import * as i18n from '../../i18n/i18n';

@ccclass
export default class AssetBundle extends cc.Component {

    @property(cc.Label)
    public loadTips: any = null;

    @property(cc.Node)
    public showWindow: cc.Node = null;

    @property({type: [cc.Node]})
    public loadList: Array<cc.Node> = [];

    private _curType: string = '';

    private _lastType: string = '';

    private _curRes: cc.Asset = null;

    private _btnLabel: any = null;

    private _audioSource: cc.AudioSource = null;

    private _isLoading: Boolean = false;

    private _urls: Record<string, string> = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // add load res url
        this._urls = {
            Audio: "ss",
            Texture: "gold",
            Scene: "sub-scene",
        };
        // registered event
        this._onRegisteredEvent();
    }

    _onRegisteredEvent () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (testBundle) {
            this.loadList[0].getChildByName("Label").getComponent("cc.Label").textKey = i18n.t("cases/AssetBundle.12") + 'Bundle';
        }
    }

    _onClick (event) {
        if (this._isLoading) {
            return;
        }

        this._onClear();

        this._curType = event.target.name.split('_')[1];

        if (this._curType === 'Destroy' || this._curType === 'Release') {
            var testBundle = cc.assetManager.getBundle('TestBundle');
            if (!testBundle) {
                this.loadTips.textKey = "cases/AssetBundle.9";
            }
            else {
                if (this._curType === 'Destroy') {
                    cc.assetManager.removeBundle(testBundle);
                    this.loadTips.textKey = "cases/AssetBundle.17";
                    this.loadList[0].getChildByName("Label").getComponent("cc.Label").textKey = "cases/AssetBundle.2";
                }
                else {
                    testBundle.releaseAll();
                    this.loadTips.textKey = "cases/AssetBundle.16";
                }
                
            }
            
            this.loadList[1].getChildByName("Label").getComponent("cc.Label").textKey = "cases/AssetBundle.4";
            this.loadList[2].getChildByName("Label").getComponent("cc.Label").textKey = "cases/AssetBundle.3";
            this.loadList[3].getChildByName("Label").getComponent("cc.Label").textKey = "cases/AssetBundle.5";
            this._curRes = null;
            this._btnLabel = null;
            this._lastType = this._curType;
            this._isLoading = false;
            return;
        }

        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.textKey = i18n.t("cases/AssetBundle.12") + this._lastType;
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
            case 'Texture':
            case 'Audio':
                var testBundle = cc.assetManager.getBundle('TestBundle');
                if (!testBundle) {
                    this.loadTips.textKey = "cases/AssetBundle.9";
                    this._isLoading = false;
                    return;
                }
                testBundle.load(url, loadCallBack);
                break;
            case 'Scene':
                var testBundle = cc.assetManager.getBundle('TestBundle');
                if (!testBundle) {
                    this.loadTips.textKey = "cases/AssetBundle.9";
                    this._isLoading = false;
                    return;
                }
                testBundle.loadScene(url, loadCallBack);
                break;
            case 'Bundle':
                var testBundle = cc.assetManager.getBundle('TestBundle');
                if (testBundle) {
                    this._isLoading = false;
                    return;
                }
                cc.assetManager.loadBundle(window['fsUtils'] && window['fsUtils'].subpackages['TestBundle'] ? 'subpackages/TestBundle' : 'assets/TestBundle', loadCallBack);
                break;
            default:
                break;
        }
    }

    _loadCallBack (err, res) {
        this._curRes = res;
        this._isLoading = false;
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        if (this._curType === "Audio") {
            this._btnLabel.textKey = i18n.t("cases/AssetBundle.15");
        }
        else if (this._curType === "Bundle") {
            this._btnLabel.textKey = i18n.t("cases/AssetBundle.12");
        }
        else {
            this._btnLabel.textKey = i18n.t("cases/AssetBundle.14");
        }
        this._btnLabel.textKey += this._curType;
        this.loadTips.textKey = this._curType + " loaded Successfully!";
    }

    _onClear () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    }

    _onShowResClick (event) {
        if (this._curType === "Scene") {
            cc.director.runScene(this._curRes);
            return;
        }
        this._createNode(this._curType, this._curRes);
    }

    _createNode (type, res) {
        this.loadTips.textKey = "";
        var node = new cc.Node("New " + type);
        node.setPosition(0, 0);
        var component = null;
        switch (this._curType) {
            case "Texture":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Audio":
                component = node.addComponent(cc.AudioSource);
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.textKey = "cases/AssetBundle.15";
                break;
            default:
                break;
        }

        this.showWindow.addChild(node);
    }

    // update (dt) {}
}