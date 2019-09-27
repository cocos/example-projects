if (!cc.runtime) {
// runtime not support dragonbones.

var NORMAL_ANIMATION_GROUP = "normal";
var AIM_ANIMATION_GROUP = "aim";
var ATTACK_ANIMATION_GROUP = "attack";
var JUMP_SPEED = -20;
var NORMALIZE_MOVE_SPEED = 3.6;
var MAX_MOVE_SPEED_FRONT = NORMALIZE_MOVE_SPEED * 1.4;
var MAX_MOVE_SPEED_BACK = NORMALIZE_MOVE_SPEED * 1.0;
var WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
var WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
var SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"];
var GROUND = -200;
var G = -0.6;

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: dragonBones.ArmatureDisplay
    },

    properties: {
        touchHandler : {
            default: null,
            type: cc.Node
        },

        upButton: {
            default: null,
            type: cc.Node
        },

        downButton: {
            default: null,
            type: cc.Node
        },

        leftButton: {
            default: null,
            type: cc.Node
        },

        rightButton: {
            default: null,
            type: cc.Node
        },

        weaponArmature: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },

        skinArmature: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },

        _bullets : [],
        _left : false,
        _right : false,
        _isJumpingA : false,
        _isJumpingB : false,
        _isSquating : false,
        _isAttackingA : false,
        _isAttackingB : false,
        _weaponRIndex : 0,
        _weaponLIndex : 0,
        _skinIndex: 0,
        _faceDir : 1,
        _aimDir : 0,
        _moveDir : 0,
        _aimRadian : 0,
        _speedX : 0,
        _speedY : 0,
        _armature : null,
        _armatureDisplay : null,
        _weaponR : null,
        _weaponL : null,
        _aimState : null,
        _walkState : null,
        _attackState : null,
        _target : cc.v2(0, 0),
    },

    // use this for initialization
    onLoad: function () {
        this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
        this._armature = this._armatureDisplay.armature();

        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);

        this._weaponR = this._armature.getSlot('weapon_r').childArmature;
        this._weaponL = this._armature.getSlot('weapon_l').childArmature;
        this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

        // load all skin data
        for (let i = 1; i < SKINS.length; i++) {
            this.skinArmature.armatureName = SKINS[i];
        }

        for (let i = 1; i < WEAPON_R_LIST.length; i++) {
            this.weaponArmature.armatureName = WEAPON_R_LIST[i];
        }

        this._updateAnimation();

        if (this.touchHandler) {
            // touch events
            this.touchHandler.on(cc.Node.EventType.TOUCH_START, event => {
                this._mouseDown_ = true;
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                this.aim(touchLoc.x, touchLoc.y);
                this.attack(true);
            }, this);
            this.touchHandler.on(cc.Node.EventType.TOUCH_END, event => {
                this._mouseDown_ = false;
                this.attack(false);
            }, this);
            this.touchHandler.on(cc.Node.EventType.TOUCH_MOVE, event => {
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                this.aim(touchLoc.x, touchLoc.y);
            }, this);
        }

        if (this.upButton) {
            this.upButton.on(cc.Node.EventType.TOUCH_START, event => {
                this.jump();
            }, this);
        }

        if (this.downButton) {
            this.downButton.on(cc.Node.EventType.TOUCH_START, event => {
                this.squat(true);
            }, this);
            this.downButton.on(cc.Node.EventType.TOUCH_END, event => {
                this.squat(false);
            }, this);
            this.downButton.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                this.squat(false);
            }, this);
        }

        if (this.leftButton) {
            this.leftButton.on(cc.Node.EventType.TOUCH_START, event => {
                this._left = true;
                this._updateMove(-1);
            }, this);
            this.leftButton.on(cc.Node.EventType.TOUCH_END, event => {
                this._left = false;
                this._updateMove(-1);
            }, this);
            this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                this._left = false;
                this._updateMove(-1);
            }, this);
        }

        if (this.rightButton) {
            this.rightButton.on(cc.Node.EventType.TOUCH_START, event => {
                this._right = true;
                this._updateMove(1);
            }, this);
            this.rightButton.on(cc.Node.EventType.TOUCH_END, event => {
                this._right = false;
                this._updateMove(1);
            }, this);
            this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                this._right = false;
                this._updateMove(1);
            }, this);
        }

        // keyboard events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            this._keyHandler(event.keyCode, true);
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            this._keyHandler(event.keyCode, false);
        }, this);
    },

    _keyHandler: function(keyCode, isDown) {
        switch(keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this._left = isDown;
                this._updateMove(-1);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this._right = isDown;
                this._updateMove(1);
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                if (isDown) {
                    this.jump();
                }
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.squat(isDown);
                break;
            case cc.macro.KEY.q:
                if (isDown) {
                    this.switchWeaponR();
                }
                break;
            case cc.macro.KEY.e:
                if (isDown) {
                    this.switchWeaponL();
                }
                break;
            case cc.macro.KEY.space:
                if (isDown) {
                    this.switchWeaponR();
                    this.switchWeaponL();
                }
                break;
            default:
                return;
        }
    },

    _updateMove : function (dir) {
        if (this._left && this._right) {
            this.move(dir);
        } else if (this._left) {
            this.move(-1);
        } else if (this._right) {
            this.move(1);
        } else {
            this.move(0);
        }
    },

    move : function(dir) {
        if (this._moveDir === dir) {
            return;
        }

        this._moveDir = dir;
        this._updateAnimation();
    },

    jump : function () {
        if (this._isJumpingA) {
            return;
        }

        this._isJumpingA = true;
        this._armature.animation.fadeIn("jump_1", -1, -1, 0, NORMAL_ANIMATION_GROUP);
        this._walkState = null;
    },

    squat : function(isSquating) {
        if (this._isSquating === isSquating) {
            return;
        }

        this._isSquating = isSquating;
        this._updateAnimation();
    },

    attack : function (isAttacking) {
        if (this._isAttackingA == isAttacking) {
            return;
        }

        this._isAttackingA = isAttacking;
    },

    switchWeaponL : function() {
        this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

        this._weaponLIndex++;
        if (this._weaponLIndex >= WEAPON_L_LIST.length) {
            this._weaponLIndex = 0;
        }

        var newWeaponName = WEAPON_L_LIST[this._weaponLIndex];
        let factory = dragonBones.CCFactory.getInstance();
        this._weaponL = factory.buildArmature(newWeaponName);
        this._armature.getSlot('weapon_l').childArmature = this._weaponL;

        this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
    },

    switchWeaponR : function() {
        this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

        this._weaponRIndex++;
        if (this._weaponRIndex >= WEAPON_R_LIST.length) {
            this._weaponRIndex = 0;
        }

        var newWeaponName = WEAPON_R_LIST[this._weaponRIndex];
        let factory = dragonBones.CCFactory.getInstance();
        this._weaponR = factory.buildArmature(newWeaponName);
        this._armature.getSlot('weapon_r').childArmature = this._weaponR;

        this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
    },

    switchSkin : function () {
        this._skinIndex++;
        if (this._skinIndex >= SKINS.length)
        {
            this._skinIndex = 0;
        }
        let skinName = SKINS[this._skinIndex];
        let factory = dragonBones.CCFactory.getInstance();
        let skinData = factory.getArmatureData(skinName).defaultSkin;
        factory.replaceSkin(this._armatureDisplay.armature(), skinData, false, ["weapon_l", "weapon_r"]);
    },

    aim : function(x, y) {
        if (this._aimDir === 0) {
            this._aimDir = 10;
        }

        this._target = this.node.parent.convertToNodeSpaceAR(cc.v2(x, y));
    },

    update : function (dt) {
        this._updatePosition();
        this._updateAim();
        this._updateAttack();
        this._enterFrameHandler(dt);
    },

    onDisable : function() {
        // clean the bullets
        for (var i = this._bullets.length - 1; i >= 0; i--)
        {
            var bullet = this._bullets[i];
            bullet.enabled = false;
        }
        this._bullets = [];
    },

    addBullet : function(bullet) {
        this._bullets.push(bullet);
    },

    _enterFrameHandler : function (dt) {
        for (var i = this._bullets.length - 1; i >= 0; i--)
        {
            var bullet = this._bullets[i];
            if (bullet.update())
            {
                this._bullets.splice(i, 1);
            }
        }
    },

    _animationEventHandler: function (event) {
        if (event.type === dragonBones.EventObject.FADE_IN_COMPLETE) {
            if (event.animationState.name === "jump_1") {
                this._isJumpingB = true;
                this._speedY = -JUMP_SPEED;

                if (this._moveDir != 0)
                {
                    if (this._moveDir * this._faceDir > 0) 
                    {
                        this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
                    }
                    else 
                    {
                        this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
                    }
                }

                this._armature.animation.fadeIn("jump_2", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            } else if (event.animationState.name === "jump_4") {
                this._updateAnimation();
            }
        }
        else if (event.type === dragonBones.EventObject.FADE_OUT_COMPLETE) {
            if (event.animationState.name === "attack_01") {
                this._isAttackingB = false;
                this._attackState = null;
            }
        }
        else if (event.type === dragonBones.EventObject.COMPLETE) {
            if (event.animationState.name === "jump_4") {
                this._isJumpingA = false;
                this._isJumpingB = false;
                this._updateAnimation();
            }
        }
    },

    _frameEventHandler : function (event) {
        if (event.name === "fire") {
            // var firePointBone = event.armature.getBone("firePoint");
            var localPoint = cc.v2(event.bone.global.x, event.bone.global.y);

            var display = event.armature.display;
            var globalPoint = display.node.convertToWorldSpace(localPoint);

            this._fire(globalPoint);
        }
    },

    _fire : function (firePoint) {
        firePoint.x += Math.random() * 2 - 1;
        firePoint.y += Math.random() * 2 - 1;

        var armature = this._armatureDisplay.buildArmature("bullet_01");
        var effect = this._armatureDisplay.buildArmature("fire_effect_01");
        var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
        var bullet = new DragonBullet();
        bullet.init(this.node.parent, armature, effect, radian + Math.random() * 0.02 - 0.01, 40, firePoint);
        this.addBullet(bullet);
    },

    _updateAnimation : function() {
        if (this._isJumpingA) {
            return;
        }

        if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
            return;
        }

        if (this._moveDir === 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
        } else {
            if (!this._walkState) {
                this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, NORMAL_ANIMATION_GROUP);
                this._walkState.resetToPose = false;
            }

            if (this._moveDir * this._faceDir > 0) {
                this._walkState.timeScale = MAX_MOVE_SPEED_FRONT / NORMALIZE_MOVE_SPEED;
            } else {
                this._walkState.timeScale = -MAX_MOVE_SPEED_BACK / NORMALIZE_MOVE_SPEED;
            }

            if (this._moveDir * this._faceDir > 0) {
                this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
            } else {
                this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
            }
        }
    },

    _updatePosition : function() {
        if (this._speedX !== 0) {
            this.node.x += this._speedX;
            var minX = -cc.visibleRect.width / 2;
            var maxX = cc.visibleRect.width / 2;
            if (this.node.x < minX) {
                this.node.x = minX;
            } else if (this.node.x > maxX) {
                this.node.x = maxX;
            }
        }

        if (this._speedY != 0) {
            if (this._speedY > 5 && this._speedY + G <= 5) {
                this._armature.animation.fadeIn("jump_3", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }

            this._speedY += G;
            this.node.y += this._speedY;
            if (this.node.y < GROUND) {
                this.node.y = GROUND;
                this._speedY = 0;
                this._armature.animation.fadeIn("jump_4", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }
        }
    },

    _updateAim : function () {
        if (!this._mouseDown_) return;

        if (this._aimDir === 0) {
            return;
        }

        this._faceDir = this._target.x > this.node.x ? 1 : -1;
        if (this.node.scaleX * this._faceDir < 0) {
            this.node.scaleX *= -1;
            if (this._moveDir) {
                this._updateAnimation();
            }
        }

        var aimOffsetY = this._armature.getBone("chest").global.y * this.node.scaleY;

        if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(this._target.y - this.node.y - aimOffsetY, this._target.x - this.node.x);
        } else {
            this._aimRadian = Math.PI - Math.atan2(this._target.y - this.node.y - aimOffsetY, this._target.x - this.node.x);
            if (this._aimRadian > Math.PI) {
                this._aimRadian -= Math.PI * 2;
            }
        }

        let aimDir = 0;
        if (this._aimRadian > 0) {
            aimDir = 1;
        } else {
            aimDir = -1;
        }

        if (this._aimDir != aimDir) {
            this._aimDir = aimDir;

            // Animation mixing.
            if (this._aimDir >= 0) {
                this._aimState = this._armature.animation.fadeIn(
                    "aim_up", -1.0, -1,
                    0, AIM_ANIMATION_GROUP);
            } else {
                this._aimState = this._armature.animation.fadeIn(
                    "aim_down", -1.0, -1,
                    0, AIM_ANIMATION_GROUP);
            }

            this._aimState.resetToPose = false;
        }

        this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);

        //_armature.invalidUpdate("pelvis"); // Only update bone mask.
        this._armature.invalidUpdate();
    },

    _updateAttack : function() {
        if (!this._isAttackingA || this._isAttackingB) {
            return;
        }

        this._isAttackingB = true;

        // Animation mixing.
        this._attackState = this._armature.animation.fadeIn(
            "attack_01", -1.0, -1,
            0, ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup
        );

        this._attackState.resetToPose = false;
        this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
    }
});


