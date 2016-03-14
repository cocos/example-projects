cc.Class({
    extends: cc.Component,

    properties: {

        speed: 0.1,

        horizontal: {
            default: null,
            type: cc.Sprite
        },

        vertical: {
            default: null,
            type: cc.Sprite
        },

        radial_round: {
            default: null,
            type: cc.Sprite
        },

        radial_semicircle: {
            default: null,
            type: cc.Sprite
        }
    },

    update: function (dt) {
        // update fill start
        this._updataFillStart(this.horizontal, dt);
        this._updataFillStart(this.vertical, dt);
        // update fill range
        this._updateFillRange(this.radial_round, 1, dt);
        this._updateFillRange(this.radial_semicircle, 0.5, dt);
    },

    _updataFillStart: function (sprite, dt) {
        var fillStart = sprite.fillStart;
        fillStart = fillStart > 0 ? fillStart -= (dt * this.speed) : 1;
        sprite.fillStart = fillStart;
    },

    _updateFillRange: function (sprite, range, dt) {
        var fillRange = sprite.fillRange;
        fillRange = fillRange < range ? fillRange += (dt * this.speed) : 0;
        sprite.fillRange = fillRange;
    }

});
