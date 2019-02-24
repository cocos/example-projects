cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        mixTime: 0.2
    },

    onLoad () {
        var spine = this.spine = this.getComponent('sp.Skeleton');
        this._setMix('walk', 'run');
        this._setMix('run', 'jump');
        this._setMix('walk', 'jump');
        
        spine.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
        });
        spine.setInterruptListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
        });
        spine.setEndListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        });
        spine.setDisposeListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
        });
        spine.setCompleteListener((trackEntry) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if (animationName === 'shoot') {
                this.spine.clearTrack(1);
            }
            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd); 
            cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
        });
        spine.setEventListener((trackEntry, event) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });

        this._hasStop = false;
    },
    
    // OPTIONS
    
    toggleDebugSlots () {
        this.spine.debugSlots = !this.spine.debugSlots;
    },
    
    toggleDebugBones () {
        this.spine.debugBones = !this.spine.debugBones;
    },
    
    toggleTimeScale () {
        if (this.spine.timeScale === 1.0) {
            this.spine.timeScale = 0.3;
        }
        else {
            this.spine.timeScale = 1.0;
        }
    },
    
    // ANIMATIONS
    
    stop () {
        this.spine.clearTrack(0);
        this._hasStop = true;
    },

    walk () {
        this.spine.setAnimation(0, 'walk', true);
        this._hasStop = false;
    },
    
    run () {
        this.spine.setAnimation(0, 'run', true);
        this._hasStop = false;
    },
    
    jump () {
        var oldAnim = this.spine.animation;
        this.spine.setAnimation(0, 'jump', false);
        if (oldAnim && !this._hasStop) {
            this.spine.addAnimation(0, oldAnim === 'run' ? 'run' : 'walk', true, 0);
        }
    },
    
    shoot () {
        this.spine.setAnimation(1, 'shoot', false);
    },
    
    //
    
    _setMix (anim1, anim2) {
        this.spine.setMix(anim1, anim2, this.mixTime);
        this.spine.setMix(anim2, anim1, this.mixTime);
    }
});
