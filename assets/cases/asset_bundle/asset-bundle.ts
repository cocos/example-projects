const {ccclass, property} = cc._decorator;
import * as i18n from '../../i18n/i18n';

@ccclass
export default class AssetBundle extends cc.Component {

    @property(cc.Label)
    public loadTips: any = null;

    @property(cc.Node)
    public showWindow: cc.Node = null;

    @property({type: [cc.Label]})
    public labels: Array<cc.Label> = [];

    private _audioSource: cc.AudioSource = null;

    private _isLoading: Boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (testBundle) {
            this.labels[0].textKey = i18n.t("cases/AssetBundle.12");
        }
    }

    onClickBundle () {
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (testBundle || this._isLoading) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.textKey = "Bundle Loading....";
        cc.assetManager.loadBundle('TestBundle', (err) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.textKey = "Bundle loaded Successfully!";
            this.labels[0].textKey = i18n.t("cases/AssetBundle.12");
        });
    }

    onClickTexture () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.textKey = "cases/AssetBundle.9";
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.textKey = "Texture Loading....";
        testBundle.load("gold", (err: Error, asset: cc.Texture2D) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.textKey = "";
            var node = new cc.Node("New Node");
            node.setPosition(0, 0);
            let component = node.addComponent(cc.Sprite);
            component.spriteFrame = new cc.SpriteFrame(asset);
            this.labels[1].textKey = i18n.t("cases/AssetBundle.12");
            this.showWindow.addChild(node);
        });
    }

    onClickAudio () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.textKey = "cases/AssetBundle.9";
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.textKey = "Audio Loading....";
        testBundle.load("ss", (err: Error, asset: cc.AudioClip) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.textKey = "";
            var node = new cc.Node("New Node");
            node.setPosition(0, 0);
            let component = node.addComponent(cc.AudioSource);
            component.clip = asset;
            component.play();
            this._audioSource = component;
            this.loadTips.textKey = "cases/AssetBundle.15";
            this.labels[2].textKey = i18n.t("cases/AssetBundle.12");
            this.showWindow.addChild(node);
        });
    }

    onClickScene () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.textKey = "cases/AssetBundle.9";
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.textKey = "Scene Loading....";
        testBundle.loadScene("sub-scene", (err: Error, asset: cc.SceneAsset) => {
            if (err) {
                cc.log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.textKey = "";
            cc.director.runScene(asset);
        });
    }

    onClickDestroy () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.textKey = "cases/AssetBundle.9";
            return;
        }
        this._onClear();
        cc.assetManager.removeBundle(testBundle);
        this.loadTips.textKey = "cases/AssetBundle.17";
        this.labels[0].textKey = "cases/AssetBundle.2";
        this.labels[1].textKey = "cases/AssetBundle.4";
        this.labels[2].textKey = "cases/AssetBundle.3";
        this.labels[3].textKey = "cases/AssetBundle.5";
    }

    onClickRelease () {
        if (this._isLoading) return;
        var testBundle = cc.assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.textKey = "cases/AssetBundle.9";
            return;
        }
        this._onClear();
        testBundle.releaseAll();
        this.loadTips.textKey = "cases/AssetBundle.16";
        this.labels[1].textKey = "cases/AssetBundle.4";
        this.labels[2].textKey = "cases/AssetBundle.3";
        this.labels[3].textKey = "cases/AssetBundle.5";
    }

    _onClear () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    }

    // update (dt) {}
}