var DragonBullet = cc.Class({
    name: 'DragonBullet',
    _speedX : 0,
    _speedY : 0,

    _armature : null,
    _armatureDisplay : null,
    _effect : null,

    init : function (parentNode, armature, effect, radian, speed, position) {
        this._speedX = Math.cos(radian) * speed;
        this._speedY = Math.sin(radian) * speed;
        var thePos = parentNode.convertToNodeSpaceAR(position);

        armature.playAnimation("idle");
        
        let armatureNode = armature.node;
        armatureNode.setPosition(thePos);
        armatureNode.angle = radian * cc.macro.DEG;

        this._armature = armature;
        
        if (effect) {
            this._effect = effect;
            var effectDisplay = this._effect.node;
            effectDisplay.angle = radian * cc.macro.DEG;
            effectDisplay.setPosition(thePos);
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;
            if (Math.random() < 0.5) {
                effectDisplay.scaleY *= -1;
            }

            this._effect.playAnimation("idle");

            parentNode.addChild(effectDisplay);
        }

        parentNode.addChild(armatureNode);
    },

    update : function() {
        let armatureNode = this._armature.node;

        armatureNode.x += this._speedX;
        armatureNode.y += this._speedY;

        var worldPos = armatureNode.parent.convertToWorldSpaceAR(armatureNode.getPosition());
        if (
            worldPos.x < -100 || worldPos.x >= cc.visibleRect.width + 100 ||
            worldPos.y < -100 || worldPos.y >= cc.visibleRect.height + 100
        ) {
            this.doClean();
            return true;
        }

        return false;
    },

    onDisable : function () {
        this.doClean();
    },

    doClean : function() {
        this._armature.node.removeFromParent();

        if (this._effect) {
            this._effect.node.removeFromParent();
        }
    }
});
} // end of !cc.runtime
