cc.Class({
    extends: cc.Component,

    properties: {
        tip: cc.Label,
        graphics: cc.Graphics,
        _rightMenu:cc.Node,
        _rect: cc.Rect
    },

    start () {
        if (!cc.sys.isMobile || cc.sys.platform === cc.sys.ANDROID) {
            return;
        }
        this._rect = cc.sys.getSafeAreaRect();
        let canvasRect = cc.winSize;
        this._rect = this.convertToLocationCanvas(this._rect);
        this.graphics.rect(-canvasRect.width / 2 + this._rect.x, -canvasRect.height / 2 + this._rect.y, this._rect.width, this._rect.height)
        this.graphics.fillColor = new cc.color(241, 148, 138, 66);
        this.graphics.fill();
        this.graphics.stroke();
        this.tip.string = this._rect;

         // move menu btns to safe area
        this._rightMenu = cc.find('Menu/Right Menu');
        this._rightMenu.x -= this._rect.x;
    },

    convertToLocationCanvas (rect) {
        let ratioX = cc.view.getScaleX();
        let ratioY = cc.view.getScaleY();
        return cc.rect(rect.x / ratioX, rect.y / ratioY, rect.width / ratioX, rect.height / ratioY);
    },

    onDisable () {
        this._rightMenu.x += this._rect.x;
    }
});
