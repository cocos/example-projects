cc.Class({
    extends: cc.Component,

    properties: {

        speed: 0.1,

        horizontal: {
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

    onLoad: function () {
        this.init_horizontal_Range = this.horizontal.fillRange * -1;
        this.init_round_range = this.radial_round.fillRange;
        this.init_semicircle_range = this.radial_semicircle.fillRange;
    },

    update: function (dt) {
        // 因为默认是从左往右的，为了从有到左所有这里 * -1
        this._updataFillStart(this.horizontal, this.init_horizontal_Range, this.speed, dt);
        this._updateFillRange(this.radial_round, this.init_round_range, this.speed, dt);
        this._updateFillRange(this.radial_semicircle, this.init_semicircle_range, this.speed, dt);
    },

    _updataFillStart: function (sprite, range, speed, dt) {
        var fillStart = sprite.fillStart;
        fillStart = fillStart > range ? fillStart -= (dt * speed) : 0;
        sprite.fillStart = fillStart;
    },
    
    _updateFillRange: function (sprite, range, speed, dt) {
        var fillRange = sprite.fillRange;
        fillRange = fillRange < range ? fillRange += (dt * speed) : 0;
        sprite.fillRange = fillRange;
    }

});
