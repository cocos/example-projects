cc.Class({
    extends: cc.Component,

    properties: {
       horizontalBar: {
           type: cc.ProgressBar,
           default: null
       },
       horizontalBarReverse: {
           type: cc.ProgressBar,
           default: null
       },
       verticalBar: {
           type: cc.ProgressBar,
           default: null
       },
       verticalBarReverse: {
           type: cc.ProgressBar,
           default: null
       },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._updateProgressBar(this.horizontalBar, dt);
        this._updateProgressBar(this.verticalBar, dt);
        this._updateProgressBar(this.horizontalBarReverse, dt);
        this._updateProgressBar(this.verticalBarReverse, dt);
    },
    
    _updateProgressBar: function(progressBar, dt){
        var progress = progressBar.progress;
        if(progress < 1.0){
            progress += dt;
        }
        else {
            progress = 0;
        }
        progressBar.progress = progress;
    }
});
