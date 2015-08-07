var SpineDemo = Fire.Class({
    extends: Fire.Behavior,
    properties: {
        moveAccel: 20,
        brake: 0.3,
        runSpeed: 200,
        maxRunSpeed: 500,
        walkPositionY: 0,
        spineSkeletonAsset: {
            default: "",
            url: Fire.RawAsset
        },
        spineAtlasAsset: {
            default: "",
            url: Fire.RawAsset
        },
        spineAtlasTexture: {
            default: "",
            url: Fire.Texture
        }
    },
    onLoad: function() {
        // spine boy
        this.spineBoy = null;
        this._initSpineSkeleton();
        this._initSpineAnimation();
        // input display
        this.inputDisplay = Fire.engine.getCurrentSceneN().getChildByName('inputDisplay');
        // register input
        this._registerInput();
        // logic state
        this.inputState = {
            left: false,
            right: false,
            jump: false
        };
        this.animState = "";
        this.speed = Fire.Vec2.zero;
        //
    },

    _initSpineSkeleton: function() {
        this.spineBoy = new sp.SkeletonAnimation(this.spineSkeletonAsset, this.spineAtlasAsset);
        this.spineBoy.setName("spineBoy");
        this.addChild(this.spineBoy);
        this.walkPositionY = this.getPositionY();
    },

    _initSpineAnimation: function() {
        var self = this;
        // track 0 for body movement
        self.spineBoy.setAnimation(0, 'idle', true);
        self.animState = 'idle';
        self.spineBoy.setMix('idle', 'walk', 0.05);
        self.spineBoy.setMix('walk', 'run', 0.2);
        self.spineBoy.setMix('run', 'walk', 0.2);
        self.spineBoy.setMix('walk', 'idle', 0.1);
        self.spineBoy.setEndListener();
    },

    _registerInput: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                switch(keyCode) {
                    case cc.KEY.a:
                    self.inputState.left = true;
                    break;
                    case cc.KEY.d:
                    self.inputState.right = true;
                    break;
                    case cc.KEY.space:
                    self.inputState.jump = true;
                    break;
                    case cc.KEY.j:
                    self.inputState.shoot = true;
                    break;
                }
                self._updateInputDisplay();
            },
            onKeyReleased:  function(keyCode, event){
                switch(keyCode) {
                    case cc.KEY.a:
                    self.inputState.left = false;
                    break;
                    case cc.KEY.d:
                    self.inputState.right = false;
                    break;
                    case cc.KEY.space:
                    self.inputState.jump = false;
                    break;
                    case cc.KEY.j:
                    self.inputState.shoot = false;
                    break;
                }
                self._updateInputDisplay();
            }
        }, self);
    },

    // called every frame
    update: function (dt) {
        var self = this;
        // get move speed
        if (self.animState !== 'jump') {
            if (self.inputState.left) {
                self.speed.x -= self.moveAccel;
            }
            if (self.inputState.right) {
                self.speed.x += self.moveAccel;
            }
            if (!self.inputState.left && !self.inputState.right) {
                if (Math.abs(self.speed.x) < 1 ) {
                    self.speed = cc.p(0, self.speed.y);
                } else {
                    var speedX = Math.lerp(self.speed.x, 0, self.brake);
                    self.speed = cc.p(speedX, self.speed.y);
                }
            }
        }
        if (self.speed.x > 0) {
            self.speed = cc.p(Math.min(self.speed.x, self.maxRunSpeed), self.speed.y);
            self.spineBoy.scaleX = 1;
        } else if (self.speed.x < 0) {
            self.spineBoy.scaleX = -1;
            self.speed = cc.p(Math.max(self.speed.x, -self.maxRunSpeed), self.speed.y);
        }

        if (self.inputState.jump && self.animState !== 'jump') {
            self.spineBoy.setAnimation(0, 'jump', false);
            self.animState = 'jump';
        }

        // update position
        // var deltaY = self.speed.y * dt;
        var pos = cc.p(self.x + self.speed.x * dt, self.y);
        self.setPosition(pos);

        if (self.animState === 'jump') {
            if (self.spineBoy.getCurrent(0) &&
                self.spineBoy.getCurrent(0).animation.name === 'jump'
            ) {
                return;
            }
        }
        self._updateAnimationState();
    },

    _updateInputDisplay: function() {
      this.inputDisplay.setString("Input State: \nLeft: " + this.inputState.left +
        "\nRight: " + this.inputState.right + "\nJump: " + this.inputState.jump);
    },

    _updateAnimationState: function() {
      var self = this;
      var speedMagnitude = Math.abs(self.speed.x);
      // Fire.log(speedMagnitude);
      if (speedMagnitude >= self.runSpeed ) {
        if (self.animState !== 'run') {
          self.spineBoy.setAnimation(0, 'run', true);
          self.animState = 'run';
        }
      } else if (speedMagnitude < self.runSpeed && speedMagnitude > 1) {
        if (self.animState !== 'walk') {
          self.spineBoy.setAnimation(0, 'walk', true);
          self.animState = 'walk';
        }
      } else if (speedMagnitude === 0) {
        if (self.animState !== 'idle') {
          self.spineBoy.setAnimation(0, 'idle', true);
          self.animState = 'idle';
        }
      }
    }
});
