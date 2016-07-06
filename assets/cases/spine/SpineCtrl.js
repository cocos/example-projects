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
        
        spine.setStartListener(track => {
            var entry = spine.getCurrent(track);
            if (entry) {
                var animationName = entry.animation ? entry.animation.name : "";
                cc.log("[track %s] start: %s", track, animationName);
            }
        });
        spine.setEndListener(track => {
            cc.log("[track %s] end", track);
        });
        spine.setCompleteListener((track, loopCount) => {
            cc.log("[track %s] complete: %s", track, loopCount);
        });
        spine.setEventListener((track, event) => {
            cc.log("[track %s] event: %s, %s, %s, %s", track, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });

        // var self = this;
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //     onTouchesBegan () {
        //         self.toggleTimeScale();
        //     }
        // }, this.node);
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
    },

    walk () {
        this.spine.setAnimation(0, 'walk', true);
    },
    
    run () {
        this.spine.setAnimation(0, 'run', true);
    },
    
    jump () {
        var oldAnim = this.spine.animation;
        this.spine.setAnimation(0, 'jump', false);
        if (oldAnim) {
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
