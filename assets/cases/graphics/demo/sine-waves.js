// https://github.com/isuttell/sine-waves

/************************************************
 * @file  Constants
 * @author  Isaac Suttell
 ************************************************/
 
/**
 * For radian conversion
 *
 * @constant
 * @type    {Number}
 */
var PI180 = Math.PI / 180;

/**
 * Twice of PI
 *
 * @constant
 * @type {Number}
 */
var PI2 = Math.PI * 2;

/**
 * Half of PI
 *
 * @constant
 * @type {Number}
 */
var HALFPI = Math.PI / 2;

/************************************************
 * @file  Left to right easing functions
 * @author Isaac Suttell
 ************************************************/

/**
 * This holds all of the easing objects and can be added to by the user
 *
 * @type    {Object}
 */
var Ease = {};

/**
 * Do not apply any easing
 *
 * @param  {Number} percent   where in the line are we?
 * @param  {Number} amplitude the current strength
 *
 * @return {Number}           the new strength
 */
Ease.linear = function(percent, amplitude) {
  return amplitude;
};

/**
 * Easing function to control how string each wave is from
 * left to right
 *
 * @param  {Number} percent   where in the line are we?
 * @param  {Number} amplitude the current strength
 *
 * @return {Number}           the new strength
 */
Ease.sinein = function(percent, amplitude) {
  return amplitude * (Math.sin(percent * Math.PI - HALFPI) + 1) * 0.5;
};

/**
 * Easing function to control how string each wave is from
 * left to right
 *
 * @param  {Number} percent   where in the line are we?
 * @param  {Number} amplitude the current strength
 *
 * @return {Number}           the new strength
 */
Ease.sineout = function(percent, amplitude) {
  return amplitude * (Math.sin(percent * Math.PI + HALFPI) + 1) * 0.5;
};

/**
 * Easing function to control how string each wave is from
 * left to right
 *
 * @param  {Number} percent   where in the line are we?
 * @param  {Number} amplitude the current strength
 *
 * @return {Number}           the new strength
 */
Ease.sineinout = function(percent, amplitude) {
  return amplitude * (Math.sin(percent * PI2 - HALFPI) + 1) * 0.5;
};

let EaseEnumOptins = {};
for (let k in Ease) {
    EaseEnumOptins[k] = -1;
}
Ease.Enum = cc.Enum(EaseEnumOptins);

/************************************************
 * @file  Sine Wave functions
 * @author Isaac Suttell
 ************************************************/

/**
 * Holds the different types of waves
 *
 * @type    {Object}
 */
var Waves = {};

/**
 * Default Sine Waves
 *
 * @param    {Number}    x
 */
Waves.sine = function(x) {
  return Math.sin(x);
};


/**
 * Sign polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
 *
 * @param     {Number}    x
 *
 * @return    {Number}
 */
Waves.sign = function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};

/**
 * Square Waves
 *
 * @param    {Number}    x
 */
Waves.square = function(x) {
  return Waves.sign(Math.sin(x * PI2));
};

/**
 * Sawtooth Waves
 *
 * @param    {Number}    x
 */
Waves.sawtooth = function(x) {
  return (x - Math.floor(x + 0.5)) * 2;
};

/**
 * Triangle Waves
 *
 * @param    {Number}    x
 */
Waves.triangle = function(x) {
  return Math.abs(Waves.sawtooth(x));
};

let WavesEnumOptins = {};
for (let k in Waves) {
    WavesEnumOptins[k] = -1;
}
Waves.Enum = cc.Enum(WavesEnumOptins);


let Wave = cc.Class({
    name: 'Wave',

    properties: {
        timeModifier: 1,
        amplitude: 50,
        wavelength: 50,
        segmentLength: 10,
        lineWidth: 1,
        waveType: {
            default: Waves.Enum.sine,
            type: Waves.Enum
        },
        easeType: {
            default: Ease.Enum.sinein,
            type: Ease.Enum
        },
        strokeColor: cc.color(255, 255, 255, 100)
    }
});

let SineWaves = cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,

        waves: {
            default: function () {
                return [new Wave()];
            },
            type: [Wave]
        }
    },

    // use this for initialization
    onLoad: function () {
        this.time = 0;

        this.ctx = this.getComponent(cc.Graphics);
        this.ctx.lineCap = cc.Graphics.LineCap.BUTT;
        this.ctx.lineJoin = cc.Graphics.LineJoin.ROUND;

        let waves = this.waves;
        for (let i = 0, l = waves.length; i < l; i++) {
            waves[i].waveFn = Waves[Waves.Enum[waves[i].waveType]].bind(Waves);
            waves[i].easeFn = Ease[Ease.Enum[waves[i].easeType]].bind(Ease);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.ctx.clear();

        this.yAxis = cc.visibleRect.height/2;
        this.width = cc.visibleRect.width;

        this.waveWidth = this.width * 0.95;
        this.waveLeft = this.width * 0.25;

        this.time += dt;

        // Draw each line
        let waves = this.waves;
        for (let i = 0, l = waves.length; i < l; i++) {
            var timeModifier = this.waves[i].timeModifier || 1;
            this.drawWave(this.time * timeModifier, waves[i]);
        }
    },

    /**
     * Draws one line on the canvas
     *
     * @param  {Number} time    current internal clock time
     * @param  {Object} options wave options
     */
    drawWave: function (time, options) {
        // Styles
        this.ctx.lineWidth = options.lineWidth;
        this.ctx.strokeColor = options.strokeColor;

        // Starting Line
        this.ctx.moveTo(0, this.yAxis);
        this.ctx.lineTo(this.waveLeft, this.yAxis);

        for (let i = 0; i < this.waveWidth; i += options.segmentLength) {
            // Calculate where the next point is
            let point = this.getPoint(time, i, options);

            // Draw to it
            this.ctx.lineTo(point.x, point.y);
        }

        // Ending Line
        this.ctx.lineTo(this.width, this.yAxis);

        // Stroke it
        this.ctx.stroke();
    },

    /**
     * Calculate the x, y coordinates of a point in a sine wave
     *
     * @param  {Number} time     Internal time index
     * @param  {Number} position Pixels x poistion
     * @param  {Object} options  Wave options
     *
     * @return {Object}          {x, y}
     */
    getPoint: function(time, position, options) {
        var x = (time * this.speed) + (-this.yAxis + position) / options.wavelength;
        var y = options.waveFn(x);

        // Left and Right Sine Easing
        var amplitude = options.easeFn(position / this.waveWidth, options.amplitude);

        x = position + this.waveLeft;
        y = amplitude * y + this.yAxis;

        return {
            x: x,
            y: y
        };
    }
});

module.exports = SineWaves;
