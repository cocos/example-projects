window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  "3d-model": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f96dFONrhFoosfPR7q5e94", "3d-model");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        playingIndex: 0
      },
      start: function start() {
        this.playNextAnimation();
      },
      playNextAnimation: function playNextAnimation() {
        var animation = this.getComponent(cc.Animation);
        var clips = animation.getClips();
        clips[this.playingIndex] || (this.playingIndex = 0);
        animation.play(clips[this.playingIndex].name);
        this.playingIndex++;
      }
    });
    cc._RF.pop();
  }, {} ],
  AR: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e054epu19CIakfnS4cZU3+", "AR");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        posAR: cc.Label,
        pos: cc.Label,
        goldAR: cc.Node,
        gold: cc.Node
      },
      onLoad: function onLoad() {
        var sheep = this.goldAR.parent;
        var posAR = sheep.convertToWorldSpaceAR(cc.v2(this.goldAR.x, this.goldAR.y));
        this.posAR.string = "(" + parseInt(posAR.x) + ", " + parseInt(posAR.y) + ")";
        sheep = this.goldAR.parent;
        var pos = sheep.convertToWorldSpace(cc.v2(this.gold.x, this.gold.y));
        this.pos.string = "(" + parseInt(pos.x) + ", " + parseInt(pos.y) + ")";
      }
    });
    cc._RF.pop();
  }, {} ],
  ActionCallback: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2881e6K1edLBbgvc+6/YN7o", "ActionCallback");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var touchEvent = this.getComponent("TouchEvent");
        var mouseEvent = this.getComponent("MouseEvent");
        var event = touchEvent || mouseEvent;
        event._callback = function() {
          this.node.runAction(cc.sequence(cc.scaleTo(.5, 2, 1), cc.scaleTo(.25, 1, 1)));
        };
      }
    });
    cc._RF.pop();
  }, {} ],
  AdaptiveSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4edf1JTF/BHIKZVY3FaAqsT", "AdaptiveSprite");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        padding: 20,
        label: {
          default: null,
          type: cc.Node
        },
        backgroup: {
          default: null,
          type: cc.Node
        }
      },
      update: function update() {
        this.backgroup.width !== this.label.width && (this.backgroup.width = this.label.width + this.padding);
        this.backgroup.height !== this.label.height && (this.backgroup.height = this.label.height + this.padding);
      }
    });
    cc._RF.pop();
  }, {} ],
  AnimateCustomPropertyCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb14cmn7KJJCo4qVcOy/GmS", "AnimateCustomPropertyCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        hp: 0,
        emissionRote: 0,
        num: 0,
        hpBar: cc.ProgressBar,
        particle: cc.ParticleSystem,
        score: cc.Label
      },
      update: function update(dt) {
        this.hpBar.progress = this.hp;
        this.particle.emissionRate = this.emissionRote;
        this.score.string = Math.ceil(this.num);
      }
    });
    cc._RF.pop();
  }, {} ],
  AnimationCallback: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d311umYuNAM61hHscTxwkq", "AnimationCallback");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        playLabel: {
          default: null,
          type: cc.Label
        },
        pauseLabel: {
          default: null,
          type: cc.Label
        },
        stateLabel: {
          default: null,
          type: cc.Label
        },
        animation: {
          default: null,
          type: cc.Animation
        }
      },
      onEnable: function onEnable() {
        var animation = this.animation;
        animation.on("play", this.onPlay, this);
        animation.on("stop", this.onStop, this);
        animation.on("lastframe", this.onLastFrame, this);
        animation.on("finished", this.onFinished, this);
        animation.on("pause", this.onPause, this);
        animation.on("resume", this.onResume, this);
      },
      onDisable: function onDisable() {
        var animation = this.animation;
        animation.off("play", this.onPlay, this);
        animation.off("stop", this.onStop, this);
        animation.off("lastframe", this.onLastFrame, this);
        animation.off("finished", this.onFinished, this);
        animation.off("pause", this.onPause, this);
        animation.off("resume", this.onResume, this);
      },
      onPlayButtonClicked: function onPlayButtonClicked() {
        if ("play" === this.playLabel.string) {
          this.playLabel.string = "stop";
          this.animation.play("linear");
        } else {
          this.playLabel.string = "play";
          this.animation.stop("linear");
        }
      },
      onPauseButtonClicked: function onPauseButtonClicked() {
        if ("pause" === this.pauseLabel.string) {
          this.pauseLabel.string = "resume";
          this.animation.pause("linear");
        } else {
          this.pauseLabel.string = "pause";
          this.animation.resume("linear");
        }
      },
      onPlay: function onPlay() {
        cc.log("onPlay");
        this.stateLabel.string = "onPlay";
      },
      onStop: function onStop() {
        cc.log("onStop");
        this.stateLabel.string = "onStop";
        this.playLabel.string = "play";
      },
      onLastFrame: function onLastFrame() {
        cc.log("onLastFrame");
        this.stateLabel.string = "onLastFrame";
      },
      onFinished: function onFinished() {
        cc.log("onFinished");
        this.stateLabel.string = "onFinished";
      },
      onPause: function onPause() {
        cc.log("onPause");
        this.stateLabel.string = "onPause";
      },
      onResume: function onResume() {
        cc.log("onResume");
        this.stateLabel.string = "onResume";
      }
    });
    cc._RF.pop();
  }, {} ],
  AnimationEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dc09SR4TdLU74RjGBArlm0", "AnimationEvent");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var node = cc.find("Canvas/Label");
        this._label = node.getComponent(cc.Label);
        this._animCtrl = this.node.getComponent(cc.Animation);
      },
      onNextAnimation: function onNextAnimation(step) {
        this._animCtrl.play("step_" + step);
        this._label.string = i18n.t("cases/03_gameplay/03_animation/AnimationEvent.js.1") + step + "\u4e2a\u52a8\u753b";
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  AssetLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65aa6czKHtKGZog+yjK1bc6", "AssetLoading");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        showWindow: cc.Node,
        loadAnimTestPrefab: cc.Prefab,
        loadTips: cc.Label,
        loadList: {
          default: [],
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this._curType = "";
        this._lastType = "";
        this._curRes = null;
        this._btnLabel = null;
        this._audioSource = null;
        this._isLoading = false;
        this._urls = {
          Audio: "test_assets/audio",
          Txt: "test_assets/text",
          Texture: "test_assets/PurpleMonster",
          Font: "test_assets/font",
          Plist: "test_assets/atom.plist",
          SpriteFrame: "test_assets/image",
          Prefab: "test_assets/prefab",
          Animation: "test_assets/sprite-anim",
          Scene: "test_assets/scene",
          Spine: "spineboy/spineboy",
          CORS: "http://tools.itharbors.com/res/logo.png"
        };
        this._onRegisteredEvent();
      },
      onDestroy: function onDestroy() {
        this._curRes && cc.loader.releaseAsset(this._curRes);
      },
      _onRegisteredEvent: function _onRegisteredEvent() {
        for (var i = 0; i < this.loadList.length; ++i) this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
      },
      _onClick: function _onClick(event) {
        if (this._isLoading) return;
        this._onClear();
        this._curType = event.target.name.split("_")[1];
        if ("" !== this._lastType && this._curType === this._lastType) {
          this._onShowResClick(event);
          return;
        }
        this._btnLabel && (this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.1") + this._lastType);
        this._lastType = this._curType;
        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");
        this.loadTips.textKey = this._curType + " Loading....";
        this._isLoading = true;
        this._load();
      },
      _load: function _load() {
        var url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
         case "SpriteFrame":
          cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
          break;

         case "Spine":
          cc.loader.loadRes(url, sp.SkeletonData, loadCallBack);
          break;

         case "Font":
          cc.loader.loadRes(url, cc.Font, loadCallBack);
          break;

         case "Plist":
          cc.loader.loadRes(url, cc.ParticleAsset, loadCallBack);
          break;

         case "Animation":
         case "Prefab":
         case "Scene":
         case "Texture":
         case "Txt":
         case "Audio":
          cc.loader.loadRes(url, loadCallBack);
          break;

         case "CORS":
          cc.loader.load(url, loadCallBack);
          this.loadTips.textKey = "CORS image should report texImage2D error under WebGL and works ok under Canvas";
          break;

         default:
          cc.loader.load(url, loadCallBack);
        }
      },
      _loadCallBack: function _loadCallBack(err, res) {
        this._isLoading = false;
        if (err) {
          cc.log("Error url [" + err + "]");
          return;
        }
        this._curRes = res;
        "Audio" === this._curType ? this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.2") : this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.3");
        this._btnLabel.textKey += this._curType;
        this.loadTips.textKey = this._curType + " Loaded Successfully!";
      },
      _onClear: function _onClear() {
        this.showWindow.removeAllChildren(true);
        this._audioSource && this._audioSource instanceof cc.AudioSource && this._audioSource.stop();
      },
      _onShowResClick: function _onShowResClick(event) {
        if ("Scene" === this._curType) {
          cc.director.runScene(this._curRes.scene);
          return;
        }
        this._createNode(this._curType, this._curRes);
      },
      _createNode: function _createNode(type, res) {
        this.loadTips.textKey = "";
        var node = new cc.Node("New " + type);
        node.setPosition(0, 0);
        var component = null;
        switch (this._curType) {
         case "SpriteFrame":
          component = node.addComponent(cc.Sprite);
          component.spriteFrame = res;
          break;

         case "Texture":
         case "CORS":
          component = node.addComponent(cc.Sprite);
          component.spriteFrame = new cc.SpriteFrame(res);
          break;

         case "Audio":
          component = node.addComponent(cc.AudioSource);
          component.clip = res;
          component.play();
          this._audioSource = component;
          this.loadTips.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.4");
          break;

         case "Txt":
          component = node.addComponent(cc.Label);
          component.lineHeight = 40;
          component.string = res;
          break;

         case "Font":
          component = node.addComponent(cc.Label);
          component.font = res;
          component.lineHeight = 40;
          component.string = "This is BitmapFont!";
          break;

         case "Plist":
          component = node.addComponent(cc.ParticleSystem);
          component.file = res;
          component.resetSystem();
          break;

         case "Prefab":
          var prefab = cc.instantiate(res);
          prefab.parent = node;
          prefab.setPosition(0, 0);
          break;

         case "Animation":
          var loadAnim = cc.instantiate(this.loadAnimTestPrefab);
          loadAnim.parent = node;
          loadAnim.setPosition(0, 0);
          var AanimCtrl = loadAnim.getComponent(cc.Animation);
          AanimCtrl.addClip(res);
          AanimCtrl.play(res.name);
          break;

         case "Spine":
          component = node.addComponent(sp.Skeleton);
          component.skeletonData = res;
          component.animation = "walk";
          node.y = -248;
        }
        this.showWindow.addChild(node);
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  AudioCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5696eq9jEBM7KysA0oiKxfR", "AudioCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        timeLabel: {
          default: null,
          type: cc.Label
        },
        _audioTask: null,
        _audioID: null
      },
      setAudioTask: function setAudioTask(audio) {
        this._audioTask = audio;
      },
      playAudio: function playAudio() {
        this._audioID = cc.audioEngine.play(this._audioTask, false);
      },
      stopAudio: function stopAudio() {
        cc.audioEngine.stop(this._audioID);
      },
      pauseAudio: function pauseAudio() {
        cc.audioEngine.pause(this._audioID);
      },
      resumeAudio: function resumeAudio() {
        cc.audioEngine.resume(this._audioID);
      },
      stopAllAudio: function stopAllAudio() {
        cc.audioEngine.stopAll();
      },
      pauseAllAudio: function pauseAllAudio() {
        cc.audioEngine.pauseAll();
      },
      resumeAllAudio: function resumeAllAudio() {
        cc.audioEngine.resumeAll();
      },
      currentTime: function currentTime() {
        if (!this._audioTask || null === this._audioID) return;
        var currentTime = cc.audioEngine.getCurrentTime(this._audioID).toFixed(1);
        var durationTime = cc.audioEngine.getDuration(this._audioID).toFixed(1);
        this.timeLabel.string = currentTime + " s / " + durationTime + " s";
      }
    });
    cc._RF.pop();
  }, {} ],
  AudioEngineControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "251cfXAScNHQqBfLlu2ffSn", "AudioEngineControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        audio: {
          type: cc.AudioClip,
          default: null
        },
        label: {
          type: cc.Label,
          default: null
        }
      },
      _updateLabel: function _updateLabel() {
        this.label.string = "Instance: " + this.audioPool.length + " / " + this.maxNum;
      },
      onLoad: function onLoad() {
        this.maxNum = cc.audioEngine.getMaxAudioInstance();
        this.audioPool = [];
        this._updateLabel();
        [ "playMusic", "playEffect" ].forEach(function(name) {
          cc.audioEngine[name] || cc.warn("." + name + " is not found!");
        });
      },
      onDestroy: function onDestroy() {
        cc.audioEngine.stopAll();
      },
      removeAudio: function removeAudio(id) {
        var idx = this.audioPool.indexOf(id);
        idx > -1 && this.audioPool.splice(idx, 1);
        this._updateLabel();
      },
      play: function play() {
        if (!this.audio || this.audioPool.length === this.maxNum) return;
        var id = cc.audioEngine.play(this.audio, false, 1);
        this.audioPool.push(id);
        this._updateLabel();
        cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
      },
      stopAll: function stopAll() {
        cc.audioEngine.stopAll();
        this.audioPool = [];
        this._updateLabel();
      },
      pauseAll: function pauseAll() {
        cc.audioEngine.pauseAll();
      },
      resumeAll: function resumeAll() {
        cc.audioEngine.resumeAll();
      }
    });
    cc._RF.pop();
  }, {} ],
  AudioSourceControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21d1aBwz85GW7Z3zNuBJcwB", "AudioSourceControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        audioSource: {
          type: cc.AudioSource,
          default: null
        },
        label: {
          type: cc.Label,
          default: null
        }
      },
      onLoad: function onLoad() {},
      update: function update() {
        if (!this.label) return;
        var audio = this.audioSource;
        this.label.string = audio.getCurrentTime().toFixed(1) + " s / " + audio.getDuration().toFixed(1) + " s";
      },
      play: function play() {
        this.audioSource.play();
      },
      pause: function pause() {
        this.audioSource.pause();
      },
      stop: function stop() {
        this.audioSource.stop();
      },
      resume: function resume() {
        this.audioSource.resume();
      }
    });
    cc._RF.pop();
  }, {} ],
  Bar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "990e2c/1VlE9pmwd+Ftseau", "Bar");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: function properties() {
        return {
          refToFoo: require("Foo")
        };
      },
      onLoad: function onLoad() {
        var tip = this.node.children[0].getComponent(cc.Label);
        tip.string = this.name + " has reference to " + this.refToFoo.name;
      }
    });
    cc._RF.pop();
  }, {
    Foo: "Foo"
  } ],
  BasicEventCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72ce1xP/UlG/rNZB/cIXQ2q", "BasicEventCtrl");
    "use strict";
    var TipsManager = require("TipsManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        basicNode: cc.Node,
        preNode: cc.Node,
        childNode: cc.Node,
        tip: cc.Label
      },
      start: function start() {
        TipsManager.init();
      },
      changePosition: function changePosition() {
        this.resetNode();
        function positionChanged() {
          this.tip.string = "Position_changed successd";
        }
        this.basicNode.on(cc.Node.EventType.POSITION_CHANGED, positionChanged, this);
        this.basicNode.x -= 40;
        this.basicNode.y += 10;
        this.basicNode.off(cc.Node.EventType.POSITION_CHANGED, positionChanged, this);
      },
      changeScale: function changeScale() {
        this.resetNode();
        function scaleChanged() {
          this.tip.string = "Scale_changed successd";
        }
        this.basicNode.on(cc.Node.EventType.SCALE_CHANGED, scaleChanged, this);
        this.basicNode.scaleX += .2;
        this.basicNode.scaleY += .2;
        this.basicNode.off(cc.Node.EventType.POSITION_CHANGED, scaleChanged, this);
      },
      changeSize: function changeSize() {
        this.resetNode();
        function sizeChanged(oldSize) {
          this.tip.string = "Size_changed successd";
        }
        this.basicNode.on(cc.Node.EventType.SIZE_CHANGED, sizeChanged, this);
        this.basicNode.width += 100;
        this.basicNode.height += 100;
        this.basicNode.off(cc.Node.EventType.SIZE_CHANGED, sizeChanged, this);
      },
      changeAnchor: function changeAnchor() {
        this.resetNode();
        function anchorChanged() {
          this.tip.string = "Anchor_changed successd";
        }
        this.basicNode.on(cc.Node.EventType.ANCHOR_CHANGED, anchorChanged, this);
        this.basicNode.anchorX -= .05;
        this.basicNode.anchorY -= .1;
        this.basicNode.off(cc.Node.EventType.ANCHOR_CHANGED, anchorChanged, this);
      },
      changeColor: function changeColor() {
        this.resetNode();
        function colorChanged() {
          this.tip.string = "Color_changed successd";
        }
        this.basicNode.on(cc.Node.EventType.COLOR_CHANGED, colorChanged, this);
        this.basicNode.color = new cc.Color(100, 100, 100);
        this.basicNode.off(cc.Node.EventType.COLOR_CHANGED, colorChanged, this);
      },
      addingChild: function addingChild() {
        function childAdded(child) {
          this.tip.string = "Add_child successd\n zIndex order: " + this.getChildrenContent();
          console.log(child);
        }
        this.preNode.on(cc.Node.EventType.CHILD_ADDED, childAdded, this);
        if (2 !== this.preNode.children.length) {
          TipsManager.createTips("Only support when there is 2 stars existing");
          return;
        }
        this.preNode.addChild(this.childNode);
        this.preNode.off(cc.Node.EventType.CHILD_ADDED, childAdded, this);
      },
      removingChild: function removingChild() {
        this.resetChildNode();
        function childRemoved(child) {
          this.tip.string = "Remove_child successd\n zIndex order: " + this.getChildrenContent();
          console.log(child);
        }
        this.preNode.on(cc.Node.EventType.CHILD_REMOVED, childRemoved, this);
        if (3 !== this.preNode.children.length) {
          TipsManager.createTips("Only support when there is 3 stars existing");
          return;
        }
        this.preNode.removeChild(this.childNode);
        this.preNode.off(cc.Node.EventType.CHILD_REMOVED, childRemoved, this);
      },
      reorderChild: function reorderChild() {
        this.resetChildNode();
        function childReordered(parent) {
          this.tip.string = "Reorder_child successd\n zIndex order: " + this.getChildrenContent();
          console.log(parent);
        }
        this.preNode.on(cc.Node.EventType.CHILD_REORDER, childReordered, this);
        this.preNode.children[0].zIndex = 10;
        this.preNode.sortAllChildren();
        this.preNode.off(cc.Node.EventType.CHILD_REORDER, childReordered, this);
      },
      changeGroup: function changeGroup() {
        this.resetNode();
        function groupChanged(node) {
          this.tip.string = "Group_changed successd: " + this.basicNode.group;
          console.log(node);
        }
        this.basicNode.on(cc.Node.EventType.GROUP_CHANGED, groupChanged, this);
        this.basicNode.group = "Collider";
        this.basicNode.off(cc.Node.EventType.GROUP_CHANGED, groupChanged, this);
      },
      resetNode: function resetNode() {
        this.basicNode.x = -200;
        this.basicNode.y = 75;
        this.basicNode.scaleX = 1;
        this.basicNode.scaleY = 1;
        this.basicNode.width = 256;
        this.basicNode.height = 256;
        this.basicNode.anchorX = .5;
        this.basicNode.anchorY = .5;
        this.basicNode.color = new cc.Color(255, 255, 255);
        this.basicNode.group = "Default";
      },
      resetChildNode: function resetChildNode() {
        var children = this.preNode.children;
        for (var i = 0; i < children.length; i++) switch (children[i].name) {
         case "star1":
          children[i].zIndex = 0;
          break;

         case "star2":
          children[i].zIndex = 1;
          break;

         case "star3":
          children[i].zIndex = 2;
        }
        this.preNode.sortAllChildren();
      },
      getChildrenContent: function getChildrenContent() {
        var str = "";
        var children = this.preNode.children.sort(function(a, b) {
          return a.zIndex - b.zIndex;
        });
        var tempObj = children[0];
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          child.zIndex > tempObj.zIndex && (tempObj = child);
          str += child.name + " ";
          child.color = new cc.Color(255, 255, 255);
        }
        tempObj.color = new cc.Color(255, 0, 0);
        return str;
      }
    });
    cc._RF.pop();
  }, {
    TipsManager: "TipsManager"
  } ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "20d7dzfVhZNh4gNZzwaQgEl", "Bullet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 100
      },
      onLoad: function onLoad() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
      },
      update: function update(dt) {
        this.node.y += this.speed * dt;
      }
    });
    cc._RF.pop();
  }, {} ],
  ButtonControlCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6dc7dWcxxJuofXB7ergGnC", "ButtonControlCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        button_1: cc.Button,
        button_2: cc.Button,
        display: cc.Label
      },
      onClickedButton_1: function onClickedButton_1() {
        console.log("button_1 clicked!");
        this.display.textKey = i18n.t("cases/02_ui/03_button/ButtonInScroll.js.1");
      },
      onClickedButton_2: function onClickedButton_2() {
        console.log("button_2 clicked!");
        this.display.textKey = i18n.t("cases/02_ui/03_button/ButtonInScroll.js.2");
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  ButtonTransition: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d6525ck4GdCHbg0bUMMfDYY", "ButtonTransition");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btn: cc.Button
      },
      onInteractable: function onInteractable(event) {
        this.btn.interactable = event.isChecked;
      },
      onColorTransition: function onColorTransition(event) {
        this.btn.transition = cc.Button.Transition.COLOR;
      },
      onSpriteTransition: function onSpriteTransition(event) {
        this.btn.transition = cc.Button.Transition.SPRITE;
      },
      onScaleTransition: function onScaleTransition(event) {
        this.btn.transition = cc.Button.Transition.SCALE;
      }
    });
    cc._RF.pop();
  }, {} ],
  ChangeColor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "53ec66lTBdOrqo6CFndC+kD", "ChangeColor");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        test: {
          default: null,
          type: cc.Node
        }
      },
      ctor: function ctor() {
        this._colorChanged = false;
      },
      changeColor: function changeColor() {
        this.node.color = this._colorChanged ? cc.Color.WHITE : cc.Color.RED;
        this._colorChanged = !this._colorChanged;
      }
    });
    cc._RF.pop();
  }, {} ],
  ColliderListener: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d60fXxtXFNeI79PM6EXYuZ", "ColliderListener");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.touchingNumber = 0;
      },
      onCollisionEnter: function onCollisionEnter(other) {
        this.node.color = cc.Color.RED;
        this.touchingNumber++;
      },
      onCollisionStay: function onCollisionStay(other) {},
      onCollisionExit: function onCollisionExit() {
        this.touchingNumber--;
        0 === this.touchingNumber && (this.node.color = cc.Color.WHITE);
      }
    });
    cc._RF.pop();
  }, {} ],
  ColorRectAssembler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5206q6kUhNsat/1ce1X7/e", "ColorRectAssembler");
    "use strict";
    module.exports = {
      useModel: false,
      updateRenderData: function updateRenderData(comp) {
        if (!comp._renderData) {
          var IARenderData = cc.renderer.IARenderData;
          comp._renderData = new IARenderData();
          comp._renderData.material = comp.getMaterial(0);
          comp._renderData.ia = comp._ia;
        }
      },
      renderIA: function renderIA(comp, renderer) {
        renderer._flushIA(comp._renderData);
      }
    };
    cc._RF.pop();
  }, {} ],
  ColorRect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fba8045Ab5Jn4yj2EBO8nRt", "ColorRect");
    "use strict";
    var assembler = require("./ColorRectAssembler");
    var gfx = void 0;
    var math = void 0;
    var _prevMat = void 0;
    var _currMat = void 0;
    var InputAssembler = void 0;
    cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
      gfx = cc.gfx;
      math = cc.vmath;
      InputAssembler = cc.renderer.InputAssembler;
      _prevMat = math.mat4.create();
      _currMat = math.mat4.create();
    });
    var ColorRect = cc.Class({
      extends: cc.RenderComponent,
      properties: {
        blColor: cc.Color,
        brColor: cc.Color,
        tlColor: cc.Color,
        trColor: cc.Color
      },
      _updateVertexData: function _updateVertexData(matrix) {
        var verts = this._vData, uintV = this._uintVData;
        var w = this.node.width, h = this.node.height, appx = w * this.node.anchorX, appy = h * this.node.anchorY;
        var a = matrix.m00, b = matrix.m01, c = matrix.m04, d = matrix.m05, tx = matrix.m12, ty = matrix.m13;
        var x = void 0, y = void 0, i = 0;
        x = -appx;
        y = -appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.blColor._val;
        x = w - appx;
        y = -appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.brColor._val;
        x = -appx;
        y = h - appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.tlColor._val;
        x = w - appx;
        y = h - appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.trColor._val;
        this._vb.update(0, verts);
      },
      _createIA: function _createIA() {
        var device = cc.renderer.device;
        this._vertexFormat = new gfx.VertexFormat([ {
          name: gfx.ATTR_POSITION,
          type: gfx.ATTR_TYPE_FLOAT32,
          num: 2
        }, {
          name: gfx.ATTR_COLOR,
          type: gfx.ATTR_TYPE_UINT8,
          num: 4,
          normalize: true
        } ]);
        this._vData = new Float32Array(12);
        this._uintVData = new Uint32Array(this._vData.buffer);
        this._iData = new Uint16Array([ 0, 1, 2, 1, 3, 2 ]);
        this._vb = new gfx.VertexBuffer(device, this._vertexFormat, gfx.USAGE_DYNAMIC, null, 4);
        this._ib = new gfx.IndexBuffer(device, gfx.INDEX_FMT_UINT16, gfx.USAGE_STATIC, this._iData, this._iData.length);
        this.node.getWorldMatrix(_currMat);
        this._updateVertexData(_currMat);
        this._ia = new InputAssembler();
        this._ia._vertexBuffer = this._vb;
        this._ia._indexBuffer = this._ib;
        this._ia._start = 0;
        this._ia._count = this._iData.length;
      },
      onEnable: function onEnable() {
        this._super();
        this.node._renderFlag &= ~cc.RenderFlow.FLAG_RENDER;
        this.node._renderFlag |= cc.RenderFlow.FLAG_CUSTOM_IA_RENDER;
      },
      onLoad: function onLoad() {
        this.setMaterial(0, cc.Material.getBuiltinMaterial("sprite"));
        this._createIA();
      },
      update: function update() {
        this.node.getWorldMatrix(_currMat);
        _currMat.m00 === _prevMat.m00 && _currMat.m01 === _prevMat.m01 && _currMat.m04 === _prevMat.m04 && _currMat.m05 === _prevMat.m05 && _currMat.m12 === _prevMat.m12 && _currMat.m13 === _prevMat.m13 || this._updateVertexData(_currMat);
      }
    });
    ColorRect._assembler = assembler;
    module.exports = ColorRect;
    cc._RF.pop();
  }, {
    "./ColorRectAssembler": "ColorRectAssembler"
  } ],
  ComeBackToAssetLoad: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb585k+cxFKjohloTN1+FuU", "ComeBackToAssetLoad");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onComeBlack: function onComeBlack() {
        cc.director.loadScene("AssetLoading.fire");
      }
    });
    cc._RF.pop();
  }, {} ],
  CreateClipCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c450SopmNKmbcQu50ror3a", "CreateClipCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var animation = this.getComponent(cc.Animation);
        cc.loader.loadRes("test_assets/atlas", cc.SpriteAtlas, function(err, atlas) {
          var spriteFrames = atlas.getSpriteFrames();
          var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
          clip.name = "run";
          clip.wrapMode = cc.WrapMode.Loop;
          animation.addClip(clip);
          animation.play("run");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  CustomEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5cc23aoYcxIKazRFwKWGEI7", "CustomEvent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var touchEvent = this.getComponent("TouchEvent");
        touchEvent._callback = function() {
          this.node.emit("CUSTOM_EVENT");
        }.bind(this);
        var addButton = cc.find("Canvas/add");
        var cancelButton = cc.find("Canvas/cancel");
        function onCustomEvent(event) {
          this.runAction(cc.sequence(cc.scaleTo(.5, 2, 1), cc.scaleTo(.25, 1, 1)));
        }
        this.node.on("CUSTOM_EVENT", onCustomEvent, addButton);
        this.node.on("CUSTOM_EVENT", onCustomEvent, cancelButton);
      }
    });
    cc._RF.pop();
  }, {} ],
  Desactiver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dec21MuxY5K4L8T1bBPGM3r", "Desactiver");
    "use strict";
    cc.Class({
      extends: cc.Component,
      desactivate: function desactivate() {
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  DestroySelf: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c07302m/oFJeIq2igPCJbWE", "DestroySelf");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        console.log("Pos: " + this.node.getPosition().x + ", " + this.node.getPosition().y);
        this.node.runAction(cc.sequence(cc.moveBy(2, 200, 0), cc.callFunc(function() {
          console.log("Pos: " + this.node.x + ", " + this.node.y);
          this.node.destroy();
        }, this)));
      }
    });
    cc._RF.pop();
  }, {} ],
  DeviceMotionCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "189c1ckoZZHULnR52/pnCkv", "DeviceMotionCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 200,
        target: cc.Node,
        btn_label: cc.Label,
        _time: 0,
        _range: cc.v2(0, 0),
        _acc: cc.v2(0, 0)
      },
      onLoad: function onLoad() {
        this._enabled = false;
        var screenSize = cc.view.getVisibleSize();
        this._range.x = screenSize.width / 2 - this.target.width / 2;
        this._range.y = screenSize.height / 2 - this.target.height / 2;
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
      },
      onOpenAccelerometer: function onOpenAccelerometer() {
        this._enabled = !this._enabled;
        this._enabled ? this.btn_label.textKey = i18n.t("cases/03_gameplay/01_player_control/On/DeviceMotion.fire.2") : this.btn_label.textKey = i18n.t("cases/03_gameplay/01_player_control/On/DeviceMotion.fire.1");
        if (!this._enabled) {
          this._acc.x = 0;
          this._acc.y = 0;
          this._time = 0;
        }
        cc.systemEvent.setAccelerometerEnabled(this._enabled);
      },
      onDestroy: function onDestroy() {
        cc.systemEvent.setAccelerometerEnabled(false);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
      },
      onDeviceMotionEvent: function onDeviceMotionEvent(event) {
        this._acc.x = event.acc.x;
        this._acc.y = event.acc.y;
      },
      update: function update(dt) {
        var target = this.target, range = this._range;
        this._time += 5;
        target.x += this._acc.x * dt * (this.speed + this._time);
        target.x = cc.misc.clampf(target.x, -range.x, range.x);
        target.y += this._acc.y * dt * (this.speed + this._time);
        target.y = cc.misc.clampf(target.y, -range.y, range.y);
        (target.x <= -range.x || target.x >= range.x || target.y <= -range.y || target.y >= range.y) && (this._time = 0);
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  DownloaderCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "354a9KeL3pPRKzLyRBzHqyl", "DownloaderCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: cc.Label,
        sprite: cc.Sprite,
        imgUrl: "http://tools.itharbors.com/res/logo.png",
        txtUrl: "https://raw.githubusercontent.com/cocos-creator/tutorial-dark-slash/master/LICENSE.md",
        tempImgUrl: "http://www.cocos.com/wp-content/uploads/2018/03/%E9%BB%98%E8%AE%A4%E6%A0%87%E9%A2%98_%E5%85%AC%E4%BC%97%E5%8F%B7%E5%BA%95%E9%83%A8%E4%BA%8C%E7%BB%B4%E7%A0%81_2018.03.08.png",
        audioUrl: "http://tools.itharbors.com/christmas/res/sounds/ss.mp3",
        _downloader: null,
        _imgTask: null,
        _txtTask: null,
        _audioTask: null,
        _storagePath: "",
        _inited: false,
        _downloading: false
      },
      onLoad: function onLoad() {
        true;
        this.label.string = "Downloader is a NATIVE ONLY feature.";
        return;
      },
      onSucceed: function onSucceed(task) {
        var _this = this;
        -1 !== this._audioID && cc.audioEngine.stop(this._audioID);
        switch (task.requestURL) {
         case this.imgUrl:
          cc.loader.load(task.storagePath, function(err, tex) {
            _this.sprite.spriteFrame = new cc.SpriteFrame(tex);
            _this.sprite.node.active = true;
            _this.label.node.active = false;
          });
          break;

         case this.txtUrl:
          var content = jsb.fileUtils.getStringFromFile(task.storagePath);
          this.sprite.node.active = false;
          this.label.node.active = true;
          this.label.string = content.substr(0, 350);
          break;

         case this.audioUrl:
          this.sprite.node.active = false;
          this.label.node.active = true;
          this.label.string = "Audio Download Complete.";
          cc.loader.load(task.storagePath, function(err, clip) {
            _this._audioID = cc.audioEngine.play(clip);
          });
        }
        this._downloading = false;
      },
      onProgress: function onProgress(task, bytesReceived, totalBytesReceived, totalBytesExpected) {},
      onError: function onError(task, errorCode, errorCodeInternal, errorStr) {
        this._downloading = false;
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = "Failed to download file (" + task.requestURL + "): " + errorStr + "(" + errorCode + ")";
      },
      downloadImg: function downloadImg() {
        if (!this.imgUrl || !this._inited || this._downloading) return;
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = "Downloading image";
        this._imgTask = this._downloader.createDownloadFileTask(this.imgUrl, this._storagePath + "download1.png");
        this._downloading = true;
      },
      loadImg: function loadImg() {
        var _this2 = this;
        if (!this.tempImgUrl || !this._inited || this._downloading) return;
        this._downloading = true;
        this.label.string = "Downloading image (mem)";
        cc.loader.load(this.tempImgUrl, function(error, tex) {
          _this2._downloading = false;
          if (error) console.log("Load remote image failed: " + error); else {
            _this2.sprite.spriteFrame = new cc.SpriteFrame(tex);
            _this2.sprite.node.active = true;
            _this2.label.node.active = false;
            cc.audioEngine.stop(_this2._audioID);
          }
        });
      },
      downloadTxt: function downloadTxt() {
        if (!this.txtUrl || !this._inited || this._downloading) return;
        this.label.node.active = true;
        this.sprite.node.active = false;
        this.label.string = "Downloading Text";
        this._downloading = true;
        this._txtTask = this._downloader.createDownloadFileTask(this.txtUrl, this._storagePath + "imagine.txt");
      },
      downloadAudio: function downloadAudio() {
        if (!this.audioUrl || !this._inited || this._downloading) return;
        this.sprite.node.active = false;
        this.label.node.active = true;
        this.label.string = "Downloading Audio";
        this._downloading = true;
        this._audioTask = this._downloader.createDownloadFileTask(this.audioUrl, this._storagePath + "audioTest.mp3");
      },
      onDisable: function onDisable() {
        cc.audioEngine.stop(this._audioID);
      }
    });
    cc._RF.pop();
  }, {} ],
  DragonBonesCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51a99xQI4JAXqBjenKXSIjl", "DragonBonesCtrl");
    "use strict";
    if (!cc.runtime) {
      var NORMAL_ANIMATION_GROUP = "normal";
      var AIM_ANIMATION_GROUP = "aim";
      var ATTACK_ANIMATION_GROUP = "attack";
      var JUMP_SPEED = -20;
      var NORMALIZE_MOVE_SPEED = 3.6;
      var MAX_MOVE_SPEED_FRONT = 1.4 * NORMALIZE_MOVE_SPEED;
      var MAX_MOVE_SPEED_BACK = 1 * NORMALIZE_MOVE_SPEED;
      var WEAPON_R_LIST = [ "weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e" ];
      var WEAPON_L_LIST = [ "weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d" ];
      var GROUND = -200;
      var G = -.6;
      cc.Class({
        extends: cc.Component,
        editor: {
          requireComponent: dragonBones.ArmatureDisplay
        },
        properties: {
          touchHandler: {
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
          _bullets: [],
          _left: false,
          _right: false,
          _isJumpingA: false,
          _isJumpingB: false,
          _isSquating: false,
          _isAttackingA: false,
          _isAttackingB: false,
          _weaponRIndex: 0,
          _weaponLIndex: 0,
          _faceDir: 1,
          _aimDir: 0,
          _moveDir: 0,
          _aimRadian: 0,
          _speedX: 0,
          _speedY: 0,
          _armature: null,
          _armatureDisplay: null,
          _weaponR: null,
          _weaponL: null,
          _aimState: null,
          _walkState: null,
          _attackState: null,
          _target: cc.v2(0, 0)
        },
        onLoad: function onLoad() {
          var _this = this;
          this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
          this._armature = this._armatureDisplay.armature();
          this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
          this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
          this._armature.getSlot("effects_1").displayController = NORMAL_ANIMATION_GROUP;
          this._armature.getSlot("effects_2").displayController = NORMAL_ANIMATION_GROUP;
          this._weaponR = this._armature.getSlot("weapon_r").childArmature;
          this._weaponL = this._armature.getSlot("weapon_l").childArmature;
          this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
          this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
          this._updateAnimation();
          if (this.touchHandler) {
            this.touchHandler.on(cc.Node.EventType.TOUCH_START, function(event) {
              var touches = event.getTouches();
              var touchLoc = touches[0].getLocation();
              _this.aim(touchLoc.x, touchLoc.y);
              _this.attack(true);
            }, this);
            this.touchHandler.on(cc.Node.EventType.TOUCH_END, function(event) {
              _this.attack(false);
            }, this);
            this.touchHandler.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
              var touches = event.getTouches();
              var touchLoc = touches[0].getLocation();
              _this.aim(touchLoc.x, touchLoc.y);
            }, this);
          }
          this.upButton && this.upButton.on(cc.Node.EventType.TOUCH_START, function(event) {
            _this.jump();
          }, this);
          if (this.downButton) {
            this.downButton.on(cc.Node.EventType.TOUCH_START, function(event) {
              _this.squat(true);
            }, this);
            this.downButton.on(cc.Node.EventType.TOUCH_END, function(event) {
              _this.squat(false);
            }, this);
            this.downButton.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
              _this.squat(false);
            }, this);
          }
          if (this.leftButton) {
            this.leftButton.on(cc.Node.EventType.TOUCH_START, function(event) {
              _this._left = true;
              _this._updateMove(-1);
            }, this);
            this.leftButton.on(cc.Node.EventType.TOUCH_END, function(event) {
              _this._left = false;
              _this._updateMove(-1);
            }, this);
            this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
              _this._left = false;
              _this._updateMove(-1);
            }, this);
          }
          if (this.rightButton) {
            this.rightButton.on(cc.Node.EventType.TOUCH_START, function(event) {
              _this._right = true;
              _this._updateMove(1);
            }, this);
            this.rightButton.on(cc.Node.EventType.TOUCH_END, function(event) {
              _this._right = false;
              _this._updateMove(1);
            }, this);
            this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
              _this._right = false;
              _this._updateMove(1);
            }, this);
          }
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
            this._keyHandler(event.keyCode, true);
          }, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event) {
            this._keyHandler(event.keyCode, false);
          }, this);
        },
        _keyHandler: function _keyHandler(keyCode, isDown) {
          switch (keyCode) {
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
            isDown && this.jump();
            break;

           case cc.macro.KEY.s:
           case cc.macro.KEY.down:
            this.squat(isDown);
            break;

           case cc.macro.KEY.q:
            isDown && this.switchWeaponR();
            break;

           case cc.macro.KEY.e:
            isDown && this.switchWeaponL();
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
        _updateMove: function _updateMove(dir) {
          this._left && this._right ? this.move(dir) : this._left ? this.move(-1) : this._right ? this.move(1) : this.move(0);
        },
        move: function move(dir) {
          if (this._moveDir === dir) return;
          this._moveDir = dir;
          this._updateAnimation();
        },
        jump: function jump() {
          if (this._isJumpingA) return;
          this._isJumpingA = true;
          this._armature.animation.fadeIn("jump_1", -1, -1, 0, NORMAL_ANIMATION_GROUP);
          this._walkState = null;
        },
        squat: function squat(isSquating) {
          if (this._isSquating === isSquating) return;
          this._isSquating = isSquating;
          this._updateAnimation();
        },
        attack: function attack(isAttacking) {
          if (this._isAttackingA == isAttacking) return;
          this._isAttackingA = isAttacking;
        },
        switchWeaponL: function switchWeaponL() {
          this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
          this._weaponLIndex = (this._weaponLIndex + 1) % WEAPON_L_LIST.length;
          var newWeaponName = WEAPON_L_LIST[this._weaponLIndex];
          this._weaponL = this._armatureDisplay.buildArmature(newWeaponName);
          this._armature.getSlot("weapon_l").childArmature = this._weaponL.armature();
          this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        },
        switchWeaponR: function switchWeaponR() {
          this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
          this._weaponRIndex = (this._weaponRIndex + 1) % WEAPON_R_LIST.length;
          var newWeaponName = WEAPON_R_LIST[this._weaponRIndex];
          this._weaponR = this._armatureDisplay.buildArmature(newWeaponName);
          this._armature.getSlot("weapon_r").childArmature = this._weaponR.armature();
          this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        },
        aim: function aim(x, y) {
          0 === this._aimDir && (this._aimDir = 10);
          this._target = this.node.parent.convertToNodeSpaceAR(cc.v2(x, y));
        },
        update: function update(dt) {
          this._updatePosition();
          this._updateAim();
          this._updateAttack();
          this._enterFrameHandler(dt);
        },
        onDisable: function onDisable() {
          for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];
            bullet.enabled = false;
          }
          this._bullets = [];
        },
        addBullet: function addBullet(bullet) {
          this._bullets.push(bullet);
        },
        _enterFrameHandler: function _enterFrameHandler(dt) {
          for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];
            bullet.update() && this._bullets.splice(i, 1);
          }
        },
        _animationEventHandler: function _animationEventHandler(event) {
          if (event.type === dragonBones.EventObject.FADE_IN_COMPLETE) if ("jump_1" === event.animationState.name) {
            this._isJumpingB = true;
            this._speedY = -JUMP_SPEED;
            this._armature.animation.fadeIn("jump_2", -1, -1, 0, NORMAL_ANIMATION_GROUP);
          } else "jump_4" === event.animationState.name && this._updateAnimation(); else if (event.type === dragonBones.EventObject.FADE_OUT_COMPLETE && "attack_01" === event.animationState.name) {
            this._isAttackingB = false;
            this._attackState = null;
          }
        },
        _frameEventHandler: function _frameEventHandler(event) {
          if ("onFire" === event.name) {
            var firePointBone = event.armature.getBone("firePoint");
            var localPoint = cc.v2(firePointBone.global.x, -firePointBone.global.y);
            var display = event.armature.display;
            var globalPoint = display.node.convertToWorldSpace(localPoint);
            this._fire(globalPoint);
          }
        },
        _fire: function _fire(firePoint) {
          firePoint.x += 2 * Math.random() - 1;
          firePoint.y += 2 * Math.random() - 1;
          var armature = this._armatureDisplay.buildArmature("bullet_01");
          var effect = this._armatureDisplay.buildArmature("fireEffect_01");
          var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
          var bullet = new DragonBullet();
          bullet.init(this.node.parent, armature, effect, radian + .02 * Math.random() - .01, 40, firePoint);
          this.addBullet(bullet);
        },
        _updateAnimation: function _updateAnimation() {
          if (this._isJumpingA) return;
          if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            this._walkState = null;
            return;
          }
          if (0 === this._moveDir) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            this._walkState = null;
          } else {
            this._walkState || (this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, NORMAL_ANIMATION_GROUP));
            this._moveDir * this._faceDir > 0 ? this._walkState.timeScale = MAX_MOVE_SPEED_FRONT / NORMALIZE_MOVE_SPEED : this._walkState.timeScale = -MAX_MOVE_SPEED_BACK / NORMALIZE_MOVE_SPEED;
            this._moveDir * this._faceDir > 0 ? this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir : this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
          }
        },
        _updatePosition: function _updatePosition() {
          if (0 !== this._speedX) {
            this.node.x += this._speedX;
            var minX = -cc.visibleRect.width / 2;
            var maxX = cc.visibleRect.width / 2;
            this.node.x < minX ? this.node.x = minX : this.node.x > maxX && (this.node.x = maxX);
          }
          if (0 != this._speedY) {
            this._speedY > 5 && this._speedY + G <= 5 && this._armature.animation.fadeIn("jump_3", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            this._speedY += G;
            this.node.y += this._speedY;
            if (this.node.y < GROUND) {
              this.node.y = GROUND;
              this._isJumpingA = false;
              this._isJumpingB = false;
              this._speedY = 0;
              this._speedX = 0;
              this._armature.animation.fadeIn("jump_4", -1, -1, 0, NORMAL_ANIMATION_GROUP);
              (this._isSquating || this._moveDir) && this._updateAnimation();
            }
          }
        },
        _updateAim: function _updateAim() {
          if (0 === this._aimDir) return;
          this._faceDir = this._target.x > this.node.x ? 1 : -1;
          if (this.node.scaleX * this._faceDir < 0) {
            this.node.scaleX *= -1;
            this._moveDir && this._updateAnimation();
          }
          var aimOffsetY = this._armature.getBone("chest").global.y * this.node.scaleY;
          if (this._faceDir > 0) this._aimRadian = Math.atan2(-(this._target.y - this.node.y + aimOffsetY), this._target.x - this.node.x); else {
            this._aimRadian = Math.PI - Math.atan2(-(this._target.y - this.node.y + aimOffsetY), this._target.x - this.node.x);
            this._aimRadian > Math.PI && (this._aimRadian -= 2 * Math.PI);
          }
          var aimDir = 0;
          aimDir = this._aimRadian > 0 ? -1 : 1;
          if (this._aimDir != aimDir) {
            this._aimDir = aimDir;
            this._aimDir >= 0 ? this._aimState = this._armature.animation.fadeIn("aimUp", .01, 1, 0, AIM_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup) : this._aimState = this._armature.animation.fadeIn("aimDown", .01, 1, 0, AIM_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup);
          }
          this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);
          this._armature.invalidUpdate();
        },
        _updateAttack: function _updateAttack() {
          if (!this._isAttackingA || this._isAttackingB) return;
          this._isAttackingB = true;
          this._attackState = this._armature.animation.fadeIn("attack_01", -1, -1, 0, ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup);
          this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
          this._attackState.addBoneMask("pelvis");
        }
      });
      var DragonBullet = cc.Class({
        name: "DragonBullet",
        _speedX: 0,
        _speedY: 0,
        _armature: null,
        _armatureDisplay: null,
        _effect: null,
        init: function init(parentNode, armature, effect, radian, speed, position) {
          this._speedX = Math.cos(radian) * speed;
          this._speedY = -Math.sin(radian) * speed;
          var thePos = parentNode.convertToNodeSpaceAR(position);
          armature.playAnimation("idle");
          var armatureNode = armature.node;
          armatureNode.setPosition(thePos);
          armatureNode.rotation = radian * cc.macro.DEG;
          this._armature = armature;
          if (effect) {
            this._effect = effect;
            var effectDisplay = this._effect.node;
            effectDisplay.rotation = radian * cc.macro.DEG;
            effectDisplay.setPosition(thePos);
            effectDisplay.scaleX = 1 + 1 * Math.random();
            effectDisplay.scaleY = 1 + .5 * Math.random();
            Math.random() < .5 && (effectDisplay.scaleY *= -1);
            this._effect.playAnimation("idle");
            parentNode.addChild(effectDisplay);
          }
          parentNode.addChild(armatureNode);
        },
        update: function update() {
          var armatureNode = this._armature.node;
          armatureNode.x += this._speedX;
          armatureNode.y += this._speedY;
          var worldPos = armatureNode.parent.convertToWorldSpaceAR(armatureNode.getPosition());
          if (worldPos.x < -100 || worldPos.x >= cc.visibleRect.width + 100 || worldPos.y < -100 || worldPos.y >= cc.visibleRect.height + 100) {
            this.doClean();
            return true;
          }
          return false;
        },
        onDisable: function onDisable() {
          this.doClean();
        },
        doClean: function doClean() {
          this._armature.node.removeFromParent();
          this._effect && this._effect.node.removeFromParent();
        }
      });
    }
    cc._RF.pop();
  }, {} ],
  EditBoxEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5984fyb0ONArqT4eV/OjCgP", "EditBoxEvent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        editBox: cc.EditBox,
        eventDisplay: cc.Label,
        _isEditingReturn: false
      },
      editingDidBegan: function editingDidBegan(event) {
        this.eventDisplay.string = "editing did began";
      },
      textChanged: function textChanged(event) {
        this.eventDisplay.string = "text changed: " + event;
      },
      editingDidEnded: function editingDidEnded(event) {
        if (this._isEditingReturn) {
          this.eventDisplay.string = "editing returned and ended";
          this._isEditingReturn = false;
        } else this.eventDisplay.string = "editing did ended";
      },
      editingReturn: function editingReturn(event) {
        this._isEditingReturn = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  EditBoxFocus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a7ff6UBHVKV4jTfKY/YtyS", "EditBoxFocus");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        editBox1: cc.EditBox,
        editBox2: cc.EditBox,
        editBox3: cc.EditBox
      },
      onLoad: function onLoad() {},
      setFocus: function setFocus(event) {
        var target = event.target;
        "Button1" === target.name ? this.editBox1.focus() : "Button2" === target.name ? this.editBox2.focus() : "Button3" === target.name && this.editBox3.focus();
        this.editBox1.isFocused() && cc.log("Button1 is focused");
        this.editBox2.isFocused() && cc.log("Button2 is focused");
        this.editBox3.isFocused() && cc.log("Button3 is focused");
      }
    });
    cc._RF.pop();
  }, {} ],
  EditboxCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd654DFPoRNVKRWOuQdLiEE", "EditboxCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        singleLineText: {
          default: null,
          type: cc.EditBox
        },
        singleLinePassword: {
          default: null,
          type: cc.EditBox
        },
        multiLineText: {
          default: null,
          type: cc.EditBox
        },
        showEditorBoxLabel: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {},
      singleLineEditBoxDidBeginEditing: function singleLineEditBoxDidBeginEditing(sender) {
        cc.log(sender.node.name + " single line editBoxDidBeginEditing");
      },
      singleLineEditBoxDidChanged: function singleLineEditBoxDidChanged(text, sender) {
        cc.log(sender.node.name + " single line editBoxDidChanged: " + text);
      },
      singleLineEditBoxDidEndEditing: function singleLineEditBoxDidEndEditing(sender) {
        cc.log(sender.node.name + " single line editBoxDidEndEditing: " + this.singleLineText.string);
      },
      singleLinePasswordEditBoxDidBeginEditing: function singleLinePasswordEditBoxDidBeginEditing(sender) {
        cc.log(sender.node.name + " single line password editBoxDidBeginEditing");
      },
      singleLinePasswordEditBoxDidChanged: function singleLinePasswordEditBoxDidChanged(text, sender) {
        cc.log(sender.node.name + " single line password editBoxDidChanged: " + text);
      },
      singleLinePasswordEditBoxDidEndEditing: function singleLinePasswordEditBoxDidEndEditing(sender) {
        cc.log(sender.node.name + " single line password editBoxDidEndEditing: " + this.singleLinePassword.string);
      },
      multiLinePasswordEditBoxDidBeginEditing: function multiLinePasswordEditBoxDidBeginEditing(sender) {
        cc.log(sender.node.name + " multi line editBoxDidBeginEditing");
      },
      multiLinePasswordEditBoxDidChanged: function multiLinePasswordEditBoxDidChanged(text, sender) {
        cc.log(sender.node.name + " multi line editBoxDidChanged: " + text);
      },
      multiLinePasswordEditBoxDidEndEditing: function multiLinePasswordEditBoxDidEndEditing(sender) {
        cc.log(sender.node.name + " multi line editBoxDidEndEditing: " + this.multiLineText.string);
      },
      buttonClicked: function buttonClicked() {
        cc.log("button Clicked!");
        "" !== this.singleLineText.string ? this.showEditorBoxLabel.string = i18n.t("cases/02_ui/07_editBox/editbox.js.1") + this.singleLineText.string : this.showEditorBoxLabel.string = "";
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  FilledSpriteControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50a95ObLqFH2rz6eShvGuNK", "FilledSpriteControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: .1,
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
      update: function update(dt) {
        this._updataFillStart(this.horizontal, dt);
        this._updataFillStart(this.vertical, dt);
        this._updateFillRange(this.radial_round, 1, dt);
        this._updateFillRange(this.radial_semicircle, .5, dt);
      },
      _updataFillStart: function _updataFillStart(sprite, dt) {
        var fillStart = sprite.fillStart;
        fillStart = fillStart > 0 ? fillStart -= dt * this.speed : 1;
        sprite.fillStart = fillStart;
      },
      _updateFillRange: function _updateFillRange(sprite, range, dt) {
        var fillRange = sprite.fillRange;
        fillRange = fillRange < range ? fillRange += dt * this.speed : 0;
        sprite.fillRange = fillRange;
      }
    });
    cc._RF.pop();
  }, {} ],
  Foo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ea36nYikVOup6BzaEIMYPH", "Foo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: function properties() {
        return {
          refToBar: require("Bar")
        };
      },
      onLoad: function onLoad() {
        var tip = this.node.children[0].getComponent(cc.Label);
        tip.string = this.name + " has reference to " + this.refToBar.name;
      }
    });
    cc._RF.pop();
  }, {
    Bar: "Bar"
  } ],
  GoldBeatingAnime: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea8108bpl9ErIGOELI2Fezi", "GoldBeatingAnime");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 50,
        gold_label: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.curGold = 0;
        this.curIndex = 0;
      },
      update: function update(dt) {
        this.curIndex += dt * this.speed;
        if (this.curIndex > 10) {
          this.curIndex = 0;
          this.curGold++;
          this.gold_label.string += this.curGold;
          if (this.gold_label.string.length > 10) {
            this.gold_label.string = i18n.t("cases/02_ui/02_label/GoldBeatingAnime.js.1");
            this.curGold = 0;
          }
        }
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  Helpers: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8640M3ozRErrV/Go3uTknt", "Helpers");
    "use strict";
    false;
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    module.exports = {
      getRandomInt: getRandomInt
    };
    cc._RF.pop();
  }, {} ],
  HeroControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "339d2dg1QpEKKxBJBzHiDJ0", "HeroControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2e3, 2e3),
        gravity: -1e3,
        drag: 1e3,
        direction: 0,
        jumpSpeed: 300
      },
      onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
        this.collisionX = 0;
        this.collisionY = 0;
        this.prePosition = cc.v2();
        this.preStep = cc.v2();
        this.touchingNumber = 0;
      },
      onEnable: function onEnable() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
      },
      onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
      },
      onKeyPressed: function onKeyPressed(event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
         case cc.macro.KEY.a:
         case cc.macro.KEY.left:
          this.direction = -1;
          break;

         case cc.macro.KEY.d:
         case cc.macro.KEY.right:
          this.direction = 1;
          break;

         case cc.macro.KEY.w:
         case cc.macro.KEY.up:
          if (!this.jumping) {
            this.jumping = true;
            this.speed.y = this.jumpSpeed;
          }
        }
      },
      onKeyReleased: function onKeyReleased(event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
         case cc.macro.KEY.a:
         case cc.macro.KEY.left:
         case cc.macro.KEY.d:
         case cc.macro.KEY.right:
          this.direction = 0;
        }
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.color = cc.Color.RED;
        this.touchingNumber++;
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
          if (this.speed.x < 0 && selfPreAabb.xMax > otherPreAabb.xMax) {
            this.node.x = otherPreAabb.xMax - this.node.parent.x;
            this.collisionX = -1;
          } else if (this.speed.x > 0 && selfPreAabb.xMin < otherPreAabb.xMin) {
            this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
            this.collisionX = 1;
          }
          this.speed.x = 0;
          other.touchingX = true;
          return;
        }
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
          if (this.speed.y < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
            this.node.y = otherPreAabb.yMax - this.node.parent.y;
            this.jumping = false;
            this.collisionY = -1;
          } else if (this.speed.y > 0 && selfPreAabb.yMin < otherPreAabb.yMin) {
            this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
            this.collisionY = 1;
          }
          this.speed.y = 0;
          other.touchingY = true;
        }
      },
      onCollisionStay: function onCollisionStay(other, self) {
        if (-1 === this.collisionY && "Platform" === other.node.group) {
          var motion = other.node.getComponent("PlatformMotion");
          motion && (this.node.x += motion._movedDiff);
        }
      },
      onCollisionExit: function onCollisionExit(other) {
        this.touchingNumber--;
        0 === this.touchingNumber && (this.node.color = cc.Color.WHITE);
        if (other.touchingX) {
          this.collisionX = 0;
          other.touchingX = false;
        } else if (other.touchingY) {
          other.touchingY = false;
          this.collisionY = 0;
          this.jumping = true;
        }
      },
      update: function update(dt) {
        if (0 === this.collisionY) {
          this.speed.y += this.gravity * dt;
          Math.abs(this.speed.y) > this.maxSpeed.y && (this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y);
        }
        if (0 === this.direction) {
          if (this.speed.x > 0) {
            this.speed.x -= this.drag * dt;
            this.speed.x <= 0 && (this.speed.x = 0);
          } else if (this.speed.x < 0) {
            this.speed.x += this.drag * dt;
            this.speed.x >= 0 && (this.speed.x = 0);
          }
        } else {
          this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
          Math.abs(this.speed.x) > this.maxSpeed.x && (this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x);
        }
        this.speed.x * this.collisionX > 0 && (this.speed.x = 0);
        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;
        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
      }
    });
    cc._RF.pop();
  }, {} ],
  HideOrShowEventLogItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8603ZTz2JHKadF2qYm6voj", "HideOrShowEventLogItem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        timeLabel: cc.Label,
        eventLabel: cc.Label
      },
      setTimeDisplay: function setTimeDisplay(value) {
        this.timeLabel.string = value;
      },
      setEventDisplay: function setEventDisplay(value) {
        this.eventLabel.string = value;
      }
    });
    cc._RF.pop();
  }, {} ],
  HideOrShowEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "282e6VUvodHyJZ4hyM8x8qf", "HideOrShowEvent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollViewContent: cc.Node,
        logItem: cc.Prefab
      },
      onLoad: function onLoad() {
        var self = this;
        cc.game.on(cc.game.EVENT_HIDE, this.addHideLogItem, this);
        cc.game.on(cc.game.EVENT_SHOW, this.addShowLogItem, this);
      },
      onDestroy: function onDestroy() {
        cc.game.off(cc.game.EVENT_HIDE, this.addHideLogItem, this);
        cc.game.off(cc.game.EVENT_SHOW, this.addShowLogItem, this);
      },
      addHideLogItem: function addHideLogItem() {
        var item = cc.instantiate(this.logItem);
        var comp = item.getComponent("HideOrShowEventLogItem");
        comp && comp.setTimeDisplay(this.getTimes());
        comp && comp.setEventDisplay("EVENT_HIDE triggered");
        this.scrollViewContent.addChild(item);
      },
      addShowLogItem: function addShowLogItem() {
        var item = cc.instantiate(this.logItem);
        var comp = item.getComponent("HideOrShowEventLogItem");
        comp && comp.setTimeDisplay(this.getTimes());
        comp && comp.setEventDisplay("EVENT_SHOW triggered");
        this.scrollViewContent.addChild(item);
      },
      getTimes: function getTimes() {
        var date = new Date();
        return "[" + date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds() + "]";
      },
      clearLog: function clearLog() {
        this.scrollViewContent.children.forEach(function(node) {
          node.destroy();
        });
        this.scrollViewContent.children.length = 0;
      }
    });
    cc._RF.pop();
  }, {} ],
  Hittest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49ade5wuu9ILKDuwPmdIALx", "Hittest");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        collider: {
          default: null,
          type: cc.PolygonCollider
        },
        title: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.title.string = "normal";
        this.node.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
          var touchLoc = touch.getLocation();
          cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points) ? this.title.string = "Hit" : this.title.string = "Not hit";
        }, this);
      },
      onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.node.off(cc.Node.EventType.TOUCH_START);
      }
    });
    cc._RF.pop();
  }, {} ],
  InitData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ae4cUsGcBIE4q7Ksp4ZX/H", "InitData");
    "use strict";
    var _monsterInfo = {
      name: "Slime",
      hp: 100,
      lv: 1,
      atk: 10,
      defense: 5,
      imageUrl: "test_assets/PurpleMonster"
    };
    module.exports = {
      monsterInfo: _monsterInfo
    };
    cc._RF.pop();
  }, {} ],
  Instruction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a871gy73FDLap3Eje/2h6i", "Instruction");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        text: {
          default: "",
          multiline: true
        }
      },
      onLoad: function onLoad() {}
    });
    cc._RF.pop();
  }, {} ],
  Item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "920c8a5MahAhbCTSvmQvaB+", "Item");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        tmplID: 0,
        itemID: 0
      },
      onLoad: function onLoad() {
        this.node.on("touchend", function() {
          console.log("Item " + this.itemID + " clicked");
        }, this);
      },
      initItem: function initItem(tmplID, itemID) {
        this.tmplID = tmplID;
        this.itemID = itemID;
        this.label.textKey = i18n.t("cases/02_ui/05_scrollView/Item.js.1") + this.tmplID + " Item#" + this.itemID;
      },
      updateItem: function updateItem(itemID) {
        this.itemID = itemID;
        this.label.textKey = i18n.t("cases/02_ui/05_scrollView/Item.js.1") + this.tmplID + " Item#" + this.itemID;
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  LabelLocalized: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4f88adp3hERoJ48DZ2PSAl", "LabelLocalized");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Label,
      properties: {
        textKey: {
          default: "TEXT_KEY",
          multiline: true,
          tooltip: "Enter i18n key here",
          notify: function notify() {
            this.string = this.localizedString;
          }
        },
        localizedString: {
          override: true,
          tooltip: "Here shows the localized string of Text Key",
          get: function get() {
            return i18n.t(this.textKey);
          },
          set: function set(value) {
            this.textKey = value;
            false;
          }
        }
      },
      onLoad: function onLoad() {
        this.localizedString && (this.string = this.localizedString);
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  LayoutResizeContainerCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2bbedtV3blCVJbmf2E9h/0V", "LayoutResizeContainerCtrl");
    "use strict";
    var info = cc.Class({
      name: "info",
      properties: {
        target: cc.Node,
        num: 0
      }
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        itemTemp: {
          default: null,
          type: cc.Prefab
        },
        targetAry: {
          default: [],
          type: [ info ]
        }
      },
      onLoad: function onLoad() {
        this._curTime = 0;
        this._curIndex = 0;
      },
      _createItem: function _createItem(parentNode, idx) {
        var item = cc.instantiate(this.itemTemp);
        var label = item.getComponentInChildren(cc.Label);
        label.string = idx;
        item.parent = parentNode;
      },
      update: function update(dt) {
        this._curTime += dt;
        if (this._curTime >= 1) {
          this._curTime = 0;
          for (var i = 0; i < this.targetAry.length; ++i) {
            var num = this.targetAry[i].num;
            var target = this.targetAry[i].target;
            target && this._curIndex < num && this._createItem(target, this._curIndex);
          }
          this._curIndex++;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  ListItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa63bWNE8hBf4P4Sp0X2uT0", "ListItem");
    "use strict";
    var TipsManager = require("TipsManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        url: "",
        bg: cc.Sprite,
        btn: cc.Button
      },
      init: function init(menu) {
        this.index = -1;
        this.__name = "";
        this.menu = menu;
      },
      loadExample: function loadExample() {
        this.url && TipsManager.hasSupport(this.__name) && this.menu.loadScene(this.url);
      },
      updateItem: function updateItem(idx, y, name, url) {
        var isDir = !url;
        this.index = idx;
        this.node.y = y;
        this.node.x = isDir ? 50 : 100;
        this.label.string = this.__name = name;
        this.url = url;
        this.bg.enabled = !isDir;
        this.btn.interactable = !isDir;
      }
    });
    cc._RF.pop();
  }, {
    TipsManager: "TipsManager"
  } ],
  ListViewCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6458+hf5VAnIXocmvhggqC", "ListViewCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        itemTemplate: {
          default: null,
          type: cc.Node
        },
        scrollView: {
          default: null,
          type: cc.ScrollView
        },
        spawnCount: 0,
        totalCount: 0,
        spacing: 0,
        bufferZone: 0,
        lblScrollEvent: cc.Label,
        btnAddItem: cc.Button,
        btnRemoveItem: cc.Button,
        btnJumpToPosition: cc.Button,
        lblJumpPosition: cc.Label,
        lblTotalItems: cc.Label
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = [];
        this.initialize();
        this.updateTimer = 0;
        this.updateInterval = .2;
        this.lastContentPosY = 0;
      },
      initialize: function initialize() {
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing;
        for (var i = 0; i < this.spawnCount; ++i) {
          var item = cc.instantiate(this.itemTemplate);
          this.content.addChild(item);
          item.setPosition(0, -item.height * (.5 + i) - this.spacing * (i + 1));
          item.getComponent("Item").initItem(i, i);
          this.items.push(item);
        }
      },
      getPositionInView: function getPositionInView(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      },
      update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY;
        var offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (var i = 0; i < items.length; ++i) {
          var viewPos = this.getPositionInView(items[i]);
          if (isDown) {
            if (viewPos.y < -buffer && items[i].y + offset < 0) {
              items[i].y = items[i].y + offset;
              var item = items[i].getComponent("Item");
              var itemId = item.itemID - items.length;
              item.updateItem(itemId);
            }
          } else if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
            items[i].y = items[i].y - offset;
            var _item = items[i].getComponent("Item");
            var _itemId = _item.itemID + items.length;
            _item.updateItem(_itemId);
          }
        }
        this.lastContentPosY = this.scrollView.content.y;
        this.lblTotalItems.textKey = "Total Items: " + this.totalCount;
      },
      scrollEvent: function scrollEvent(sender, event) {
        switch (event) {
         case 0:
          this.lblScrollEvent.string = "Scroll to Top";
          break;

         case 1:
          this.lblScrollEvent.string = "Scroll to Bottom";
          break;

         case 2:
          this.lblScrollEvent.string = "Scroll to Left";
          break;

         case 3:
          this.lblScrollEvent.string = "Scroll to Right";
          break;

         case 4:
          this.lblScrollEvent.string = "Scrolling";
          break;

         case 5:
          this.lblScrollEvent.string = "Bounce Top";
          break;

         case 6:
          this.lblScrollEvent.string = "Bounce bottom";
          break;

         case 7:
          this.lblScrollEvent.string = "Bounce left";
          break;

         case 8:
          this.lblScrollEvent.string = "Bounce right";
          break;

         case 9:
          this.lblScrollEvent.string = "Auto scroll ended";
        }
      },
      addItem: function addItem() {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing;
        this.totalCount = this.totalCount + 1;
      },
      removeItem: function removeItem() {
        if (this.totalCount - 1 < 30) {
          cc.error("can't remove item less than 30!");
          return;
        }
        this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing;
        this.totalCount = this.totalCount - 1;
        this.moveBottomItemToTop();
      },
      moveBottomItemToTop: function moveBottomItemToTop() {
        var offset = (this.itemTemplate.height + this.spacing) * this.items.length;
        var length = this.items.length;
        var item = this.getItemAtBottom();
        if (item.y + offset < 0) {
          item.y = item.y + offset;
          var itemComp = item.getComponent("Item");
          var itemId = itemComp.itemID - length;
          itemComp.updateItem(itemId);
        }
      },
      getItemAtBottom: function getItemAtBottom() {
        var item = this.items[0];
        for (var i = 1; i < this.items.length; ++i) item.y > this.items[i].y && (item = this.items[i]);
        return item;
      },
      scrollToFixedPosition: function scrollToFixedPosition() {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
      }
    });
    cc._RF.pop();
  }, {} ],
  LoadModuleCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e702GubHpK+4vAb3yu2OW5", "LoadModuleCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        monsterTemp: {
          default: null,
          type: cc.Prefab
        },
        btn_createMonster: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.btn_createMonster.on(cc.Node.EventType.TOUCH_END, this.createMoster.bind(this));
      },
      createMoster: function createMoster() {
        var monster = cc.instantiate(this.monsterTemp);
        var Monster = require("Monster");
        var monsterComp = monster.getComponent(Monster);
        var InitData = require("InitData");
        monsterComp.initInfo(InitData.monsterInfo);
        monster.parent = this.node;
        monster.setPosition(cc.v2(0, 0));
        this.btn_createMonster.active = false;
      }
    });
    cc._RF.pop();
  }, {
    InitData: "InitData",
    Monster: "Monster"
  } ],
  LoadRes_example: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d7c19DG8M5Dp7vHrQu5a8gK", "LoadRes_example");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        content: cc.Node,
        _url: []
      },
      onLoad: function onLoad() {
        this._url = [ "test_assets/atlas", "test_assets/prefab" ];
      },
      loadSpriteFrame: function loadSpriteFrame() {
        var _this = this;
        var url = this._url[0];
        this._releaseResource(url, cc.SpriteAtlas);
        cc.loader.loadRes(url, cc.SpriteAtlas, function(err, atlas) {
          _this._removeAllChildren();
          cc.loader.setAutoRelease(atlas, true);
          var node = new cc.Node();
          _this.content.addChild(node);
          node.position = cc.v2(0, 0);
          var sprite = node.addComponent(cc.Sprite);
          sprite.spriteFrame = atlas.getSpriteFrame("sheep_run_0");
        });
      },
      loadPrefab: function loadPrefab() {
        var _this2 = this;
        var url = this._url[1];
        this._releaseResource(url, cc.Prefab);
        cc.loader.loadRes(url, cc.Prefab, function(err, prefab) {
          _this2._removeAllChildren();
          cc.loader.setAutoRelease(prefab, true);
          var node = cc.instantiate(prefab);
          _this2.content.addChild(node);
          node.position = cc.v2(0, 0);
        });
      },
      onDisable: function onDisable() {
        this._releaseResource(this._url[0], cc.SpriteAtlas);
        this._releaseResource(this._url[1], cc.Prefab);
      },
      _removeAllChildren: function _removeAllChildren() {
        this.content.removeAllChildren(true);
      },
      _releaseResource: function _releaseResource(url, type) {
        this._removeAllChildren();
        var res = cc.loader.getRes(url, type);
        var all = cc.loader.getDependsRecursively(res);
        cc.loader.release(all);
      }
    });
    cc._RF.pop();
  }, {} ],
  LoadSpine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "282b2tQFyZNyISOFPjrcQoM", "LoadSpine");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      editor: {
        requireComponent: sp.Skeleton
      },
      properties: {
        label: {
          default: null,
          type: cc.Label
        }
      },
      start: function start() {
        cc.loader.loadRes("loadSpine/alien-ess", sp.SkeletonData, this.onProcess.bind(this), this.onComplete.bind(this));
      },
      onProcess: function onProcess(completeCount, totalCount, item) {},
      onComplete: function onComplete(err, res) {
        if (err) {
          this.label.textKey = i18n.t("sprite_loadRes_asset_failed");
          cc.error(err);
        }
        var spine = this.getComponent("sp.Skeleton");
        spine.skeletonData = res;
        var animate = spine.setAnimation(0, "run", true);
        this.label.textKey = i18n.t("sprite_loadRes_asset_success");
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  LoadingBarCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "102a9wU40RJd4SnQqQQzQT9", "LoadingBarCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        progressBar: {
          default: null,
          type: cc.ProgressBar
        },
        progressTips: {
          default: null,
          type: cc.Label
        },
        laodBg: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this._urls = [ cc.url.raw("resources/audio/ding.wav"), cc.url.raw("resources/audio/cheering.wav"), cc.url.raw("resources/audio/music_logo.mp3"), cc.url.raw("resources/test_assets/audio.mp3"), cc.url.raw("resources/loadingBar/font.png"), cc.url.raw("resources/loadingBar/mikado_outline_shadow.png"), cc.url.raw("resources/loadingBar/enligsh-chinese.png") ];
        this.resource = null;
        this.progressBar.progress = 0;
        this._clearAll();
        this.progressTips.textKey = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.3");
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          if (this.resource) return;
          cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
        }, this);
      },
      _clearAll: function _clearAll() {
        for (var i = 0; i < this._urls.length; ++i) {
          var url = this._urls[i];
          var deps = cc.loader.getDependsRecursively(url);
          cc.loader.release(deps);
        }
      },
      _progressCallback: function _progressCallback(completedCount, totalCount, res) {
        this.progress = completedCount / totalCount;
        this.resource = res;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
      },
      _completeCallback: function _completeCallback(error, res) {},
      update: function update(dt) {
        if (!this.resource) return;
        var progress = this.progressBar.progress;
        if (progress >= 1) {
          this.progressTips.textKey = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1");
          this.laodBg.active = false;
          this.progressBar.node.active = false;
          this.enabled = false;
          return;
        }
        progress < this.progress && (progress += dt);
        this.progressBar.progress = progress;
        this.progressTips.textKey = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2") + this.resource.id + " (" + this.completedCount + "/" + this.totalCount + ")";
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  MaskCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c324aDRcOtM1oTGYSemsKTY", "MaskCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        mask: cc.Mask,
        slider: cc.Slider,
        label: cc.Label
      },
      onLoad: function onLoad() {
        this.slider.progress = this.mask.alphaThreshold;
      },
      update: function update(dt) {
        if (cc.game.renderType !== cc.game.RENDER_TYPE_WEBGL && true) return;
        this.mask.alphaThreshold = this.slider.progress;
        this.label.string = this.slider.progress.toFixed(1);
      }
    });
    cc._RF.pop();
  }, {} ],
  Menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04525pyYBlN26SWawaUF3dA", "Menu");
    "use strict";
    var i18n = require("i18n");
    var SceneList = require("SceneList");
    var TipsManager = require("TipsManager");
    var MainScene = "TestList.fire";
    cc.Class({
      extends: cc.Component,
      properties: {
        text: cc.Label,
        readme: cc.ScrollView,
        btnInfo: cc.Button,
        btnBack: cc.Button,
        testList: cc.ScrollView,
        uiCamera: cc.Camera,
        sceneTitle: cc.Label,
        searchBlock: cc.Node
      },
      onLoad: function onLoad() {
        this._isLoadingScene = false;
        this.showDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = MainScene;
        this.contentPos = null;
        this.btnBack.node.active = false;
        this.loadInstruction(this.currentSceneUrl);
        this.storage = this.node.getComponent("StorageUtil");
        cc.game.addPersistRootNode(this.searchBlock);
        cc.game.addPersistRootNode(this.testList.node);
        if (this.testList && this.testList.content) {
          this.sceneList = this.testList.content.getComponent(SceneList);
          this.sceneList.init(this);
        }
        "undefined" !== typeof cocosAnalytics && cocosAnalytics.isInited && cocosAnalytics.isInited() && cocosAnalytics.CAEvent.onEvent({
          eventName: "\u6253\u5f00\u8303\u4f8b"
        });
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
        var url = this.storage.getCurrentScene();
        url && this.loadScene(url);
      },
      _onSceneLaunched: function _onSceneLaunched() {
        var cameras = cc.Camera.cameras;
        for (var i = 0, l = cameras.length; i < l; i++) {
          var camera = cameras[i];
          camera === this.uiCamera ? camera.cullingMask = 1 << this.node.groupIndex : camera.cullingMask = camera.cullingMask & ~(1 << this.node.groupIndex);
        }
      },
      backToList: function backToList() {
        this.loadScene(MainScene);
      },
      loadScene: function loadScene(url) {
        if (this._isLoadingScene) return;
        var result = cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
        if (!result) {
          this.storage.setCurrentScene("");
          return;
        }
        this._isLoadingScene = true;
        this.showReadme(null, false);
        this.contentPos = this.testList.getContentPosition();
        this.currentSceneUrl = url;
        "undefined" !== typeof cocosAnalytics && cocosAnalytics.isInited && cocosAnalytics.isInited() && cocosAnalytics.CALevels.begin({
          level: url
        });
      },
      onLoadSceneFinish: function onLoadSceneFinish() {
        var url = this.currentSceneUrl;
        this.loadInstruction(url);
        this.storage.setCurrentScene(url);
        this.testList.node.active = false;
        var isMenu = url.endsWith(MainScene);
        this.btnBack.node.active = this.sceneTitle.node.active = !isMenu;
        this.testList.node.active = isMenu;
        isMenu ? this.contentPos && this.testList.setContentPosition(this.contentPos) : this.sceneTitle.string = url.replace("db://assets/cases/", "");
        this._isLoadingScene = false;
      },
      _getAdjacentScenes: function _getAdjacentScenes() {
        var _this = this;
        var res = {
          next: "",
          prev: ""
        };
        var sceneList = this.sceneList.sceneList;
        function findAvailableScene(startIndex, step) {
          for (var i = startIndex; 0 <= i && i < sceneList.length; i += step) {
            var url = sceneList[i].url;
            if (url) {
              var sceneName = cc.path.basename(url, ".fire");
              var available = TipsManager.hasSupport(sceneName, true);
              if (available) return url;
            }
          }
          return MainScene;
        }
        if (this.currentSceneUrl.endsWith(MainScene)) {
          res.next = findAvailableScene(0, 1);
          res.prev = findAvailableScene(sceneList.length - 1, -1);
        } else {
          var i = -1;
          sceneList.some(function(item, index) {
            if (item.url === _this.currentSceneUrl) {
              i = index;
              return true;
            }
            return false;
          });
          if (-1 !== i) {
            res.next = findAvailableScene(i + 1, 1);
            res.prev = findAvailableScene(i - 1, -1);
          }
        }
        return res;
      },
      nextScene: function nextScene() {
        var _getAdjacentScenes2 = this._getAdjacentScenes(), next = _getAdjacentScenes2.next;
        next && this.loadScene(next);
      },
      prevScene: function prevScene() {
        var _getAdjacentScenes3 = this._getAdjacentScenes(), prev = _getAdjacentScenes3.prev;
        prev && this.loadScene(prev);
      },
      loadInstruction: function loadInstruction(url) {
        var self = this;
        var urlArr = url.split("/");
        var fileName = urlArr[urlArr.length - 1].replace(".fire", "");
        cc.loader.loadRes("readme/" + fileName, cc.TextAsset, function(err, asset) {
          if (err) {
            self.text.string = i18n.t("scripts/Global/Menu.js.1");
            return;
          }
          self.text.string = asset.text;
        });
      },
      showReadme: function showReadme(event, active) {
        void 0 === active && (active = !this.readme.node.active);
        this.readme.node.active = active;
        active && this.readme.scrollToTop();
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.node.active) {
          this.showDebugDraw = enabledDebugDraw;
          cc.director.getCollisionManager().enabledDebugDraw = false;
        } else cc.director.getCollisionManager().enabledDebugDraw = this.showDebugDraw;
        var videoPlayer = cc.find("Canvas/VideoPlayer");
        videoPlayer && (videoPlayer.active = !this.readme.node.active);
      },
      restart: function restart() {
        cc.game.restart();
      },
      gc: function gc() {
        cc.sys.garbageCollect();
      }
    });
    cc._RF.pop();
  }, {
    SceneList: "SceneList",
    TipsManager: "TipsManager",
    i18n: "i18n"
  } ],
  MonsterPrefab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8cb4dm2QEpJ7pnaS/cjrvgF", "MonsterPrefab");
    "use strict";
    var Helpers = require("Helpers");
    cc.Class({
      extends: cc.Component,
      properties: {
        spriteList: {
          default: [],
          type: [ cc.SpriteFrame ]
        }
      },
      onLoad: function onLoad() {
        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
      }
    });
    cc._RF.pop();
  }, {
    Helpers: "Helpers"
  } ],
  Monster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e31b0+PoDRJXIDHFxy60vEs", "Monster");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        nickname: {
          default: null,
          type: cc.Label
        },
        lv: {
          default: null,
          type: cc.Label
        },
        hp: {
          default: null,
          type: cc.Label
        },
        atk: {
          default: null,
          type: cc.Label
        },
        defense: {
          default: null,
          type: cc.Label
        },
        image: {
          default: null,
          type: cc.Sprite
        }
      },
      initInfo: function initInfo(info) {
        this.nickname.string = info.name;
        this.lv.string = info.lv;
        this.hp.string = info.hp;
        this.atk.string = info.atk;
        this.defense.string = info.defense;
        var image = this.image;
        cc.loader.loadRes(info.imageUrl, cc.SpriteFrame, function(error, spriteFrame) {
          error || (image.spriteFrame = spriteFrame);
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  MotionStreakCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7722zlKP5HoKMY5VvWPCON", "MotionStreakCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        motionStreak: cc.MotionStreak,
        newTexture: {
          default: null,
          type: cc.Texture2D
        }
      },
      onLoad: function onLoad() {
        this._changed = true;
        this.oldTexture = this.motionStreak.texture;
      },
      onClick: function onClick() {
        this._changed ? this.setMotionStreak(2, 3, 20, this.newTexture) : this.setMotionStreak(.5, 1, 30, this.oldTexture);
        this._changed = !this._changed;
      },
      setMotionStreak: function setMotionStreak(fadeTime, minSeg, stroke, texture) {
        this.motionStreak.fadeTime = fadeTime;
        this.motionStreak.minSeg = minSeg;
        this.motionStreak.stroke = stroke;
        this.motionStreak.texture = texture;
      }
    });
    cc._RF.pop();
  }, {} ],
  MouseDragger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2412ev9NSRMeI28JHH2OS8r", "MouseDragger");
    "use strict";
    var TouchDragger = cc.Class({
      extends: cc.Component,
      properties: {
        propagate: {
          default: false
        }
      },
      onLoad: function onLoad() {
        this._down = false;
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function(event) {
          cc.log("Drag stated ...");
          this.node.opacity = 255;
          this._down = true;
          this.propagate || event.stopPropagation();
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, function(event) {
          if (!this._down) {
            event.stopPropagation();
            return;
          }
          this.node.opacity = 255;
          var delta = event.getDelta();
          this.node.x += delta.x;
          this.node.y += delta.y;
          this.propagate || event.stopPropagation();
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function(event) {
          if (!this._down) {
            event.stopPropagation();
            return;
          }
          this.node.opacity = 160;
          cc.log("Drag leave ...");
          this._down = false;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function(event) {
          if (!this._down) {
            event.stopPropagation();
            return;
          }
          cc.log("Drag done ...");
          this.node.opacity = 160;
          this._down = false;
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  MouseEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6df0ft1jy5Jg4cQ039jt8jC", "MouseEvent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      move: function move(event) {
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
      },
      onLoad: function onLoad() {
        this.scroll = 0;
        this.node.opacity = 50;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function() {
          this.node.opacity = 255;
          this.node.on(cc.Node.EventType.MOUSE_MOVE, this.move, this);
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function() {
          this.node.opacity = 160;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function() {
          this.node.opacity = 50;
          this.node.off(cc.Node.EventType.MOUSE_MOVE, this.move, this);
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function() {
          this.node.opacity = 50;
          this.node.off(cc.Node.EventType.MOUSE_MOVE, this.move, this);
          this._callback && this._callback();
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function(event) {
          this.scroll += event.getScrollY();
          var h = this.node.height;
          this.scroll = cc.misc.clampf(this.scroll, -2 * h, .7 * h);
          this.node.scale = 1 - this.scroll / h;
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  MoveAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ddd4eaLxVZFlZbzaPaqdL9D", "MoveAction");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        moveTo: cc.Node,
        moveBy: cc.Node
      },
      onLoad: function onLoad() {
        var moveTo = cc.moveTo(.5, cc.v2(0, 0));
        var moveBy = cc.moveBy(.5, cc.v2(100, 100));
        this.moveTo.runAction(moveTo);
        this.moveBy.runAction(moveBy);
      }
    });
    cc._RF.pop();
  }, {} ],
  MoveAnimationCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dc95dq3mVI658br0l2Zbi0", "MoveAnimationCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Animation
        },
        nodes: {
          default: [],
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.onRegisteredEvent();
      },
      onRegisteredEvent: function onRegisteredEvent() {
        for (var i = 0; i < this.nodes.length; ++i) this.nodes[i].on(cc.Node.EventType.TOUCH_END, this.onPlayAnimation.bind(this));
      },
      onPlayAnimation: function onPlayAnimation(event) {
        this.target.stop();
        switch (event.target._name) {
         case "Linear":
          this.target.play("linear");
          break;

         case "CaseIn_Expo":
          this.target.play("caseIn-expo");
          break;

         case "CaseOut_Expo":
          this.target.play("caseOut-expo");
          break;

         case "CaseInOut_Expo":
          this.target.play("caseInOut-expo");
          break;

         case "Back_Forward":
          this.target.play("back-forward");
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  MyCustomComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b8baEpLuxACIMNlIL2vw2W", "MyCustomComponent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        power: 10
      },
      getPower: function getPower() {
        return this.power;
      }
    });
    cc._RF.pop();
  }, {} ],
  NativeCallCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5245dIEBoFFB4RdXwoJQM2G", "NativeCallCtrl");
    "use strict";
    var tips = null;
    cc.TestNativeCallJS = function() {
      tips.string = "The test was successful...";
    };
    cc.Class({
      extends: cc.Component,
      properties: {
        button: cc.Node
      },
      start: function start() {
        var tipNode = cc.find("Canvas/New Label");
        tips = tipNode.getComponent(cc.Label);
        tips.string = "Native Call Test";
      },
      onClick: function onClick() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
          var className = "org/cocos2dx/javascript/AppActivity";
          var methodName = "showAlertDialog";
          var methodSignature = "(Ljava/lang/String;Ljava/lang/String;)V";
          jsb.reflection.callStaticMethod(className, methodName, methodSignature, "Title", "Native Call Test");
        } else cc.sys.os !== cc.sys.OS_IOS && cc.sys.os !== cc.sys.OS_OSX || jsb.reflection.callStaticMethod("AppController", "showAlertDialog:withMessage:", "Title", "Native Call Test");
      }
    });
    cc._RF.pop();
  }, {} ],
  NetworkCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10908h1aHRPPowxQQzUCVMD", "NetworkCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        xhr: cc.Label,
        xhrAB: cc.Label,
        xhrTimeout: cc.Label,
        websocket: cc.Label,
        socketIO: cc.Label,
        xhrResp: cc.Label,
        xhrABResp: cc.Label,
        xhrTimeoutResp: cc.Label,
        websocketResp: cc.Label,
        socketIOResp: cc.Label,
        wssCacert: {
          type: cc.Asset,
          default: null
        }
      },
      onLoad: function onLoad() {
        this._wsiSendBinary = null;
        this._xhrXHR = null;
        this._xhrHRAB = null;
        this._xhrXHRTimeout = null;
        this.xhrResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.1");
        this.xhrABResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.2");
        this.xhrTimeoutResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.2");
        this.websocketResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.3");
        this.socketIOResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.4");
        this.sendXHR();
        this.sendXHRAB();
        this.sendXHRTimeout();
        this.prepareWebSocket();
        this.sendSocketIO();
      },
      onDisable: function onDisable() {
        var wsiSendBinary = this._wsiSendBinary;
        if (wsiSendBinary) {
          wsiSendBinary.onopen = null;
          wsiSendBinary.onmessage = null;
          wsiSendBinary.onerror = null;
          wsiSendBinary.onclose = null;
        }
        this.rmXhrEventListener(this._xhrXHR);
        this.rmXhrEventListener(this._xhrHRAB);
        this.rmXhrEventListener(this._xhrXHRTimeout);
      },
      sendXHR: function sendXHR() {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, "GET");
        xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        cc.sys.isNative && xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        xhr.timeout = 1e4;
        xhr.send();
        this._xhrXHR = xhr;
      },
      sendXHRAB: function sendXHRAB() {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrAB, this.xhrABResp, "POST");
        xhr.open("POST", "https://httpbin.org/post");
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.send(new Uint8Array([ 1, 2, 3, 4, 5 ]));
        this._xhrHRAB = xhr;
      },
      sendXHRTimeout: function sendXHRTimeout() {
        var xhr = new XMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrTimeout, this.xhrTimeoutResp, "GET");
        xhr.open("GET", "https://192.168.22.222", true);
        xhr.timeout = 5e3;
        xhr.send();
        this._xhrXHRTimeout = xhr;
      },
      prepareWebSocket: function prepareWebSocket() {
        var self = this;
        var websocketLabel = this.websocket;
        var respLabel = this.websocketResp;
        this._wsiSendBinary = new WebSocket("wss://echo.websocket.org", [], this.wssCacert.nativeUrl);
        this._wsiSendBinary.binaryType = "arraybuffer";
        this._wsiSendBinary.onopen = function(evt) {
          websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.5");
        };
        this._wsiSendBinary.onmessage = function(evt) {
          var binary = new Uint16Array(evt.data);
          var binaryStr = "response bin msg: ";
          var str = "";
          for (var i = 0; i < binary.length; i++) if (0 === binary[i]) str += "'\\0'"; else {
            var hexChar = "0x" + binary[i].toString("16").toUpperCase();
            str += String.fromCharCode(hexChar);
          }
          binaryStr += str;
          respLabel.string = binaryStr;
          websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.6");
        };
        this._wsiSendBinary.onerror = function(evt) {
          websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.7");
        };
        this._wsiSendBinary.onclose = function(evt) {
          websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.8");
          self._wsiSendBinary = null;
        };
        this.scheduleOnce(this.sendWebSocketBinary, 1);
      },
      sendWebSocketBinary: function sendWebSocketBinary(sender) {
        if (!this._wsiSendBinary) return;
        if (this._wsiSendBinary.readyState === WebSocket.OPEN) {
          this.websocket.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.9");
          var buf = "Hello WebSocket\u4e2d\u6587,\0 I'm\0 a\0 binary\0 message\0.";
          var arrData = new Uint16Array(buf.length);
          for (var i = 0; i < buf.length; i++) arrData[i] = buf.charCodeAt(i);
          this._wsiSendBinary.send(arrData.buffer);
        } else {
          var warningStr = "send binary websocket instance wasn't ready...";
          this.websocket.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.10") + warningStr;
          this.scheduleOnce(function() {
            this.sendWebSocketBinary();
          }, 1);
        }
      },
      testevent: function testevent(data) {
        if (!this.socketIO) return;
        var msg = this.tag + " says 'testevent' with data: " + data;
        this.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.11") + msg;
      },
      message: function message(data) {
        if (!this.socketIO) return;
        var msg = this.tag + " received message: " + data;
        this.socketIOResp.string = msg;
      },
      disconnection: function disconnection() {
        if (!this.socketIO) return;
        var msg = this.tag + " disconnected!";
        this.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.12") + msg;
      },
      sendSocketIO: function sendSocketIO() {
        var self = this;
        if ("undefined" === typeof io) {
          cc.error("You should import the socket.io.js as a plugin!");
          return;
        }
        var sioclient = io.connect("ws://tools.itharbors.com:4000", {
          "force new connection": true
        });
        this._sioClient = sioclient;
        this.tag = sioclient.tag = "Test Client";
        sioclient.on("connect", function() {
          if (!self.socketIO) return;
          var msg = sioclient.tag + " Connected!";
          self.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.13") + msg;
          self._sioClient.send("Hello Socket.IO!");
        });
        sioclient.on("message", this.message.bind(this));
        sioclient.on("echotest", function(data) {
          if (!self.socketIO) return;
          cc.log("echotest 'on' callback fired!");
          var msg = self.tag + " says 'echotest' with data: " + data;
          self.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.14") + msg;
        });
        sioclient.on("testevent", this.testevent.bind(this));
        sioclient.on("disconnect", this.disconnection.bind(this));
      },
      streamXHREventsToLabel: function streamXHREventsToLabel(xhr, eventLabel, label, method, responseHandler) {
        var handler = responseHandler || function(response) {
          return method + " Response (30 chars): " + response.substring(0, 30) + "...";
        };
        var eventLabelOrigin = eventLabel.string;
        [ "loadstart", "abort", "error", "load", "loadend", "timeout" ].forEach(function(eventname) {
          xhr["on" + eventname] = function() {
            eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
            "timeout" === eventname && (label.string = "(timeout)");
          };
        });
        xhr.onreadystatechange = function() {
          4 === xhr.readyState && xhr.status >= 200 && (label.string = handler(xhr.responseText));
        };
      },
      rmXhrEventListener: function rmXhrEventListener(xhr) {
        if (!xhr) return;
        [ "loadstart", "abort", "error", "load", "loadend", "timeout" ].forEach(function(eventname) {
          xhr["on" + eventname] = null;
        });
        xhr.onreadystatechange = null;
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  NodeGenerator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2149G/5j1JIKd2GGzQfS72", "NodeGenerator");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        prefab: cc.Prefab,
        hint: cc.Label,
        regionOrigin: cc.Vec2,
        regionSize: cc.Size
      },
      onLoad: function onLoad() {
        this.schedule(this.generateNode, 2);
        this._pool = new cc.NodePool("PoolHandler");
        this._count = 0;
      },
      generateNode: function generateNode() {
        var monster = this._pool.get();
        if (!monster) {
          monster = cc.instantiate(this.prefab);
          this._count++;
          this.hint.string = "Node Created: " + this._count;
          monster.addComponent("PoolHandler");
        }
        monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
        monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
        var angle = Math.random() * Math.PI * 2;
        var dx = 500 * Math.cos(angle);
        var dy = 500 * Math.sin(angle);
        monster.runAction(cc.sequence(cc.moveBy(5, dx, dy), cc.callFunc(this.removeNode, this, monster)));
        this.node.addChild(monster);
      },
      removeNode: function removeNode(sender, monster) {
        this._pool.put(monster);
      }
    });
    cc._RF.pop();
  }, {} ],
  NodeGroupControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd4a2+britAlof0UdMCVB8c", "NodeGroupControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        nodeList: {
          default: [],
          type: [ cc.Node ]
        }
      },
      onLoad: function onLoad() {
        var self = this;
        this.inervalId = setInterval(function() {
          self.toggleNodesVisibility();
        }, 1e3);
      },
      onDestroy: function onDestroy() {
        clearInterval(this.inervalId);
      },
      toggleNodesVisibility: function toggleNodesVisibility() {
        console.log("toggle visibility");
        for (var i = 0; i < this.nodeList.length; ++i) this.nodeList[i].active = !this.nodeList[i].active;
      }
    });
    cc._RF.pop();
  }, {} ],
  NonSerializedProperties: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4114PgybhJ3L/k0N9TkCZI", "NonSerializedProperties");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        mySerializedText: "",
        myNonSerializedText: {
          default: "",
          visible: false
        },
        label1: {
          default: null,
          type: cc.Label
        },
        label2: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.myNonSerializedText = "Can only set value in script";
        this.label1.string = this.mySerializedText;
        this.label2.string = this.myNonSerializedText;
      }
    });
    cc._RF.pop();
  }, {} ],
  OnMultiTouchCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "53fc1wMwRRPOYCB8ko36drD", "OnMultiTouchCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        canvas: cc.Node,
        target: cc.Node
      },
      onLoad: function onLoad() {
        var self = this, parent = this.node.parent;
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          var touches = event.getTouches();
          if (touches.length >= 2) {
            var touch1 = touches[0], touch2 = touches[1];
            var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
            var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
            var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
            var distance = touchPoint1.sub(touchPoint2);
            var delta = delta1.sub(delta2);
            var scale = 1;
            scale = Math.abs(distance.x) > Math.abs(distance.y) ? (distance.x + delta.x) / distance.x * self.target.scale : (distance.y + delta.y) / distance.y * self.target.scale;
            self.target.scale = scale < .1 ? .1 : scale;
          }
        }, self.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  OnTouchCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9b352jbGtMIqjEuud60Wpx", "OnTouchCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        canvas: cc.Node,
        touchLocationDisplay: {
          default: null,
          type: cc.Label
        },
        follower: {
          default: null,
          type: cc.Node
        },
        followSpeed: 200
      },
      onLoad: function onLoad() {
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = false;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function(event) {
          var touches = event.getTouches();
          var touchLoc = touches[0].getLocation();
          self.isMoving = true;
          self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
          self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ", " + Math.floor(touchLoc.y) + ")";
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          var touches = event.getTouches();
          var touchLoc = touches[0].getLocation();
          self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
          self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ", " + Math.floor(touchLoc.y) + ")";
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function(event) {
          self.isMoving = false;
        }, self.node);
      },
      update: function update(dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        var direction = this.moveToPos.sub(oldPos).normalize();
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        this.follower.setPosition(newPos);
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  OrderSwitcher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "385fbE9eghB1IwH34WHGHmk", "OrderSwitcher");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        container: cc.Node
      },
      switch: function _switch() {
        var children = this.container.children;
        var length = children.length;
        if (length > 1) {
          var src = Math.floor(Math.random() * length);
          var node = children[src];
          var dst = src === length - 1 ? 0 : src + 1;
          node.setSiblingIndex(dst);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  PageViewCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "becf9ZpBi5KG43ard9opUPT", "PageViewCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        curNum: 3,
        curTotal: 10,
        pageTeample: cc.Prefab,
        target: cc.PageView,
        label: cc.Label
      },
      _createPage: function _createPage() {
        var page = cc.instantiate(this.pageTeample);
        page.position = new cc.v2(0, 0);
        var color = new cc.Color();
        color.r = Math.floor(255 * Math.random());
        color.g = Math.floor(255 * Math.random());
        color.b = Math.floor(255 * Math.random());
        page.color = color;
        return page;
      },
      onLoad: function onLoad() {
        this.target.setCurrentPageIndex(0);
      },
      update: function update() {
        this.label.string = "\u7b2c" + (this.target.getCurrentPageIndex() + 1) + "\u9875";
      },
      onJumpHome: function onJumpHome() {
        this.target.scrollToPage(0);
      },
      plusPage: function plusPage(callback) {
        if (this.curNum > this.curTotal) return;
        this.curNum++;
        callback && callback();
      },
      lessPageNum: function lessPageNum(callback) {
        if (this.curNum <= 0) return;
        this.curNum--;
        callback && callback();
      },
      onAddPage: function onAddPage() {
        var _this = this;
        this.plusPage(function() {
          _this.target.addPage(_this._createPage());
        });
      },
      onInsertPage: function onInsertPage() {
        var _this2 = this;
        this.plusPage(function() {
          _this2.target.insertPage(_this2._createPage(), _this2.target.getCurrentPageIndex());
        });
      },
      onRemovePage: function onRemovePage() {
        var _this3 = this;
        this.lessPageNum(function() {
          var pages = _this3.target.getPages();
          _this3.target.removePage(pages[pages.length - 1]);
        });
      },
      onRemovePageAtIndex: function onRemovePageAtIndex() {
        var _this4 = this;
        this.lessPageNum(function() {
          _this4.target.removePageAtIndex(_this4.target.getCurrentPageIndex());
        });
      },
      onRemoveAllPage: function onRemoveAllPage() {
        this.target.removeAllPages();
        this.curNum = 0;
      },
      onPageEvent: function onPageEvent(sender, eventType) {
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) return;
        console.log("\u5f53\u524d\u6240\u5728\u7684\u9875\u9762\u7d22\u5f15:" + sender.getCurrentPageIndex());
      }
    });
    cc._RF.pop();
  }, {} ],
  ParticleControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79ae3hiP+JAhIKehaWyiKuh", "ParticleControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        particle: cc.Node
      },
      toggleParticlePlay: function toggleParticlePlay() {
        var myParticle = this.particle.getComponent(cc.ParticleSystem);
        myParticle.particleCount > 0 ? myParticle.stopSystem() : myParticle.resetSystem();
      }
    });
    cc._RF.pop();
  }, {} ],
  PlatformMotion: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f761EZmKhNLKJpUXTrb4fF", "PlatformMotion");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 10,
        distance: 200
      },
      onLoad: function onLoad() {
        this._movedDistance = this.distance / 2;
        this._direction = 1;
        this._movedDiff = 0;
      },
      update: function update(dt) {
        var d = this.speed * this._direction * dt;
        this._movedDistance += Math.abs(d);
        if (this._movedDistance > this.distance) {
          d = this.distance - this._movedDistance;
          this._movedDistance = 0;
          this._direction *= -1;
        }
        this.node.x += d;
        this._movedDiff = d;
      }
    });
    cc._RF.pop();
  }, {} ],
  PoolHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea9ac+t92JFY6hOUuiIHUAT", "PoolHandler");
    "use strict";
    var lastClick = 0;
    function pauseresume() {
      var now = Date.now();
      if (now - lastClick < 300) {
        this.stopAllActions();
        var pool = this.getComponent("PoolHandler")._pool;
        pool ? pool.put(this) : this.removeFromParent(true);
      } else {
        this.paused ? cc.director.getActionManager().resumeTarget(this) : cc.director.getActionManager().pauseTarget(this);
        this.paused = !this.paused;
      }
      lastClick = now;
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        _pool: null
      },
      onLoad: function onLoad() {
        this.reuse();
      },
      unuse: function unuse() {
        this.node.off(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
      },
      reuse: function reuse() {
        this.node.paused = false;
        this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  PopulatePrefab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75518I0ImJHXqWNNGRIOmJg", "PopulatePrefab");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        root: {
          default: null,
          type: cc.Node
        },
        prefab: {
          default: null,
          type: cc.Prefab
        },
        canvas: {
          default: null,
          type: cc.Canvas
        },
        numberToSpawn: 0,
        spawnInterval: 0
      },
      addSpawn: function addSpawn() {
        if (this.spawnCount >= this.numberToSpawn) {
          this.clearRepeater();
          return;
        }
        var monster = cc.instantiate(this.prefab);
        monster.parent = this.root;
        monster.position = this.getRandomPosition();
        this.spawnCount++;
      },
      onLoad: function onLoad() {
        var self = this;
        self.randomRange = cc.v2(300, 200);
        self.spawnCount = 0;
        self.schedule(self.addSpawn, self.spawnInterval);
      },
      getRandomPosition: function getRandomPosition() {
        return cc.v2(2 * (Math.random() - .5) * this.randomRange.x, 2 * (Math.random() - .5) * this.randomRange.y);
      },
      clearRepeater: function clearRepeater() {
        this.unschedule(this.addSpawn);
      }
    });
    cc._RF.pop();
  }, {} ],
  ProgressBarCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84a43yb9OxBX6HMQxPzHQyz", "ProgressBarCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 10,
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
        }
      },
      onLoad: function onLoad() {
        this._pingpong = true;
        this.verticalBar.progress = 0;
        this.horizontalBar.progress = 0;
        this.verticalBarReverse.progress = 0;
        this.horizontalBarReverse.progress = 0;
      },
      update: function update(dt) {
        this._updateProgressBar(this.verticalBar, dt);
        this._updateProgressBar(this.horizontalBar, dt);
        this._updateProgressBar(this.verticalBarReverse, dt);
        this._updateProgressBar(this.horizontalBarReverse, dt);
      },
      _updateProgressBar: function _updateProgressBar(progressBar, dt) {
        var progress = progressBar.progress;
        if (progress < 1 && this._pingpong) progress += dt * this.speed; else {
          progress -= dt * this.speed;
          this._pingpong = progress <= 0;
        }
        progressBar.progress = progress;
      }
    });
    cc._RF.pop();
  }, {} ],
  Puzzle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6289cZl6zJEcLVQd60JnAzW", "Puzzle");
    "use strict";
    var MoveDirection = cc.Enum({
      NONE: 0,
      UP: 1,
      DOWN: 2,
      LEFT: 3,
      RIGHT: 4
    });
    var minTilesCount = 2;
    var mapMoveStep = 1;
    var minMoveValue = 50;
    cc.Class({
      extends: cc.Component,
      editor: {
        requireComponent: cc.TiledMap
      },
      properties: {
        _touchStartPos: {
          default: null,
          serializable: false
        },
        _touching: {
          default: false,
          serializable: false
        },
        _isMapLoaded: {
          default: false,
          serializable: false
        },
        floorLayerName: {
          default: "floor"
        },
        barrierLayerName: {
          default: "barrier"
        },
        objectGroupName: {
          default: "players"
        },
        startObjectName: {
          default: "SpawnPoint"
        },
        successObjectName: {
          default: "SuccessPoint"
        }
      },
      onLoad: function onLoad() {
        var _this = this;
        this._player = this.node.getChildByName("player");
        this._isMapLoaded || (this._player.active = false);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          _this._touching = true;
          _this._touchStartPos = event.touch.getLocation();
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
          if (!_this._touching || !_this._isMapLoaded || _this._succeedLayer.active) return;
          _this._touching = false;
          var touchPos = event.touch.getLocation();
          var movedX = touchPos.x - _this._touchStartPos.x;
          var movedY = touchPos.y - _this._touchStartPos.y;
          var movedXValue = Math.abs(movedX);
          var movedYValue = Math.abs(movedY);
          if (movedXValue < minMoveValue && movedYValue < minMoveValue) return;
          var newTile = cc.v2(_this._curTile.x, _this._curTile.y);
          var mapMoveDir = MoveDirection.NONE;
          if (movedXValue >= movedYValue) if (movedX > 0) {
            newTile.x += 1;
            mapMoveDir = MoveDirection.LEFT;
          } else {
            newTile.x -= 1;
            mapMoveDir = MoveDirection.RIGHT;
          } else if (movedY > 0) {
            newTile.y -= 1;
            mapMoveDir = MoveDirection.DOWN;
          } else {
            newTile.y += 1;
            mapMoveDir = MoveDirection.UP;
          }
          _this._tryMoveToNewTile(newTile, mapMoveDir);
        });
      },
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
      },
      restartGame: function restartGame() {
        this._succeedLayer.active = false;
        this._initMapPos();
        this._curTile = this._startTile;
        this._updatePlayerPos();
      },
      start: function start(err) {
        if (err) return;
        this._initMapPos();
        this._succeedLayer = this.node.getParent().getChildByName("succeedLayer");
        this._succeedLayer.active = false;
        this._tiledMap = this.node.getComponent("cc.TiledMap");
        var objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);
        if (!objectGroup) return;
        var startObj = objectGroup.getObject(this.startObjectName);
        var endObj = objectGroup.getObject(this.successObjectName);
        if (!startObj || !endObj) return;
        var startPos = cc.v2(startObj.x, startObj.y);
        var endPos = cc.v2(endObj.x, endObj.y);
        this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
        this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
        if (!this._layerFloor || !this._layerBarrier) return;
        this._curTile = this._startTile = this._getTilePos(startPos);
        this._endTile = this._getTilePos(endPos);
        if (this._player) {
          this._updatePlayerPos();
          this._player.active = true;
        }
        this._isMapLoaded = true;
      },
      _initMapPos: function _initMapPos() {
        this.node.setPosition(cc.visibleRect.bottomLeft);
      },
      _updatePlayerPos: function _updatePlayerPos() {
        var pos = this._layerFloor.getPositionAt(this._curTile);
        this._player.setPosition(pos);
      },
      _getTilePos: function _getTilePos(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this._tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.v2(x, y);
      },
      _onKeyPressed: function _onKeyPressed(event) {
        if (!this._isMapLoaded || this._succeedLayer.active) return;
        var newTile = cc.v2(this._curTile.x, this._curTile.y);
        var mapMoveDir = MoveDirection.NONE;
        switch (event.keyCode) {
         case cc.macro.KEY.up:
          newTile.y -= 1;
          mapMoveDir = MoveDirection.DOWN;
          break;

         case cc.macro.KEY.down:
          newTile.y += 1;
          mapMoveDir = MoveDirection.UP;
          break;

         case cc.macro.KEY.left:
          newTile.x -= 1;
          mapMoveDir = MoveDirection.RIGHT;
          break;

         case cc.macro.KEY.right:
          newTile.x += 1;
          mapMoveDir = MoveDirection.LEFT;
          break;

         default:
          return;
        }
        this._tryMoveToNewTile(newTile, mapMoveDir);
      },
      _tryMoveToNewTile: function _tryMoveToNewTile(newTile, mapMoveDir) {
        var mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;
        if (this._layerBarrier.getTileGIDAt(newTile)) {
          cc.log("This way is blocked!");
          return false;
        }
        this._curTile = newTile;
        this._updatePlayerPos();
        this._tryMoveMap(mapMoveDir);
        if (this._curTile.equals(this._endTile)) {
          cc.log("succeed");
          this._succeedLayer.active = true;
        }
      },
      _tryMoveMap: function _tryMoveMap(moveDir) {
        var mapContentSize = this.node.getContentSize();
        var mapPos = this.node.getPosition();
        var playerPos = this._player.getPosition();
        var viewSize = cc.size(cc.visibleRect.width, cc.visibleRect.height);
        var tileSize = this._tiledMap.getTileSize();
        var minDisX = minTilesCount * tileSize.width;
        var minDisY = minTilesCount * tileSize.height;
        var disX = playerPos.x + mapPos.x;
        var disY = playerPos.y + mapPos.y;
        var newPos;
        switch (moveDir) {
         case MoveDirection.UP:
          disY < minDisY && (newPos = cc.v2(mapPos.x, mapPos.y + tileSize.height * mapMoveStep));
          break;

         case MoveDirection.DOWN:
          viewSize.height - disY - tileSize.height < minDisY && (newPos = cc.v2(mapPos.x, mapPos.y - tileSize.height * mapMoveStep));
          break;

         case MoveDirection.LEFT:
          viewSize.width - disX - tileSize.width < minDisX && (newPos = cc.v2(mapPos.x - tileSize.width * mapMoveStep, mapPos.y));
          break;

         case MoveDirection.RIGHT:
          disX < minDisX && (newPos = cc.v2(mapPos.x + tileSize.width * mapMoveStep, mapPos.y));
          break;

         default:
          return;
        }
        if (newPos) {
          var minX = viewSize.width - mapContentSize.width - cc.visibleRect.left;
          var maxX = cc.visibleRect.left.x;
          var minY = viewSize.height - mapContentSize.height - cc.visibleRect.bottom;
          var maxY = cc.visibleRect.bottom.y;
          newPos.x < minX && (newPos.x = minX);
          newPos.x > maxX && (newPos.x = maxX);
          newPos.y < minY && (newPos.y = minY);
          newPos.y > maxY && (newPos.y = maxY);
          if (!newPos.equals(mapPos)) {
            cc.log("Move the map to new position: ", newPos);
            this.node.setPosition(newPos);
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  ReferenceTypeProperties: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9341f3fDdBMjJLKh4D+kJJK", "ReferenceTypeProperties");
    "use strict";
    var MyCustomComponent = require("MyCustomComponent");
    cc.Class({
      extends: cc.Component,
      properties: {
        myNode: {
          default: null,
          type: cc.Node
        },
        mySprite: {
          default: null,
          type: cc.Sprite
        },
        myLabel: {
          default: null,
          type: cc.Label
        },
        myComponent: {
          default: null,
          type: MyCustomComponent
        },
        mySpriteFrame: {
          default: null,
          type: cc.SpriteFrame
        },
        myAtlas: {
          default: null,
          type: cc.SpriteAtlas
        },
        myPrefab: {
          default: null,
          type: cc.Prefab
        },
        myAudioClip: {
          default: null,
          type: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.myLabel.string = this.myComponent.getPower().toString();
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    MyCustomComponent: "MyCustomComponent"
  } ],
  RepeatAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "66d74aG3cdDq4lLyUUjOCk/", "RepeatAction");
    "use strict";
    var MAX_VALUE = 5;
    var TIPS_STR = "repeat count: " + MAX_VALUE + " / value";
    cc.Class({
      extends: cc.Component,
      properties: {
        tips: cc.Label
      },
      onLoad: function onLoad() {
        var _this = this;
        this.setTips(0);
        var count = 0;
        var action1 = cc.delayTime(1);
        var action2 = cc.callFunc(function() {
          count++;
          _this.setTips(count);
        }, this);
        this.node.runAction(cc.repeat(cc.sequence(action1, action2), 5));
      },
      setTips: function setTips(count) {
        this.tips.string = TIPS_STR.replace(/value/, count);
      }
    });
    cc._RF.pop();
  }, {} ],
  RichTextEvents: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0c7fwrZUpN7JS8x9rEtSfl", "RichTextEvents");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        logMessage: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {},
      clickme: function clickme(event) {
        var clickPosition = event.touch.getLocation();
        this.logMessage.string = "Clicked at: " + parseFloat(clickPosition.x.toFixed()) + ", y = " + parseFloat(clickPosition.y.toFixed(2));
      }
    });
    cc._RF.pop();
  }, {} ],
  RotationCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "325ba8DYO5K6Yfgi5UmP4+L", "RotationCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        rotationToNode: cc.Node,
        rotateByNode: cc.Node
      },
      onToClick: function onToClick() {
        var rotationTo = cc.rotateTo(1, 90);
        this.rotationToNode.runAction(rotationTo);
      },
      onReverseToClick: function onReverseToClick() {
        var rotationTo = cc.rotateTo(1, 180);
        this.rotationToNode.runAction(rotationTo);
      },
      onToRecoverClick: function onToRecoverClick() {
        this.rotationToNode.angle = 0;
      },
      onByClick: function onByClick() {
        var rotateBy = cc.rotateBy(1, 90);
        this.rotateByNode.runAction(rotateBy);
      },
      onReverseByClick: function onReverseByClick() {
        var rotateBy = cc.rotateBy(1, 180);
        this.rotateByNode.runAction(rotateBy);
      },
      onByRecoverClick: function onByRecoverClick() {
        this.rotateByNode.angle = 0;
      }
    });
    cc._RF.pop();
  }, {} ],
  RuntimeLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5530cLc2wJFVpWkBxALC33G", "RuntimeLabel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var isRuntime = "undefined" !== typeof runtime;
        isRuntime || (this.node.active = false);
      }
    });
    cc._RF.pop();
  }, {} ],
  SafeAreaCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fefb3kgNq9MhpUV3012X6AE", "SafeAreaCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tip: cc.Label,
        graphics: cc.Graphics,
        _rightMenu: cc.Node,
        _rect: cc.Rect
      },
      start: function start() {
        if (cc.sys.os !== cc.sys.OS_IOS) return;
        this._rect = cc.sys.getSafeAreaRect();
        var canvasSize = cc.view.getVisibleSize();
        this.graphics.rect(-canvasSize.width / 2 + this._rect.x, -canvasSize.height / 2 + this._rect.y, this._rect.width, this._rect.height);
        this.graphics.fillColor = new cc.color(241, 148, 138, 66);
        this.graphics.fill();
        this.graphics.stroke();
        this.tip.string = this._rect;
        this._rightMenu = cc.find("Menu/Right Menu");
        this._rightMenu.x -= this._rect.x;
      },
      onDisable: function onDisable() {
        this._rightMenu && (this._rightMenu.x += this._rect.x);
      }
    });
    cc._RF.pop();
  }, {} ],
  SceneList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "473b8wxs55OsJvoxVdYCzTF", "SceneList");
    "use strict";
    var TipsManager = require("TipsManager");
    var SceneList = cc.Class({
      extends: cc.Component,
      properties: {
        itemPrefab: {
          default: null,
          type: cc.Prefab
        },
        initItemCount: 0,
        scrollView: cc.ScrollView,
        bufferZone: 0,
        searchBlock: cc.Node
      },
      createItem: function createItem(x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent("ListItem");
        var label = itemComp.label;
        label.string = name;
        url && (itemComp.url = url);
        item.x = x;
        item.y = y;
        this.node.addChild(item);
        return item;
      },
      init: function init(menu) {
        this.menu = menu;
        this.sceneList = [];
        this.itemList = [];
        this.updateTimer = 0;
        this.updateInterval = .2;
        this.lastContentPosY = 0;
        TipsManager.init();
        this.initList();
      },
      initList: function initList() {
        var scenes = cc.game._sceneInfos;
        var dict = {};
        if (scenes) for (var i = 0; i < scenes.length; ++i) {
          var url = scenes[i].url;
          if (!url.startsWith("db://assets/cases/")) continue;
          var dirname = cc.path.dirname(url).replace("db://assets/cases/", "");
          var scenename = cc.path.basename(url, ".fire");
          dirname || (dirname = "_root");
          dict[dirname] || (dict[dirname] = {});
          dict[dirname][scenename] = url;
        } else cc.error("failed to get scene list!");
        var dirs = Object.keys(dict);
        dirs.sort();
        for (var _i = 0; _i < dirs.length; ++_i) {
          this.sceneList.push({
            name: dirs[_i],
            url: null
          });
          var scenenames = Object.keys(dict[dirs[_i]]);
          scenenames.sort();
          for (var j = 0; j < scenenames.length; ++j) {
            var name = scenenames[j];
            var _url = dict[dirs[_i]][name];
            this.sceneList.push({
              name: name,
              url: _url
            });
          }
        }
        var y = 0;
        this.node.height = 50 * (this.sceneList.length + 1);
        var initItemCount = Math.min(this.initItemCount, this.sceneList.length);
        for (var _i2 = 0; _i2 < initItemCount; ++_i2) {
          var item = cc.instantiate(this.itemPrefab).getComponent("ListItem");
          var itemInfo = this.sceneList[_i2];
          item.init(this.menu);
          this.node.addChild(item.node);
          y -= 50;
          item.updateItem(_i2, y, itemInfo.name, itemInfo.url);
          this.itemList.push(item);
        }
        var searchComp = this.searchBlock.getComponent("SearchBlock");
        searchComp.init(this.menu);
        searchComp.setItemList(this.sceneList);
      },
      getPositionInView: function getPositionInView(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      },
      update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        var items = this.itemList;
        var buffer = this.bufferZone;
        var isDown = this.node.y < this.lastContentPosY;
        var curItemCount = this.itemList.length;
        var offset = 50 * curItemCount;
        for (var i = 0; i < curItemCount; ++i) {
          var item = items[i];
          var itemNode = item.node;
          var viewPos = this.getPositionInView(itemNode);
          if (isDown) {
            if (viewPos.y < -buffer && itemNode.y + offset < 0) {
              var newIdx = item.index - curItemCount;
              var newInfo = this.sceneList[newIdx];
              item.updateItem(newIdx, itemNode.y + offset, newInfo.name, newInfo.url);
            }
          } else if (viewPos.y > buffer && itemNode.y - offset > -this.node.height) {
            var _newIdx = item.index + curItemCount;
            var _newInfo = this.sceneList[_newIdx];
            item.updateItem(_newIdx, itemNode.y - offset, _newInfo.name, _newInfo.url);
          }
        }
        this.lastContentPosY = this.node.y;
      }
    });
    cc._RF.pop();
  }, {
    TipsManager: "TipsManager"
  } ],
  SearchBlock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5fac7sHbOhNlpzkn8js40Bz", "SearchBlock");
    "use strict";
    var TipsManager = require("TipsManager");
    cc.Class({
      extends: cc.Component,
      properties: {
        editBox: cc.EditBox,
        _itemList: [],
        _isShow: false
      },
      init: function init(menu) {
        this.menu = menu;
      },
      setItemList: function setItemList(list) {
        this._itemList = list;
      },
      loadExample: function loadExample() {
        var sceneName = this.editBox.string;
        var url = this.findItemUrl(sceneName);
        if (!url) {
          TipsManager.createTips("Doesn't find that scene.");
          return;
        }
        if (TipsManager.hasSupport(sceneName)) {
          this.showSearchBlock();
          this.editBox.string = "";
          this.menu.loadScene(url);
        }
      },
      findItemUrl: function findItemUrl(sceneName) {
        for (var i = 0; i < this._itemList.length; i++) {
          var item = this._itemList[i];
          if (item.name === sceneName) return item.url;
        }
      },
      showSearchBlock: function showSearchBlock() {
        this._isShow = !this._isShow;
        var action = null;
        action = this._isShow ? cc.moveBy(.5, cc.v2(0, -48)) : cc.moveBy(.5, cc.v2(0, 48));
        this.node.runAction(action);
      }
    });
    cc._RF.pop();
  }, {
    TipsManager: "TipsManager"
  } ],
  SequenceAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f1d440juJBgqdwVALTCD4k", "SequenceAction");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        }
      },
      start: function start() {
        var _this = this;
        var startTime = 0;
        var eachTime = .5;
        var sequence1 = cc.sequence(cc.moveBy(eachTime, cc.v2(0, -300)), cc.moveBy(eachTime / 2, cc.v2(0, 300))).repeat(2);
        var sequence2 = cc.sequence(cc.moveBy(eachTime, cc.v2(0, -200)), cc.moveBy(eachTime, cc.v2(0, 200))).repeat(2);
        this.node.runAction(cc.sequence(cc.callFunc(function() {
          startTime = Date.now();
        }), sequence1, sequence2, cc.callFunc(function() {
          var difference = Math.abs(Date.now() - startTime) / 1e3;
          if (difference - 7 * eachTime >= .05) {
            _this.label.string = "Failed - ElapseTime: " + difference.toFixed(1);
            _this.label.node.color = cc.color(255, 0, 0);
          } else {
            _this.label.string = "Succeed - ElapseTime: " + difference.toFixed(1);
            _this.label.node.color = cc.color(0, 255, 0);
          }
        })));
      }
    });
    cc._RF.pop();
  }, {} ],
  SheepAnimationCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae6fcR8cuFGRYHW525VJD/k", "SheepAnimationCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sheepAnim: {
          default: null,
          type: cc.Animation
        }
      },
      onLoad: function onLoad() {
        var anim = this.sheepAnim;
        this._playAnimCallback = function() {
          anim.play("sheep_jump");
        };
        this.scheduleOnce(this._playAnimCallback, 2);
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  Shooter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "092a3wYF7pBULdP9SLwGUBQ", "Shooter");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bullet: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        var canvas = cc.find("Canvas");
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
      },
      onTouchBegan: function onTouchBegan(event) {
        var scene = cc.director.getScene();
        var touchLoc = event.touch.getLocation();
        var bullet = cc.instantiate(this.bullet);
        bullet.position = touchLoc;
        bullet.active = true;
        scene.addChild(bullet);
      },
      onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  ShowCollider: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a6dfRzhTBMp5U3il8DJmBZ", "ShowCollider");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {},
      onBtnClick: function onBtnClick(event) {
        var target = event.target;
        var shapeClassName = "cc." + target.name + "Collider";
        var nodePath = "Canvas/root/" + target.parent.name;
        var collider = cc.find(nodePath).getComponent(shapeClassName);
        collider.enabled = !collider.enabled;
        var label = target.getChildByName("Label").getComponent(cc.Label);
        collider.enabled ? label.string = label.string.replace("Show", "Hide") : label.string = label.string.replace("Hide", "Show");
      }
    });
    cc._RF.pop();
  }, {} ],
  ShowSubMenu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19224TiKDhPbZ8/hTkQA7ey", "ShowSubMenu");
    "use strict";
    cc.Class({
      extends: cc.Component,
      toggle: function toggle() {
        var shown = this.node.y < 0;
        var animation = this.getComponent(cc.Animation);
        animation.play(shown ? "hide menu" : "show menu");
      }
    });
    cc._RF.pop();
  }, {} ],
  SimpleAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6067a1+J5FW4G30nmVLU/d", "SimpleAction");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        jumper: {
          default: null,
          type: cc.Node
        },
        colorNode: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.squashAction = cc.scaleTo(.2, 1, .6);
        this.stretchAction = cc.scaleTo(.2, 1, 1.2);
        this.scaleBackAction = cc.scaleTo(.1, 1, 1);
        this.moveUpAction = cc.moveBy(1, cc.v2(0, 200)).easing(cc.easeCubicActionOut());
        this.moveDownAction = cc.moveBy(1, cc.v2(0, -200)).easing(cc.easeCubicActionIn());
        var seq = cc.sequence(this.squashAction, this.stretchAction, this.moveUpAction, this.scaleBackAction, this.moveDownAction, this.squashAction, this.scaleBackAction, cc.callFunc(this.callback.bind(this)));
        this.jumper.runAction(seq);
        this.colorNode.runAction(cc.sequence(cc.tintTo(2, 255, 0, 0), cc.delayTime(.5), cc.fadeOut(1), cc.delayTime(.5), cc.fadeIn(1), cc.delayTime(.5), cc.tintTo(2, 255, 255, 255)).repeat(2));
      },
      callback: function callback() {
        this.node.removeFromParent();
      }
    });
    cc._RF.pop();
  }, {} ],
  SimpleButtonCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68675KwfElAdaumPl1byNh7", "SimpleButtonCtrl");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        buttonLeft: cc.Button,
        buttonRight: cc.Button,
        display: cc.Label
      },
      onBtnLeftClicked: function onBtnLeftClicked() {
        console.log("Left button clicked!");
        this.display.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.1");
      },
      onBtnRightClicked: function onBtnRightClicked() {
        console.log("Right button clicked!");
        this.display.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.2");
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  SimpleKeyboardMovement: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3f971iyCdIh6xdaO49XP0F", "SimpleKeyboardMovement");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sheep: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.turnRight();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      onKeyDown: function onKeyDown(event) {
        var macro = cc.macro;
        switch (event.keyCode) {
         case macro.KEY.a:
         case macro.KEY.left:
          console.log("turn left");
          this.turnLeft();
          break;

         case macro.KEY.d:
         case macro.KEY.right:
          console.log("turn right");
          this.turnRight();
        }
      },
      update: function update(dt) {
        this.sheep.x += this.speed * dt;
      },
      turnLeft: function turnLeft() {
        this.speed = -100;
        this.sheep.scaleX = 1;
      },
      turnRight: function turnRight() {
        this.speed = 100;
        this.sheep.scaleX = -1;
      }
    });
    cc._RF.pop();
  }, {} ],
  SimpleMotion: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fde33rWt81MvZWO7QQ3jv3j", "SimpleMotion");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        moveSpeed: 100,
        rotationSpeed: 90
      },
      onLoad: function onLoad() {},
      update: function update(dt) {
        this.node.x += dt * this.moveSpeed;
        this.node.angle += dt * this.rotationSpeed;
      }
    });
    cc._RF.pop();
  }, {} ],
  SingletonCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fcfefvjPgdGEKnfOwuoIVJD", "SingletonCtrl");
    "use strict";
    var Singleton = require("Singleton");
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        var node = new cc.Node("Monster");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = Singleton.instance.monsterIcon;
        node.parent = this.node;
      }
    });
    cc._RF.pop();
  }, {
    Singleton: "Singleton"
  } ],
  Singleton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "379d2K4GUtCv7pB9+wuz4Lb", "Singleton");
    "use strict";
    var Singleton = cc.Class({
      extends: cc.Component,
      properties: {
        monsterIcon: {
          default: null,
          type: cc.SpriteFrame
        }
      },
      statics: {
        instance: null
      },
      onLoad: function onLoad() {
        Singleton.instance = this;
      }
    });
    cc._RF.pop();
  }, {} ],
  SliderCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "051d5Epx65ARZ9itjsuO9NL", "SliderCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        image: cc.Node,
        music: cc.AudioSource,
        slider_h: cc.Slider,
        slider_v: cc.Slider
      },
      onLoad: function onLoad() {
        this.slider_v.progress = .5;
        this.slider_h.progress = .5;
        this._updateImageOpacity(this.slider_v.progress);
        this._updateMusicVolume(this.slider_h.progress);
      },
      _updateImageOpacity: function _updateImageOpacity(progress) {
        this.image.opacity = 255 * progress;
      },
      _updateMusicVolume: function _updateMusicVolume(progress) {
        this.music.volume = progress;
      },
      onSliderVEvent: function onSliderVEvent(sender, eventType) {
        this._updateImageOpacity(sender.progress);
      },
      onSliderHEvent: function onSliderHEvent(sender, eventType) {
        this._updateMusicVolume(sender.progress);
      }
    });
    cc._RF.pop();
  }, {} ],
  SpineCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "91115OWZ9hJkIXaqCNRUsZC", "SpineCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        requireComponent: sp.Skeleton
      },
      properties: {
        mixTime: .2
      },
      onLoad: function onLoad() {
        var _this = this;
        var spine = this.spine = this.getComponent("sp.Skeleton");
        this._setMix("walk", "run");
        this._setMix("run", "jump");
        this._setMix("walk", "jump");
        spine.setStartListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
        });
        spine.setInterruptListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
        });
        spine.setEndListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        });
        spine.setDisposeListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
        });
        spine.setCompleteListener(function(trackEntry) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          "shoot" === animationName && _this.spine.clearTrack(1);
          var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
          cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
        });
        spine.setEventListener(function(trackEntry, event) {
          var animationName = trackEntry.animation ? trackEntry.animation.name : "";
          cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });
        this._hasStop = false;
      },
      toggleDebugSlots: function toggleDebugSlots() {
        this.spine.debugSlots = !this.spine.debugSlots;
      },
      toggleDebugBones: function toggleDebugBones() {
        this.spine.debugBones = !this.spine.debugBones;
      },
      toggleTimeScale: function toggleTimeScale() {
        1 === this.spine.timeScale ? this.spine.timeScale = .3 : this.spine.timeScale = 1;
      },
      stop: function stop() {
        this.spine.clearTrack(0);
        this._hasStop = true;
      },
      walk: function walk() {
        this.spine.setAnimation(0, "walk", true);
        this._hasStop = false;
      },
      run: function run() {
        this.spine.setAnimation(0, "run", true);
        this._hasStop = false;
      },
      jump: function jump() {
        var oldAnim = this.spine.animation;
        this.spine.setAnimation(0, "jump", false);
        oldAnim && !this._hasStop && this.spine.addAnimation(0, "run" === oldAnim ? "run" : "walk", true, 0);
      },
      shoot: function shoot() {
        this.spine.setAnimation(1, "shoot", false);
      },
      _setMix: function _setMix(anim1, anim2) {
        this.spine.setMix(anim1, anim2, this.mixTime);
        this.spine.setMix(anim2, anim1, this.mixTime);
      }
    });
    cc._RF.pop();
  }, {} ],
  StorageUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9bf9cWgTmNAapAWiQT08YdJ", "StorageUtil");
    "use strict";
    cc.Class({
      extends: cc.Component,
      setCurrentScene: function setCurrentScene(sceneName) {
        true;
        return;
      },
      getCurrentScene: function getCurrentScene() {
        true;
        return;
        var scene;
      },
      clearStorage: function clearStorage() {
        cc.sys.localStorage.clear();
      }
    });
    cc._RF.pop();
  }, {} ],
  Switcher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41a1bujgpVH7IZ1HSDQEosG", "Switcher");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        prefab: cc.Prefab
      },
      onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
          var newnode = cc.instantiate(this.prefab);
          var parent = this.node.parent;
          this.node.parent = null;
          newnode.parent = parent;
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  TagColliderListener: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc2a1tfAtlEWoLmkfLbgQS3", "TagColliderListener");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        }
      },
      onEnable: function onEnable() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
      },
      onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        this.label.string = "Collision on tag : " + self.tag;
      }
    });
    cc._RF.pop();
  }, {} ],
  TiledSpriteControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6941HLrIVFLokuMTS8HSUo", "TiledSpriteControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 100,
        progressBar: {
          default: null,
          type: cc.Node
        },
        ground: {
          default: null,
          type: cc.Node
        }
      },
      update: function update(dt) {
        this._updateWdith(this.progressBar, 500, dt);
        this._updateWdith(this.ground, 1e3, dt);
      },
      _updateWdith: function _updateWdith(node, range, dt) {
        var width = node.width;
        width = width < range ? width += dt * this.speed : 0;
        node.width = width;
      }
    });
    cc._RF.pop();
  }, {} ],
  TiledTile: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f47ccRZveFP2o2cCRmfZTTo", "TiledTile");
    "use strict";
    cc.Class({
      extends: cc.Component,
      start: function start() {
        var layer = this.getComponent(cc.TiledLayer);
        var tile = layer.getTiledTileAt(0, 22, true);
        var tileNode = tile.node;
        tileNode.runAction(cc.spawn(cc.scaleTo(2, 3, 3), cc.rotateTo(2, 90), cc.moveTo(2, 600, 300)));
      }
    });
    cc._RF.pop();
  }, {} ],
  TipsCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ae30fCf3BOT5yZGmirBXJi", "TipsCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        content: require("LabelLocalized")
      },
      onDestroySelf: function onDestroySelf() {
        this.node.destroy();
      },
      setContent: function setContent(str) {
        str && (this.content.textKey = str);
      }
    });
    cc._RF.pop();
  }, {
    LabelLocalized: "LabelLocalized"
  } ],
  TipsManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c9bezFtu5AHZUcydh+6QJj", "TipsManager");
    "use strict";
    var isAndroid = cc.sys.platform === cc.sys.ANDROID;
    var isNative = cc.sys.isNative;
    var isBrowser = cc.sys.isBrowser;
    var isMobile = cc.sys.isMobile;
    var isIphone = cc.sys.platform === cc.sys.IPHONE;
    var isDesktopBrowser = cc.sys.platform === cc.sys.DESKTOP_BROWSER;
    var isWechat = cc.sys.platform === cc.sys.WECHAT_GAME;
    var isQQPlay = cc.sys.platform === cc.sys.QQ_PLAY;
    var isBaidu = cc.sys.platform === cc.sys.BAIDU_GAME;
    var isVivo = cc.sys.platform === cc.sys.VIVO_GAME;
    var isOPPO = cc.sys.platform === cc.sys.OPPO_GAME;
    var isXiaomi = cc.sys.platform === cc.sys.XIAOMI_GAME;
    var isHuawei = cc.sys.platform === cc.sys.HUAWEI_GAME;
    var isJkw = cc.sys.platform === cc.sys.JKW_GAME;
    module.exports = {
      tispPrefab: null,
      SupportConfig: function SupportConfig(name) {
        console.log(name);
        switch (name) {
         case "downloader-web":
         case "EditBoxTabIndex":
          return !isNative;

         case "OnMultiTouchInput":
          return isMobile;

         case "webp-test":
          return cc.sys.capabilities["webp"];

         case "DeviceMotion":
          return isMobile && !isQQPlay && !isVivo;

         case "Native_Call":
          return isMobile && isAndroid && true;

         case "TTFFontLabel":
          return !isQQPlay;

         case "Subpackages":
          return (true, true) && !isBrowser && !isQQPlay && !isVivo && !isJkw;

         case "MousePropagation":
          return isNative && !isMobile && !isWechat && !isQQPlay && !isXiaomi && !isHuawei || isDesktopBrowser;

         case "downloader-native":
          return isNative && true;

         case "capture_to_native":
          return isNative && !isVivo && !isOPPO;

         case "iOS_getSafeArea":
          return isIphone && isNative;

         case "capture_to_wechat":
          return isWechat;

         case "capture_to_web":
         case "ShadowLabel":
          return isBrowser;

         case "MotionStreak":
         case "Mask_IMAGE_STENCIL":
         case "Mask_NESTED":
          return cc.game.renderType === cc.game.RENDER_TYPE_WEBGL;

         case "KeyboardInput":
         case "platform":
          return !isMobile && !isWechat && !isBaidu && !isXiaomi && !isHuawei;

         case "videoPlayer":
         case "webview":
          return (isMobile || isBrowser) && !isQQPlay && !isWechat && !isBaidu && !isXiaomi && !isHuawei;

         case "mesh":
          return !isVivo && !isOPPO;
        }
      },
      init: function init() {
        var _this = this;
        if (this.tipsPrefab) return;
        cc.loader.loadRes("tips/Tips", function(err, prefab) {
          _this.tipsPrefab = prefab;
        });
      },
      createTips: function createTips(content) {
        var node = cc.instantiate(this.tipsPrefab);
        var tipsCtrl = node.getComponent("TipsCtrl");
        content && tipsCtrl.setContent(content);
        node.parent = cc.director.getScene();
      },
      hasSupport: function hasSupport(name, hideTip) {
        var support = this.SupportConfig(name);
        if (!support && void 0 !== support) {
          hideTip || this.createTips();
          return false;
        }
        return true;
      }
    };
    cc._RF.pop();
  }, {} ],
  TouchDragger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95021X5KjxP369OONe316sH", "TouchDragger");
    "use strict";
    var TouchDragger = cc.Class({
      extends: cc.Component,
      properties: {
        propagate: {
          default: false
        }
      },
      onLoad: function onLoad() {
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          cc.log("Drag stated ...");
          this.opacity = 255;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          this.opacity = 255;
          var delta = event.touch.getDelta();
          this.x += delta.x;
          this.y += delta.y;
          this.getComponent(TouchDragger).propagate && event.stopPropagation();
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
          this.opacity = 160;
        }, this.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  TouchEvent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a14bfaD+gRJKrTVjKwitc53", "TouchEvent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      _callback: null,
      onLoad: function onLoad() {
        this.node.opacity = 100;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          this.node.opacity = 255;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
          this.node.opacity = 100;
          this._callback && this._callback();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
          this.node.opacity = 100;
        }, this);
      }
    });
    cc._RF.pop();
  }, {} ],
  ValueTypeProperties: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9bf6bFb+tF779stLEmjzTV", "ValueTypeProperties");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        myNumber: {
          default: 0,
          type: cc.Integer
        },
        myString: {
          default: "default text"
        },
        myVec2: {
          default: cc.Vec2.ZERO
        },
        myColor: {
          default: cc.Color.WHITE
        },
        myOtherNumber: 0,
        myOtherString: "no type definition",
        myOtherVec2: cc.Vec2.ONE,
        myOtherColor: cc.Color.BLACK
      },
      onLoad: function onLoad() {},
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  VideoPlayerCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "100b5UtyNJLNaih42ednEgN", "VideoPlayerCtrl");
    "use strict";
    var i18n = require("i18n");
    var TipsManager = require("TipsManager");
    function getStatus(event) {
      switch (event) {
       case cc.VideoPlayer.EventType.PLAYING:
        return "PLAYING";

       case cc.VideoPlayer.EventType.PAUSED:
        return "PAUSED";

       case cc.VideoPlayer.EventType.STOPPED:
        return "STOPPED";

       case cc.VideoPlayer.EventType.COMPLETED:
        return "COMPLETED";

       case cc.VideoPlayer.EventType.META_LOADED:
        return "META_LOADED";

       case cc.VideoPlayer.EventType.CLICKED:
        return "CLICKED";

       case cc.VideoPlayer.EventType.READY_TO_PLAY:
        return "READY_TO_PLAY";

       default:
        return "NONE";
      }
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        videoPlayer: cc.VideoPlayer,
        statusLabel: cc.Label,
        currentTime: cc.Label,
        resSwitchBtnLabel: cc.Label,
        controlButtons: cc.Node,
        keep_Ratio_Switch: cc.Node,
        playVideoArea: cc.Node,
        visibility: cc.Label
      },
      start: function start() {
        var _this = this;
        TipsManager.init();
        this.controlButtons.active = false;
        this.keep_Ratio_Switch.active = !cc.sys.isBrowser;
        this.playVideoArea.on("touchend", function() {
          _this.videoPlayer.play();
        });
      },
      onVideoPlayerEvent: function onVideoPlayerEvent(sender, event) {
        this.statusLabel.string = "Status: " + getStatus(event);
        if (event === cc.VideoPlayer.EventType.CLICKED) this.videoPlayer.isPlaying() ? this.videoPlayer.pause() : this.videoPlayer.play(); else if (event === cc.VideoPlayer.EventType.READY_TO_PLAY || event === cc.VideoPlayer.EventType.META_LOADED) {
          this.controlButtons.active = true;
          this.playVideoArea.active = true;
        } else event === cc.VideoPlayer.EventType.PLAYING && (this.playVideoArea.active = false);
      },
      toggleFullscreen: function toggleFullscreen() {
        if (cc.sys.isBrowser && cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ && cc.sys.browserVersion <= 7.2 && /Nexus 6/.test(navigator.userAgent)) {
          TipsManager.createTips(i18n.t("cases/02_ui/09_videoplayer/videoPlayer.nonsupport_fullscreen"));
          return cc.log("May be crash, so prohibit full screen");
        }
        this.videoPlayer.isFullscreen = true;
      },
      toggleVisibility: function toggleVisibility(event) {
        this.videoPlayer.node.active = !this.videoPlayer.node.active;
        this.playVideoArea.active = this.videoPlayer.node.active;
        this.visibility.string = "Visibility: " + this.videoPlayer.node.active;
      },
      keepRatioSwitch: function keepRatioSwitch() {
        this.videoPlayer.keepAspectRatio = !this.videoPlayer.keepAspectRatio;
      },
      switchOnlineVideo: function switchOnlineVideo() {
        this.videoPlayer.remoteURL = "http://www.w3school.com.cn/i/movie.mp4";
        this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
        this.playVideoArea.active = true;
      },
      switchLoaclVide: function switchLoaclVide() {
        this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.LOCAL;
        this.playVideoArea.active = true;
      },
      play: function play() {
        this.videoPlayer.play();
        this.playVideoArea.active = false;
      },
      pause: function pause() {
        this.videoPlayer.pause();
      },
      stop: function stop() {
        this.videoPlayer.stop();
      },
      update: function update() {
        this.currentTime && this.videoPlayer.currentTime >= 0 && (this.currentTime.string = this.videoPlayer.currentTime.toFixed(2) + " / " + this.videoPlayer.getDuration().toFixed(2));
      }
    });
    cc._RF.pop();
  }, {
    TipsManager: "TipsManager",
    i18n: "i18n"
  } ],
  Wall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a279oXNoxFFI516fswAbVo", "Wall");
    "use strict";
    var WallType = cc.Enum({
      Left: 0,
      Right: 1,
      Top: 2,
      Bottom: 3
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        type: {
          default: WallType.Left,
          type: WallType
        },
        width: 5
      },
      start: function start() {
        var collider = this.getComponent(cc.BoxCollider);
        if (!collider) return;
        var node = this.node;
        var type = this.type;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        var wallWidth = this.width;
        if (type === WallType.Left) {
          node.height = height;
          node.width = wallWidth;
          node.x = 0;
          node.y = height / 2;
        } else if (type === WallType.Right) {
          node.height = height;
          node.width = wallWidth;
          node.x = width;
          node.y = height / 2;
        } else if (type === WallType.Top) {
          node.width = width;
          node.height = wallWidth;
          node.x = width / 2;
          node.y = height;
        } else if (type === WallType.Bottom) {
          node.width = width;
          node.height = wallWidth;
          node.x = width / 2;
          node.y = 0;
        }
        collider.size = node.getContentSize();
      }
    });
    cc._RF.pop();
  }, {} ],
  WebviewCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8de1gmPM1CLoiv+P/T9HnJ", "WebviewCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        labelStatus: cc.Label,
        webview: cc.WebView,
        url: cc.EditBox
      },
      onWebFinishLoad: function onWebFinishLoad(sender, event) {
        var loadStatus = "";
        event === cc.WebView.EventType.LOADED ? loadStatus = " is loaded!" : event === cc.WebView.EventType.LOADING ? loadStatus = " is loading!" : event === cc.WebView.EventType.ERROR && (loadStatus = " load error!");
        this.labelStatus.string = this.webview.url + loadStatus;
      },
      visitURL: function visitURL() {
        this.webview.url = this.url.string;
      }
    });
    cc._RF.pop();
  }, {} ],
  arc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a556aaUmwpNjJWPRek7CPtI", "arc");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var g = this.getComponent(cc.Graphics);
        g.lineWidth = 5;
        g.fillColor.fromHEX("#ff0000");
        g.arc(0, 0, 100, Math.PI / 2, Math.PI, false);
        g.lineTo(0, 0);
        g.close();
        g.stroke();
        g.fill();
        g.fillColor.fromHEX("#00ff00");
        g.arc(-10, 10, 100, Math.PI / 2, Math.PI, true);
        g.lineTo(-10, 10);
        g.close();
        g.stroke();
        g.fill();
      }
    });
    cc._RF.pop();
  }, {} ],
  capture_to_native: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1a65pebNpA27eOgsyL77g/", "capture_to_native");
    "use strict";
    cc.Class({
      extends: require("./textureRenderUtils"),
      properties: {
        _width: 0,
        _height: 0
      },
      start: function start() {
        var _this = this;
        this.init();
        this.schedule(function() {
          var picData = _this.initImage();
          _this.showSprite(picData);
          _this.label.string = "Showing the capture";
          _this.saveFile(picData);
        }, 1, 0);
      },
      initImage: function initImage() {
        var data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        var picData = this.filpYImage(data, this._width, this._height);
        return picData;
      },
      showSprite: function showSprite(picData) {
        var _this2 = this;
        var texture = new cc.Texture2D();
        texture.initWithData(picData, 32, this._width, this._height);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, function() {
          node.parent = null;
          _this2.label.string = "";
          node.destroy();
        });
        this.captureAction(node, width, height);
      },
      saveFile: function saveFile(picData) {
        var filePath;
        var success;
        false;
      },
      filpYImage: function filpYImage(data, width, height) {
        var picData = new Uint8Array(width * height * 4);
        var rowBytes = 4 * width;
        for (var row = 0; row < height; row++) {
          var srow = height - 1 - row;
          var start = srow * width * 4;
          var reStart = row * width * 4;
          for (var i = 0; i < rowBytes; i++) picData[reStart + i] = data[start + i];
        }
        return picData;
      }
    });
    cc._RF.pop();
  }, {
    "./textureRenderUtils": "textureRenderUtils"
  } ],
  capture_to_web: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ac74J4RCNKq6XeV8GboJXx", "capture_to_web");
    "use strict";
    cc.Class({
      extends: require("./textureRenderUtils"),
      start: function start() {
        var _this = this;
        this.init();
        this.scheduleOnce(function() {
          _this.createSprite();
          var img = _this.initImage();
          _this.showSprite(img);
          _this.label.string = "Showing the capture";
        }, 1);
      }
    });
    cc._RF.pop();
  }, {
    "./textureRenderUtils": "textureRenderUtils"
  } ],
  capture_to_wechat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ed55wVxhhB5p1/Ob9bQHCL", "capture_to_wechat");
    "use strict";
    cc.Class({
      extends: require("./textureRenderUtils"),
      start: function start() {
        var _this = this;
        this.init();
        this.scheduleOnce(function() {
          var canvas = _this.createSprite();
          _this.initImage();
          _this.saveFile(canvas);
        }, 1);
      },
      saveFile: function saveFile(tempCanvas) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
          var self = this;
          var data = {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            destWidth: canvas.width,
            destHeight: canvas.height,
            fileType: "png",
            quality: 1
          };
          var _tempFilePath = tempCanvas.toTempFilePathSync(data);
          cc.log("Capture file success!" + _tempFilePath);
          self.label.string = "\u56fe\u7247\u52a0\u8f7d\u5b8c\u6210\uff0c\u7b49\u5f85\u672c\u5730\u9884\u89c8";
          wx.previewImage({
            urls: [ _tempFilePath ],
            success: function success(res) {
              cc.log("Preview image success.");
              self.label.string = "";
            }
          });
        }
      }
    });
    cc._RF.pop();
  }, {
    "./textureRenderUtils": "textureRenderUtils"
  } ],
  checkbox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca244RHY8xLbprnCDD9dH+B", "checkbox");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        checkbox: {
          default: null,
          type: cc.Toggle
        },
        checkBoxEventString: {
          default: null,
          type: cc.Label
        },
        radioButtonEventString: {
          default: null,
          type: cc.Label
        },
        radioButton: {
          default: [],
          type: cc.Toggle
        }
      },
      onLoad: function onLoad() {
        this.checkbox && this._updateToggleEventString("CheckBox", this.checkBoxEventString, this.checkbox);
      },
      _updateToggleEventString: function _updateToggleEventString(title, label, toggle) {
        toggle.isChecked ? label.string = title + " is checked." : label.string = title + " is unchecked.";
      },
      radioButtonClicked: function radioButtonClicked(toggle) {
        var index = this.radioButton.indexOf(toggle);
        var title = "RadioButton";
        switch (index) {
         case 0:
          title += "1";
          break;

         case 1:
          title += "2";
          break;

         case 2:
          title += "3";
        }
        this._updateToggleEventString(title, this.radioButtonEventString, toggle);
      },
      checkBoxClicked: function checkBoxClicked(toggle) {
        this._updateToggleEventString("CheckBox", this.checkBoxEventString, toggle);
      }
    });
    cc._RF.pop();
  }, {} ],
  chroma: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "72facZSAJZETLpI+W596C1k", "chroma");
    "use strict";
    (function() {
      var a, b, c, d, e, f, g, h, i, j, k, l, m, n, _o, _p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, Aa, Ba, Ca = [].slice;
      xa = function() {
        var a, b, c, d, e;
        for (a = {}, e = "Boolean Number String Function Array Date RegExp Undefined Null".split(" "), 
        d = 0, b = e.length; d < b; d++) c = e[d], a["[object " + c + "]"] = c.toLowerCase();
        return function(b) {
          var c;
          return c = Object.prototype.toString.call(b), a[c] || "object";
        };
      }(), U = function U(a, b, c) {
        return null == b && (b = 0), null == c && (c = 1), a < b && (a = b), a > c && (a = c), 
        a;
      }, ya = function ya(a) {
        return a.length >= 3 ? Array.prototype.slice.call(a) : a[0];
      }, u = function u(a) {
        var b, c;
        for (a._clipped = !1, a._unclipped = a.slice(0), b = c = 0; c < 3; b = ++c) b < 3 ? ((a[b] < 0 || a[b] > 255) && (a._clipped = !0), 
        a[b] < 0 && (a[b] = 0), a[b] > 255 && (a[b] = 255)) : 3 === b && (a[b] < 0 && (a[b] = 0), 
        a[b] > 1 && (a[b] = 1));
        return a._clipped || delete a._unclipped, a;
      }, d = Math.PI, sa = Math.round, w = Math.cos, B = Math.floor, ba = Math.pow, V = Math.log, 
      ua = Math.sin, va = Math.sqrt, n = Math.atan2, Y = Math.max, m = Math.abs, g = 2 * d, 
      e = d / 3, b = d / 180, f = 180 / d, t = function t() {
        return arguments[0] instanceof a ? arguments[0] : function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, arguments, function() {});
      }, t.default = t, l = [], "undefined" != typeof module && null !== module && null != module.exports && (module.exports = t), 
      "function" == typeof define && define.amd ? define([], function() {
        return t;
      }) : (ra = "undefined" != typeof exports && null !== exports ? exports : this || window, 
      ra.chroma = t), t.version = "1.3.7", k = {}, i = [], j = !1, a = function() {
        function a() {
          var a, b, c, d, e, f, g, h, l;
          for (f = this, b = [], h = 0, d = arguments.length; h < d; h++) null != (a = arguments[h]) && b.push(a);
          if (b.length > 1 && (g = b[b.length - 1]), null != k[g]) f._rgb = u(k[g](ya(b.slice(0, -1)))); else {
            for (j || (i = i.sort(function(a, b) {
              return b.p - a.p;
            }), j = !0), l = 0, e = i.length; l < e && (c = i[l], !(g = c.test.apply(c, b))); l++) ;
            g && (f._rgb = u(k[g].apply(k, b)));
          }
          null == f._rgb && console.warn("unknown format: " + b), null == f._rgb && (f._rgb = [ 0, 0, 0 ]), 
          3 === f._rgb.length && f._rgb.push(1);
        }
        return a.prototype.toString = function() {
          return this.hex();
        }, a.prototype.clone = function() {
          return t(me._rgb);
        }, a;
      }(), t._input = k, t.brewer = r = {
        OrRd: [ "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000" ],
        PuBu: [ "#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858" ],
        BuPu: [ "#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b" ],
        Oranges: [ "#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704" ],
        BuGn: [ "#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b" ],
        YlOrBr: [ "#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506" ],
        YlGn: [ "#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529" ],
        Reds: [ "#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d" ],
        RdPu: [ "#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a" ],
        Greens: [ "#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b" ],
        YlGnBu: [ "#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58" ],
        Purples: [ "#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d" ],
        GnBu: [ "#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081" ],
        Greys: [ "#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000" ],
        YlOrRd: [ "#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026" ],
        PuRd: [ "#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f" ],
        Blues: [ "#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b" ],
        PuBuGn: [ "#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636" ],
        Viridis: [ "#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825" ],
        Spectral: [ "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2" ],
        RdYlGn: [ "#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837" ],
        RdBu: [ "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061" ],
        PiYG: [ "#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419" ],
        PRGn: [ "#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b" ],
        RdYlBu: [ "#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695" ],
        BrBG: [ "#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30" ],
        RdGy: [ "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a" ],
        PuOr: [ "#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b" ],
        Set2: [ "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3" ],
        Accent: [ "#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666" ],
        Set1: [ "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999" ],
        Set3: [ "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f" ],
        Dark2: [ "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666" ],
        Paired: [ "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928" ],
        Pastel2: [ "#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc" ],
        Pastel1: [ "#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2" ]
      }, function() {
        var a, b;
        b = [];
        for (a in r) b.push(r[a.toLowerCase()] = r[a]);
      }(), za = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      }, t.colors = za, P = function P() {
        var a, b, d, e, f, g, h, i, j;
        return b = ya(arguments), f = b[0], a = b[1], d = b[2], i = (f + 16) / 116, h = isNaN(a) ? i : i + a / 500, 
        j = isNaN(d) ? i : i - d / 200, i = c.Yn * Q(i), h = c.Xn * Q(h), j = c.Zn * Q(j), 
        g = Ba(3.2404542 * h - 1.5371385 * i - .4985314 * j), e = Ba(-.969266 * h + 1.8760108 * i + .041556 * j), 
        d = Ba(.0556434 * h - .2040259 * i + 1.0572252 * j), [ g, e, d, b.length > 3 ? b[3] : 1 ];
      }, Ba = function Ba(a) {
        return 255 * (a <= .00304 ? 12.92 * a : 1.055 * ba(a, 1 / 2.4) - .055);
      }, Q = function Q(a) {
        return a > c.t1 ? a * a * a : c.t2 * (a - c.t0);
      }, c = {
        Kn: 18,
        Xn: .95047,
        Yn: 1,
        Zn: 1.08883,
        t0: .137931034,
        t1: .206896552,
        t2: .12841855,
        t3: .008856452
      }, ja = function ja() {
        var a, b, c, d, e, f, g, h;
        return d = ya(arguments), c = d[0], b = d[1], a = d[2], e = oa(c, b, a), f = e[0], 
        g = e[1], h = e[2], [ 116 * g - 16, 500 * (f - g), 200 * (g - h) ];
      }, pa = function pa(a) {
        return (a /= 255) <= .04045 ? a / 12.92 : ba((a + .055) / 1.055, 2.4);
      }, Aa = function Aa(a) {
        return a > c.t3 ? ba(a, 1 / 3) : a / c.t2 + c.t0;
      }, oa = function oa() {
        var a, b, d, e, f, g, h;
        return e = ya(arguments), d = e[0], b = e[1], a = e[2], d = pa(d), b = pa(b), a = pa(a), 
        f = Aa((.4124564 * d + .3575761 * b + .1804375 * a) / c.Xn), g = Aa((.2126729 * d + .7151522 * b + .072175 * a) / c.Yn), 
        h = Aa((.0193339 * d + .119192 * b + .9503041 * a) / c.Zn), [ f, g, h ];
      }, t.lab = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "lab" ]), function() {});
      }, k.lab = P, a.prototype.lab = function() {
        return ja(this._rgb);
      }, _o = function o(a) {
        var b, c, d, e, f, g, h, i, j, k, l;
        return a = function() {
          var b, c, d;
          for (d = [], c = 0, b = a.length; c < b; c++) e = a[c], d.push(t(e));
          return d;
        }(), 2 === a.length ? (j = function() {
          var b, c, d;
          for (d = [], c = 0, b = a.length; c < b; c++) e = a[c], d.push(e.lab());
          return d;
        }(), f = j[0], g = j[1], b = function b(a) {
          var b, c;
          return c = function() {
            var c, d;
            for (d = [], b = c = 0; c <= 2; b = ++c) d.push(f[b] + a * (g[b] - f[b]));
            return d;
          }(), t.lab.apply(t, c);
        }) : 3 === a.length ? (k = function() {
          var b, c, d;
          for (d = [], c = 0, b = a.length; c < b; c++) e = a[c], d.push(e.lab());
          return d;
        }(), f = k[0], g = k[1], h = k[2], b = function b(a) {
          var b, c;
          return c = function() {
            var c, d;
            for (d = [], b = c = 0; c <= 2; b = ++c) d.push((1 - a) * (1 - a) * f[b] + 2 * (1 - a) * a * g[b] + a * a * h[b]);
            return d;
          }(), t.lab.apply(t, c);
        }) : 4 === a.length ? (l = function() {
          var b, c, d;
          for (d = [], c = 0, b = a.length; c < b; c++) e = a[c], d.push(e.lab());
          return d;
        }(), f = l[0], g = l[1], h = l[2], i = l[3], b = function b(a) {
          var b, c;
          return c = function() {
            var c, d;
            for (d = [], b = c = 0; c <= 2; b = ++c) d.push((1 - a) * (1 - a) * (1 - a) * f[b] + 3 * (1 - a) * (1 - a) * a * g[b] + 3 * (1 - a) * a * a * h[b] + a * a * a * i[b]);
            return d;
          }(), t.lab.apply(t, c);
        }) : 5 === a.length && (c = _o(a.slice(0, 3)), d = _o(a.slice(2, 5)), b = function b(a) {
          return a < .5 ? c(2 * a) : d(2 * (a - .5));
        }), b;
      }, t.bezier = function(a) {
        var b;
        return b = _o(a), b.scale = function() {
          return t.scale(b);
        }, b;
      }, t.cubehelix = function(a, b, c, d, e) {
        var f, h, i;
        return null == a && (a = 300), null == b && (b = -1.5), null == c && (c = 1), null == d && (d = 1), 
        null == e && (e = [ 0, 1 ]), f = 0, "array" === xa(e) ? h = e[1] - e[0] : (h = 0, 
        e = [ e, e ]), i = function i(_i) {
          var j, k, l, m, n, o, p, q, r;
          return j = g * ((a + 120) / 360 + b * _i), p = ba(e[0] + h * _i, d), o = 0 !== f ? c[0] + _i * f : c, 
          k = o * p * (1 - p) / 2, m = w(j), r = ua(j), q = p + k * (-.14861 * m + 1.78277 * r), 
          n = p + k * (-.29227 * m - .90649 * r), l = p + k * (1.97294 * m), t(u([ 255 * q, 255 * n, 255 * l ]));
        }, i.start = function(b) {
          return null == b ? a : (a = b, i);
        }, i.rotations = function(a) {
          return null == a ? b : (b = a, i);
        }, i.gamma = function(a) {
          return null == a ? d : (d = a, i);
        }, i.hue = function(a) {
          return null == a ? c : (c = a, "array" === xa(c) ? 0 === (f = c[1] - c[0]) && (c = c[1]) : f = 0, 
          i);
        }, i.lightness = function(a) {
          return null == a ? e : ("array" === xa(a) ? (e = a, h = a[1] - a[0]) : (e = [ a, a ], 
          h = 0), i);
        }, i.scale = function() {
          return t.scale(i);
        }, i.hue(c), i;
      }, t.random = function() {
        var b, c, d;
        for (c = "0123456789abcdef", b = "#", d = 0; d < 6; ++d) b += c.charAt(B(16 * Math.random()));
        return new a(b);
      }, l = [], I = function I(a, b, c, d) {
        var e, f, g, h;
        for (null == c && (c = .5), null == d && (d = "rgb"), "object" !== xa(a) && (a = t(a)), 
        "object" !== xa(b) && (b = t(b)), g = 0, f = l.length; g < f; g++) if (e = l[g], 
        d === e[0]) {
          h = e[1](a, b, c, d);
          break;
        }
        if (null == h) throw "color mode " + d + " is not supported";
        return h.alpha(a.alpha() + c * (b.alpha() - a.alpha()));
      }, t.interpolate = I, a.prototype.interpolate = function(a, b, c) {
        return I(this, a, b, c);
      }, t.mix = I, a.prototype.mix = a.prototype.interpolate, k.rgb = function() {
        var a, b, c, d;
        b = ya(arguments), c = [];
        for (a in b) d = b[a], c.push(d);
        return c;
      }, t.rgb = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "rgb" ]), function() {});
      }, a.prototype.rgb = function(a) {
        return null == a && (a = !0), a ? this._rgb.map(Math.round).slice(0, 3) : this._rgb.slice(0, 3);
      }, a.prototype.rgba = function(a) {
        return null == a && (a = !0), a ? [ Math.round(this._rgb[0]), Math.round(this._rgb[1]), Math.round(this._rgb[2]), this._rgb[3] ] : this._rgb.slice(0);
      }, i.push({
        p: 3,
        test: function test(a) {
          var b;
          return b = ya(arguments), "array" === xa(b) && 3 === b.length ? "rgb" : 4 === b.length && "number" === xa(b[3]) && b[3] >= 0 && b[3] <= 1 ? "rgb" : void 0;
        }
      }), k.lrgb = k.rgb, L = function L(b, c, d, e) {
        var f, g;
        return f = b._rgb, g = c._rgb, new a(va(ba(f[0], 2) * (1 - d) + ba(g[0], 2) * d), va(ba(f[1], 2) * (1 - d) + ba(g[1], 2) * d), va(ba(f[2], 2) * (1 - d) + ba(g[2], 2) * d), e);
      }, h = function h(b) {
        var c, d, e, f, g, h;
        for (d = 1 / b.length, h = [ 0, 0, 0, 0 ], f = 0, e = b.length; f < e; f++) c = b[f], 
        g = c._rgb, h[0] += ba(g[0], 2) * d, h[1] += ba(g[1], 2) * d, h[2] += ba(g[2], 2) * d, 
        h[3] += g[3] * d;
        return h[0] = va(h[0]), h[1] = va(h[1]), h[2] = va(h[2]), new a(h);
      }, l.push([ "lrgb", L ]), t.average = function(a, b) {
        var c, e, f, g, i, j, k, l, m, o, p, q, r;
        if (null == b && (b = "rgb"), m = a.length, a = a.map(function(a) {
          return t(a);
        }), k = a.splice(0, 1)[0], "lrgb" === b) return h(a);
        q = k.get(b), g = [], i = 0, j = 0;
        for (l in q) q[l] = q[l] || 0, g.push(isNaN(q[l]) ? 0 : 1), "h" !== b.charAt(l) || isNaN(q[l]) || (c = q[l] / 180 * d, 
        i += w(c), j += ua(c));
        for (e = k.alpha(), p = 0, o = a.length; p < o; p++) {
          f = a[p], r = f.get(b), e += f.alpha();
          for (l in q) isNaN(r[l]) || (g[l] += 1, "h" === b.charAt(l) ? (c = r[l] / 180 * d, 
          i += w(c), j += ua(c)) : q[l] += r[l]);
        }
        for (l in q) if ("h" === b.charAt(l)) {
          for (c = n(j / g[l], i / g[l]) / d * 180; c < 0; ) c += 360;
          for (;c >= 360; ) c -= 360;
          q[l] = c;
        } else q[l] = q[l] / g[l];
        return t(q, b).alpha(e / m);
      }, D = function D(a) {
        var b, c, d, e, f, g;
        if (a.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) return 4 !== a.length && 7 !== a.length || (a = a.substr(1)), 
        3 === a.length && (a = a.split(""), a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), 
        g = parseInt(a, 16), e = g >> 16, d = g >> 8 & 255, c = 255 & g, [ e, d, c, 1 ];
        if (a.match(/^#?([A-Fa-f0-9]{8})$/)) return 9 === a.length && (a = a.substr(1)), 
        g = parseInt(a, 16), e = g >> 24 & 255, d = g >> 16 & 255, c = g >> 8 & 255, b = sa((255 & g) / 255 * 100) / 100, 
        [ e, d, c, b ];
        if (null != k.css && (f = k.css(a))) return f;
        throw "unknown color: " + a;
      }, fa = function fa(a, b) {
        var c, d, e, f, g, h, i;
        return null == b && (b = "rgb"), g = a[0], e = a[1], d = a[2], c = a[3], g = Math.round(g), 
        e = Math.round(e), d = Math.round(d), i = g << 16 | e << 8 | d, h = "000000" + i.toString(16), 
        h = h.substr(h.length - 6), f = "0" + sa(255 * c).toString(16), f = f.substr(f.length - 2), 
        "#" + function() {
          switch (b.toLowerCase()) {
           case "rgba":
            return h + f;

           case "argb":
            return f + h;

           default:
            return h;
          }
        }();
      }, k.hex = function(a) {
        return D(a);
      }, t.hex = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "hex" ]), function() {});
      }, a.prototype.hex = function(a) {
        return null == a && (a = "rgb"), fa(this._rgb, a);
      }, i.push({
        p: 4,
        test: function test(a) {
          if (1 === arguments.length && "string" === xa(a)) return "hex";
        }
      }), G = function G() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
        if (a = ya(arguments), e = a[0], k = a[1], g = a[2], 0 === k) i = d = b = 255 * g; else {
          for (n = [ 0, 0, 0 ], c = [ 0, 0, 0 ], m = g < .5 ? g * (1 + k) : g + k - g * k, 
          l = 2 * g - m, e /= 360, n[0] = e + 1 / 3, n[1] = e, n[2] = e - 1 / 3, f = h = 0; h <= 2; f = ++h) n[f] < 0 && (n[f] += 1), 
          n[f] > 1 && (n[f] -= 1), 6 * n[f] < 1 ? c[f] = l + 6 * (m - l) * n[f] : 2 * n[f] < 1 ? c[f] = m : 3 * n[f] < 2 ? c[f] = l + (m - l) * (2 / 3 - n[f]) * 6 : c[f] = l;
          j = [ sa(255 * c[0]), sa(255 * c[1]), sa(255 * c[2]) ], i = j[0], d = j[1], b = j[2];
        }
        return a.length > 3 ? [ i, d, b, a[3] ] : [ i, d, b ];
      }, ha = function ha(a, b, c) {
        var d, e, f, g, h;
        return void 0 !== a && a.length >= 3 && (g = a, a = g[0], b = g[1], c = g[2]), a /= 255, 
        b /= 255, c /= 255, f = Math.min(a, b, c), Y = Math.max(a, b, c), e = (Y + f) / 2, 
        Y === f ? (h = 0, d = Number.NaN) : h = e < .5 ? (Y - f) / (Y + f) : (Y - f) / (2 - Y - f), 
        a === Y ? d = (b - c) / (Y - f) : b === Y ? d = 2 + (c - a) / (Y - f) : c === Y && (d = 4 + (a - b) / (Y - f)), 
        d *= 60, d < 0 && (d += 360), [ d, h, e ];
      }, t.hsl = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "hsl" ]), function() {});
      }, k.hsl = G, a.prototype.hsl = function() {
        return ha(this._rgb);
      }, H = function H() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
        if (a = ya(arguments), e = a[0], p = a[1], r = a[2], r *= 255, 0 === p) i = d = b = r; else switch (360 === e && (e = 0), 
        e > 360 && (e -= 360), e < 0 && (e += 360), e /= 60, f = B(e), c = e - f, g = r * (1 - p), 
        h = r * (1 - p * c), q = r * (1 - p * (1 - c)), f) {
         case 0:
          j = [ r, q, g ], i = j[0], d = j[1], b = j[2];
          break;

         case 1:
          k = [ h, r, g ], i = k[0], d = k[1], b = k[2];
          break;

         case 2:
          l = [ g, r, q ], i = l[0], d = l[1], b = l[2];
          break;

         case 3:
          m = [ g, h, r ], i = m[0], d = m[1], b = m[2];
          break;

         case 4:
          n = [ q, g, r ], i = n[0], d = n[1], b = n[2];
          break;

         case 5:
          o = [ r, g, h ], i = o[0], d = o[1], b = o[2];
        }
        return [ i, d, b, a.length > 3 ? a[3] : 1 ];
      }, ia = function ia() {
        var a, b, c, d, e, f, g, h, i;
        return g = ya(arguments), f = g[0], c = g[1], a = g[2], e = Math.min(f, c, a), Y = Math.max(f, c, a), 
        b = Y - e, i = Y / 255, 0 === Y ? (d = Number.NaN, h = 0) : (h = b / Y, f === Y && (d = (c - a) / b), 
        c === Y && (d = 2 + (a - f) / b), a === Y && (d = 4 + (f - c) / b), (d *= 60) < 0 && (d += 360)), 
        [ d, h, i ];
      }, t.hsv = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "hsv" ]), function() {});
      }, k.hsv = H, a.prototype.hsv = function() {
        return ia(this._rgb);
      }, _ = function _(a) {
        var b, c, d;
        return "number" === xa(a) && a >= 0 && a <= 16777215 ? (d = a >> 16, c = a >> 8 & 255, 
        b = 255 & a, [ d, c, b, 1 ]) : (console.warn("unknown num color: " + a), [ 0, 0, 0, 1 ]);
      }, ma = function ma() {
        var a, b, c, d;
        return d = ya(arguments), c = d[0], b = d[1], a = d[2], (c << 16) + (b << 8) + a;
      }, t.num = function(b) {
        return new a(b, "num");
      }, a.prototype.num = function(a) {
        return null == a && (a = "rgb"), ma(this._rgb, a);
      }, k.num = _, i.push({
        p: 1,
        test: function test(a) {
          if (1 === arguments.length && "number" === xa(a) && a >= 0 && a <= 16777215) return "num";
        }
      }), C = function C() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
        if (c = ya(arguments), h = c[0], e = c[1], b = c[2], e /= 100, g = g / 100 * 255, 
        a = 255 * e, 0 === e) l = g = d = b; else switch (360 === h && (h = 0), h > 360 && (h -= 360), 
        h < 0 && (h += 360), h /= 60, i = B(h), f = h - i, j = b * (1 - e), k = j + a * (1 - f), 
        s = j + a * f, t = j + a, i) {
         case 0:
          m = [ t, s, j ], l = m[0], g = m[1], d = m[2];
          break;

         case 1:
          n = [ k, t, j ], l = n[0], g = n[1], d = n[2];
          break;

         case 2:
          o = [ j, t, s ], l = o[0], g = o[1], d = o[2];
          break;

         case 3:
          p = [ j, k, t ], l = p[0], g = p[1], d = p[2];
          break;

         case 4:
          q = [ s, j, t ], l = q[0], g = q[1], d = q[2];
          break;

         case 5:
          r = [ t, j, k ], l = r[0], g = r[1], d = r[2];
        }
        return [ l, g, d, c.length > 3 ? c[3] : 1 ];
      }, ea = function ea() {
        var a, b, c, d, e, f, g, h, i;
        return i = ya(arguments), h = i[0], e = i[1], b = i[2], g = Math.min(h, e, b), Y = Math.max(h, e, b), 
        d = Y - g, c = 100 * d / 255, a = g / (255 - d) * 100, 0 === d ? f = Number.NaN : (h === Y && (f = (e - b) / d), 
        e === Y && (f = 2 + (b - h) / d), b === Y && (f = 4 + (h - e) / d), (f *= 60) < 0 && (f += 360)), 
        [ f, c, a ];
      }, t.hcg = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "hcg" ]), function() {});
      }, k.hcg = C, a.prototype.hcg = function() {
        return ea(this._rgb);
      }, x = function x(a) {
        var b, c, d, e, f, g, h, i;
        if (a = a.toLowerCase(), null != t.colors && t.colors[a]) return D(t.colors[a]);
        if (f = a.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
          for (h = f.slice(1, 4), e = g = 0; g <= 2; e = ++g) h[e] = +h[e];
          h[3] = 1;
        } else if (f = a.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) for (h = f.slice(1, 5), 
        e = i = 0; i <= 3; e = ++i) h[e] = +h[e]; else if (f = a.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
          for (h = f.slice(1, 4), e = b = 0; b <= 2; e = ++b) h[e] = sa(2.55 * h[e]);
          h[3] = 1;
        } else if (f = a.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
          for (h = f.slice(1, 5), e = c = 0; c <= 2; e = ++c) h[e] = sa(2.55 * h[e]);
          h[3] = +h[3];
        } else (f = a.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) ? (d = f.slice(1, 4), 
        d[1] *= .01, d[2] *= .01, h = G(d), h[3] = 1) : (f = a.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) && (d = f.slice(1, 4), 
        d[1] *= .01, d[2] *= .01, h = G(d), h[3] = +f[4]);
        return h;
      }, da = function da(a) {
        var b;
        return b = a[3] < 1 ? "rgba" : "rgb", "rgb" === b ? b + "(" + a.slice(0, 3).map(sa).join(",") + ")" : "rgba" === b ? b + "(" + a.slice(0, 3).map(sa).join(",") + "," + a[3] + ")" : void 0;
      }, qa = function qa(a) {
        return sa(100 * a) / 100;
      }, F = function F(a, b) {
        var c;
        return c = b < 1 ? "hsla" : "hsl", a[0] = qa(a[0] || 0), a[1] = qa(100 * a[1]) + "%", 
        a[2] = qa(100 * a[2]) + "%", "hsla" === c && (a[3] = b), c + "(" + a.join(",") + ")";
      }, k.css = function(a) {
        return x(a);
      }, t.css = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "css" ]), function() {});
      }, a.prototype.css = function(a) {
        return null == a && (a = "rgb"), "rgb" === a.slice(0, 3) ? da(this._rgb) : "hsl" === a.slice(0, 3) ? F(this.hsl(), this.alpha()) : void 0;
      }, k.named = function(a) {
        return D(za[a]);
      }, i.push({
        p: 5,
        test: function test(a) {
          if (1 === arguments.length && null != za[a]) return "named";
        }
      }), a.prototype.name = function(a) {
        var b, c;
        arguments.length && (za[a] && (this._rgb = D(za[a])), this._rgb[3] = 1), b = this.hex();
        for (c in za) if (b === za[c]) return c;
        return b;
      }, R = function R() {
        var a, c, d, e;
        return e = ya(arguments), d = e[0], a = e[1], c = e[2], c *= b, [ d, w(c) * a, ua(c) * a ];
      }, S = function S() {
        var a, b, c, d, e, f, g, h, i, j, k;
        return c = ya(arguments), h = c[0], e = c[1], g = c[2], j = R(h, e, g), a = j[0], 
        b = j[1], d = j[2], k = P(a, b, d), i = k[0], f = k[1], d = k[2], [ i, f, d, c.length > 3 ? c[3] : 1 ];
      }, O = function O() {
        var a, b, c, d, e, g;
        return g = ya(arguments), e = g[0], a = g[1], b = g[2], c = va(a * a + b * b), d = (n(b, a) * f + 360) % 360, 
        0 === sa(1e4 * c) && (d = Number.NaN), [ e, c, d ];
      }, ka = function ka() {
        var a, b, c, d, e, f, g;
        return f = ya(arguments), e = f[0], c = f[1], b = f[2], g = ja(e, c, b), d = g[0], 
        a = g[1], b = g[2], O(d, a, b);
      }, t.lch = function() {
        var b;
        return b = ya(arguments), new a(b, "lch");
      }, t.hcl = function() {
        var b;
        return b = ya(arguments), new a(b, "hcl");
      }, k.lch = S, k.hcl = function() {
        var a, b, c, d;
        return d = ya(arguments), b = d[0], a = d[1], c = d[2], S([ c, a, b ]);
      }, a.prototype.lch = function() {
        return ka(this._rgb);
      }, a.prototype.hcl = function() {
        return ka(this._rgb).reverse();
      }, ca = function ca(a) {
        var b, c, d, e, f, g, h, i, j;
        return null == a && (a = "rgb"), i = ya(arguments), h = i[0], e = i[1], b = i[2], 
        h /= 255, e /= 255, b /= 255, f = 1 - Math.max(h, Math.max(e, b)), d = f < 1 ? 1 / (1 - f) : 0, 
        c = (1 - h - f) * d, g = (1 - e - f) * d, j = (1 - b - f) * d, [ c, g, j, f ];
      }, v = function v() {
        var a, b, c, d, e, f, g, h, i;
        return b = ya(arguments), d = b[0], g = b[1], i = b[2], f = b[3], a = b.length > 4 ? b[4] : 1, 
        1 === f ? [ 0, 0, 0, a ] : (h = d >= 1 ? 0 : 255 * (1 - d) * (1 - f), e = g >= 1 ? 0 : 255 * (1 - g) * (1 - f), 
        c = i >= 1 ? 0 : 255 * (1 - i) * (1 - f), [ h, e, c, a ]);
      }, k.cmyk = function() {
        return v(ya(arguments));
      }, t.cmyk = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "cmyk" ]), function() {});
      }, a.prototype.cmyk = function() {
        return ca(this._rgb);
      }, k.gl = function() {
        var a, b, c, d, e;
        for (d = function() {
          var a, c;
          a = ya(arguments), c = [];
          for (b in a) e = a[b], c.push(e);
          return c;
        }.apply(this, arguments), a = c = 0; c <= 2; a = ++c) d[a] *= 255;
        return d;
      }, t.gl = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "gl" ]), function() {});
      }, a.prototype.gl = function() {
        var a;
        return a = this._rgb, [ a[0] / 255, a[1] / 255, a[2] / 255, a[3] ];
      }, la = function la(a, b, c) {
        var d;
        return d = ya(arguments), a = d[0], b = d[1], c = d[2], a = W(a), b = W(b), c = W(c), 
        .2126 * a + .7152 * b + .0722 * c;
      }, W = function W(a) {
        return a /= 255, a <= .03928 ? a / 12.92 : ba((a + .055) / 1.055, 2.4);
      }, N = function N(b, c, d, e) {
        var f, g;
        return f = b._rgb, g = c._rgb, new a(f[0] + d * (g[0] - f[0]), f[1] + d * (g[1] - f[1]), f[2] + d * (g[2] - f[2]), e);
      }, l.push([ "rgb", N ]), a.prototype.luminance = function(a, b) {
        var c, d, e, f, _g;
        return null == b && (b = "rgb"), arguments.length ? (f = this._rgb, 0 === a ? f = [ 0, 0, 0, this._rgb[3] ] : 1 === a ? f = [ 255, 255, 255, this[3] ] : (c = la(this._rgb), 
        d = 1e-7, e = 20, _g = function g(c, f) {
          var h, i;
          return i = c.interpolate(f, .5, b), h = i.luminance(), Math.abs(a - h) < d || !e-- ? i : h > a ? _g(c, i) : _g(i, f);
        }, f = c > a ? _g(t("black"), this).rgba() : _g(this, t("white")).rgba()), t(f).alpha(this.alpha())) : la(this._rgb);
      }, wa = function wa(a) {
        var b, c, d, e;
        return e = a / 100, e < 66 ? (d = 255, c = -155.25485562709179 - .44596950469579133 * (c = e - 2) + 104.49216199393888 * V(c), 
        b = e < 20 ? 0 : .8274096064007395 * (b = e - 10) - 254.76935184120902 + 115.67994401066147 * V(b)) : (d = 351.97690566805693 + .114206453784165 * (d = e - 55) - 40.25366309332127 * V(d), 
        c = 325.4494125711974 + .07943456536662342 * (c = e - 50) - 28.0852963507957 * V(c), 
        b = 255), [ d, c, b ];
      }, na = function na() {
        var a, b, c, d, e, f, g, h;
        for (f = ya(arguments), e = f[0], f[1], a = f[2], d = 1e3, c = 4e4, b = .4; c - d > b; ) h = .5 * (c + d), 
        g = wa(h), g[2] / g[0] >= a / e ? c = h : d = h;
        return sa(h);
      }, t.temperature = t.kelvin = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "temperature" ]), function() {});
      }, k.temperature = k.kelvin = k.K = wa, a.prototype.temperature = function() {
        return na(this._rgb);
      }, a.prototype.kelvin = a.prototype.temperature, t.contrast = function(b, c) {
        var d, e, f, g;
        return "string" !== (f = xa(b)) && "number" !== f || (b = new a(b)), "string" !== (g = xa(c)) && "number" !== g || (c = new a(c)), 
        d = b.luminance(), e = c.luminance(), d > e ? (d + .05) / (e + .05) : (e + .05) / (d + .05);
      }, t.distance = function(b, c, d) {
        var e, f, g, h, i, j, k;
        null == d && (d = "lab"), "string" !== (i = xa(b)) && "number" !== i || (b = new a(b)), 
        "string" !== (j = xa(c)) && "number" !== j || (c = new a(c)), g = b.get(d), h = c.get(d), 
        k = 0;
        for (f in g) e = (g[f] || 0) - (h[f] || 0), k += e * e;
        return Math.sqrt(k);
      }, t.deltaE = function(b, c, e, f) {
        var g, h, i, j, k, l, o, p, q, r, s, t, u, v, x, y, z, A, B, C, D, E, F, G, H, I, J;
        for (null == e && (e = 1), null == f && (f = 1), "string" !== (z = xa(b)) && "number" !== z || (b = new a(b)), 
        "string" !== (A = xa(c)) && "number" !== A || (c = new a(c)), B = b.lab(), g = B[0], 
        i = B[1], k = B[2], C = c.lab(), h = C[0], j = C[1], l = C[2], o = va(i * i + k * k), 
        p = va(j * j + l * l), F = g < 16 ? .511 : .040975 * g / (1 + .01765 * g), D = .0638 * o / (1 + .0131 * o) + .638, 
        y = o < 1e-6 ? 0 : 180 * n(k, i) / d; y < 0; ) y += 360;
        for (;y >= 360; ) y -= 360;
        return G = y >= 164 && y <= 345 ? .56 + m(.2 * w(d * (y + 168) / 180)) : .36 + m(.4 * w(d * (y + 35) / 180)), 
        q = o * o * o * o, x = va(q / (q + 1900)), E = D * (x * G + 1 - x), v = g - h, u = o - p, 
        s = i - j, t = k - l, r = s * s + t * t - u * u, H = v / (e * F), I = u / (f * D), 
        J = E, va(H * H + I * I + r / (J * J));
      }, a.prototype.get = function(a) {
        var b, c, d, e, f, g;
        return d = this, f = a.split("."), e = f[0], b = f[1], g = d[e](), b ? (c = e.indexOf(b), 
        c > -1 ? g[c] : console.warn("unknown channel " + b + " in mode " + e)) : g;
      }, a.prototype.set = function(a, b) {
        var c, d, e, f, g, h;
        if (e = this, g = a.split("."), f = g[0], c = g[1], c) if (h = e[f](), (d = f.indexOf(c)) > -1) if ("string" === xa(b)) switch (b.charAt(0)) {
         case "+":
         case "-":
          h[d] += +b;
          break;

         case "*":
          h[d] *= +b.substr(1);
          break;

         case "/":
          h[d] /= +b.substr(1);
          break;

         default:
          h[d] = +b;
        } else h[d] = b; else console.warn("unknown channel " + c + " in mode " + f); else h = b;
        return t(h, f).alpha(e.alpha());
      }, a.prototype.clipped = function() {
        return this._rgb._clipped || !1;
      }, a.prototype.alpha = function(a) {
        return arguments.length ? t.rgb([ this._rgb[0], this._rgb[1], this._rgb[2], a ]) : this._rgb[3];
      }, a.prototype.darken = function(a) {
        var b, d;
        return null == a && (a = 1), d = this, b = d.lab(), b[0] -= c.Kn * a, t.lab(b).alpha(d.alpha());
      }, a.prototype.brighten = function(a) {
        return null == a && (a = 1), this.darken(-a);
      }, a.prototype.darker = a.prototype.darken, a.prototype.brighter = a.prototype.brighten, 
      a.prototype.saturate = function(a) {
        var b, d;
        return null == a && (a = 1), d = this, b = d.lch(), b[1] += a * c.Kn, b[1] < 0 && (b[1] = 0), 
        t.lch(b).alpha(d.alpha());
      }, a.prototype.desaturate = function(a) {
        return null == a && (a = 1), this.saturate(-a);
      }, a.prototype.premultiply = function() {
        var a, b;
        return b = this.rgb(), a = this.alpha(), t(b[0] * a, b[1] * a, b[2] * a, a);
      }, _p = function p(a, b, c) {
        if (!_p[c]) throw "unknown blend mode " + c;
        return _p[c](a, b);
      }, q = function q(a) {
        return function(b, c) {
          var d, e;
          return d = t(c).rgb(), e = t(b).rgb(), t(a(d, e), "rgb");
        };
      }, A = function A(a) {
        return function(b, c) {
          var d, e, f;
          for (f = [], d = e = 0; e <= 3; d = ++e) f[d] = a(b[d], c[d]);
          return f;
        };
      }, $ = function $(a, b) {
        return a;
      }, Z = function Z(a, b) {
        return a * b / 255;
      }, y = function y(a, b) {
        return a > b ? b : a;
      }, T = function T(a, b) {
        return a > b ? a : b;
      }, ta = function ta(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
      }, aa = function aa(a, b) {
        return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
      }, s = function s(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
      }, z = function z(a, b) {
        return 255 === a ? 255 : (a = b / 255 * 255 / (1 - a / 255), a > 255 ? 255 : a);
      }, _p.normal = q(A($)), _p.multiply = q(A(Z)), _p.screen = q(A(ta)), _p.overlay = q(A(aa)), 
      _p.darken = q(A(y)), _p.lighten = q(A(T)), _p.dodge = q(A(z)), _p.burn = q(A(s)), 
      t.blend = _p, t.analyze = function(a) {
        var b, c, d, e;
        for (d = {
          min: Number.MAX_VALUE,
          max: -1 * Number.MAX_VALUE,
          sum: 0,
          values: [],
          count: 0
        }, c = 0, b = a.length; c < b; c++) null == (e = a[c]) || isNaN(e) || (d.values.push(e), 
        d.sum += e, e < d.min && (d.min = e), e > d.max && (d.max = e), d.count += 1);
        return d.domain = [ d.min, d.max ], d.limits = function(a, b) {
          return t.limits(d, a, b);
        }, d;
      }, t.scale = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, u, v, w, x;
        return k = "rgb", l = t("#ccc"), p = 0, !1, g = [ 0, 1 ], o = [], n = [ 0, 0 ], 
        c = !1, e = [], m = !1, j = 0, i = 1, f = !1, d = {}, q = !0, h = 1, w = function w(a) {
          var b, c, d, f, g, h;
          if (null == a && (a = [ "#fff", "#000" ]), null != a && "string" === xa(a) && null != t.brewer && (a = t.brewer[a] || t.brewer[a.toLowerCase()] || a), 
          "array" === xa(a)) {
            for (a = a.slice(0), b = d = 0, f = a.length - 1; 0 <= f ? d <= f : d >= f; b = 0 <= f ? ++d : --d) c = a[b], 
            "string" === xa(c) && (a[b] = t(c));
            for (o.length = 0, b = h = 0, g = a.length - 1; 0 <= g ? h <= g : h >= g; b = 0 <= g ? ++h : --h) o.push(b / (a.length - 1));
          }
          return v(), e = a;
        }, s = function s(a) {
          var b, d;
          if (null != c) {
            for (d = c.length - 1, b = 0; b < d && a >= c[b]; ) b++;
            return b - 1;
          }
          return 0;
        }, x = function x(a) {
          return a;
        }, function(a) {
          var b, d, e, f, g;
          return g = a, c.length > 2 && (f = c.length - 1, b = s(a), e = c[0] + (c[1] - c[0]) * (0 + .5 * p), 
          d = c[f - 1] + (c[f] - c[f - 1]) * (1 - .5 * p), g = j + (c[b] + .5 * (c[b + 1] - c[b]) - e) / (d - e) * (i - j)), 
          g;
        }, u = function u(a, b) {
          var f, g, m, p, r, u, v, w;
          if (null == b && (b = !1), isNaN(a)) return l;
          if (b ? w = a : c && c.length > 2 ? (f = s(a), w = f / (c.length - 2)) : w = i !== j ? (a - j) / (i - j) : 1, 
          b || (w = x(w)), 1 !== h && (w = ba(w, h)), w = n[0] + w * (1 - n[0] - n[1]), w = Math.min(1, Math.max(0, w)), 
          p = Math.floor(1e4 * w), q && d[p]) g = d[p]; else {
            if ("array" === xa(e)) for (m = r = 0, v = o.length - 1; 0 <= v ? r <= v : r >= v; m = 0 <= v ? ++r : --r) {
              if (u = o[m], w <= u) {
                g = e[m];
                break;
              }
              if (w >= u && m === o.length - 1) {
                g = e[m];
                break;
              }
              if (w > u && w < o[m + 1]) {
                w = (w - u) / (o[m + 1] - u), g = t.interpolate(e[m], e[m + 1], w, k);
                break;
              }
            } else "function" === xa(e) && (g = e(w));
            q && (d[p] = g);
          }
          return g;
        }, v = function v() {
          return d = {};
        }, w(a), r = function r(a) {
          var b;
          return b = t(u(a)), m && b[m] ? b[m]() : b;
        }, r.classes = function(a) {
          var b;
          return null != a ? ("array" === xa(a) ? (c = a, g = [ a[0], a[a.length - 1] ]) : (b = t.analyze(g), 
          c = 0 === a ? [ b.min, b.max ] : t.limits(b, "e", a)), r) : c;
        }, r.domain = function(a) {
          var b, c, d, f, h, k, l;
          if (!arguments.length) return g;
          if (j = a[0], i = a[a.length - 1], o = [], d = e.length, a.length === d && j !== i) for (h = 0, 
          f = a.length; h < f; h++) c = a[h], o.push((c - j) / (i - j)); else for (b = l = 0, 
          k = d - 1; 0 <= k ? l <= k : l >= k; b = 0 <= k ? ++l : --l) o.push(b / (d - 1));
          return g = [ j, i ], r;
        }, r.mode = function(a) {
          return arguments.length ? (k = a, v(), r) : k;
        }, r.range = function(a, b) {
          return w(a, b), r;
        }, r.out = function(a) {
          return m = a, r;
        }, r.spread = function(a) {
          return arguments.length ? (p = a, r) : p;
        }, r.correctLightness = function(a) {
          return null == a && (a = !0), f = a, v(), x = f ? function(a) {
            var b, c, d, e, f, g, h, i, j;
            for (b = u(0, !0).lab()[0], c = u(1, !0).lab()[0], h = b > c, d = u(a, !0).lab()[0], 
            f = b + (c - b) * a, e = d - f, i = 0, j = 1, g = 20; Math.abs(e) > .01 && g-- > 0; ) !function() {
              h && (e *= -1), e < 0 ? (i = a, a += .5 * (j - a)) : (j = a, a += .5 * (i - a)), 
              d = u(a, !0).lab()[0], e = d - f;
            }();
            return a;
          } : function(a) {
            return a;
          }, r;
        }, r.padding = function(a) {
          return null != a ? ("number" === xa(a) && (a = [ a, a ]), n = a, r) : n;
        }, r.colors = function(b, d) {
          var f, h, i, j, k, l, m, n;
          if (arguments.length < 2 && (d = "hex"), k = [], 0 === arguments.length) k = e.slice(0); else if (1 === b) k = [ r(.5) ]; else if (b > 1) h = g[0], 
          f = g[1] - h, k = function() {
            l = [];
            for (var a = 0; 0 <= b ? a < b : a > b; 0 <= b ? a++ : a--) l.push(a);
            return l;
          }.apply(this).map(function(a) {
            return r(h + a / (b - 1) * f);
          }); else {
            if (a = [], m = [], c && c.length > 2) for (i = n = 1, j = c.length; 1 <= j ? n < j : n > j; i = 1 <= j ? ++n : --n) m.push(.5 * (c[i - 1] + c[i])); else m = g;
            k = m.map(function(a) {
              return r(a);
            });
          }
          return t[d] && (k = k.map(function(a) {
            return a[d]();
          })), k;
        }, r.cache = function(a) {
          return null != a ? (q = a, r) : q;
        }, r.gamma = function(a) {
          return null != a ? (h = a, r) : h;
        }, r;
      }, null == t.scales && (t.scales = {}), t.scales.cool = function() {
        return t.scale([ t.hsl(180, 1, .9), t.hsl(250, .7, .4) ]);
      }, t.scales.hot = function() {
        return t.scale([ "#000", "#f00", "#ff0", "#fff" ], [ 0, .25, .75, 1 ]).mode("rgb");
      }, t.analyze = function(a, b, c) {
        var d, e, f, g, h, i, j;
        if (h = {
          min: Number.MAX_VALUE,
          max: -1 * Number.MAX_VALUE,
          sum: 0,
          values: [],
          count: 0
        }, null == c && (c = function c() {
          return !0;
        }), d = function d(a) {
          null == a || isNaN(a) || (h.values.push(a), h.sum += a, a < h.min && (h.min = a), 
          a > h.max && (h.max = a), h.count += 1);
        }, j = function j(a, e) {
          if (c(a, e)) return d(null != b && "function" === xa(b) ? b(a) : null != b && "string" === xa(b) || "number" === xa(b) ? a[b] : a);
        }, "array" === xa(a)) for (g = 0, f = a.length; g < f; g++) i = a[g], j(i); else for (e in a) i = a[e], 
        j(i, e);
        return h.domain = [ h.min, h.max ], h.limits = function(a, b) {
          return t.limits(h, a, b);
        }, h;
      }, t.limits = function(a, b, c) {
        var d, e, f, g, h, i, j, k, l, n, o, p, q, r, s, u, v, w, x, y, z, A, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, W, X, Z, $, _, aa, ca, da, ea, fa, ga, ha, ia, ja;
        if (null == b && (b = "equal"), null == c && (c = 7), "array" === xa(a) && (a = t.analyze(a)), 
        E = a.min, Y = a.max, a.sum, ia = a.values.sort(function(a, b) {
          return a - b;
        }), 1 === c) return [ E, Y ];
        if (C = [], "c" === b.substr(0, 1) && (C.push(E), C.push(Y)), "e" === b.substr(0, 1)) {
          for (C.push(E), y = K = 1, O = c - 1; 1 <= O ? K <= O : K >= O; y = 1 <= O ? ++K : --K) C.push(E + y / c * (Y - E));
          C.push(Y);
        } else if ("l" === b.substr(0, 1)) {
          if (E <= 0) throw "Logarithmic scales are only possible for values > 0";
          for (F = Math.LOG10E * V(E), D = Math.LOG10E * V(Y), C.push(E), y = ja = 1, P = c - 1; 1 <= P ? ja <= P : ja >= P; y = 1 <= P ? ++ja : --ja) C.push(ba(10, F + y / c * (D - F)));
          C.push(Y);
        } else if ("q" === b.substr(0, 1)) {
          for (C.push(E), y = d = 1, W = c - 1; 1 <= W ? d <= W : d >= W; y = 1 <= W ? ++d : --d) L = (ia.length - 1) * y / c, 
          M = B(L), M === L ? C.push(ia[M]) : (N = L - M, C.push(ia[M] * (1 - N) + ia[M + 1] * N));
          C.push(Y);
        } else if ("k" === b.substr(0, 1)) {
          for (H = ia.length, r = new Array(H), w = new Array(c), ea = !0, I = 0, u = null, 
          u = [], u.push(E), y = e = 1, X = c - 1; 1 <= X ? e <= X : e >= X; y = 1 <= X ? ++e : --e) u.push(E + y / c * (Y - E));
          for (u.push(Y); ea; ) {
            for (z = f = 0, Z = c - 1; 0 <= Z ? f <= Z : f >= Z; z = 0 <= Z ? ++f : --f) w[z] = 0;
            for (y = g = 0, $ = H - 1; 0 <= $ ? g <= $ : g >= $; y = 0 <= $ ? ++g : --g) {
              for (ha = ia[y], G = Number.MAX_VALUE, z = h = 0, _ = c - 1; 0 <= _ ? h <= _ : h >= _; z = 0 <= _ ? ++h : --h) (x = m(u[z] - ha)) < G && (G = x, 
              s = z);
              w[s]++, r[y] = s;
            }
            for (J = new Array(c), z = i = 0, aa = c - 1; 0 <= aa ? i <= aa : i >= aa; z = 0 <= aa ? ++i : --i) J[z] = null;
            for (y = j = 0, ca = H - 1; 0 <= ca ? j <= ca : j >= ca; y = 0 <= ca ? ++j : --j) v = r[y], 
            null === J[v] ? J[v] = ia[y] : J[v] += ia[y];
            for (z = k = 0, da = c - 1; 0 <= da ? k <= da : k >= da; z = 0 <= da ? ++k : --k) J[z] *= 1 / w[z];
            for (ea = !1, z = l = 0, Q = c - 1; 0 <= Q ? l <= Q : l >= Q; z = 0 <= Q ? ++l : --l) if (J[z] !== u[y]) {
              ea = !0;
              break;
            }
            u = J, I++, I > 200 && (ea = !1);
          }
          for (A = {}, z = n = 0, R = c - 1; 0 <= R ? n <= R : n >= R; z = 0 <= R ? ++n : --n) A[z] = [];
          for (y = o = 0, S = H - 1; 0 <= S ? o <= S : o >= S; y = 0 <= S ? ++o : --o) v = r[y], 
          A[v].push(ia[y]);
          for (fa = [], z = p = 0, T = c - 1; 0 <= T ? p <= T : p >= T; z = 0 <= T ? ++p : --p) fa.push(A[z][0]), 
          fa.push(A[z][A[z].length - 1]);
          for (fa = fa.sort(function(a, b) {
            return a - b;
          }), C.push(fa[0]), y = q = 1, U = fa.length - 1; q <= U; y = q += 2) ga = fa[y], 
          isNaN(ga) || -1 !== C.indexOf(ga) || C.push(ga);
        }
        return C;
      }, E = function E(a, b, c) {
        var d, f, h, i;
        return d = ya(arguments), a = d[0], b = d[1], c = d[2], isNaN(a) && (a = 0), a /= 360, 
        a < 1 / 3 ? (f = (1 - b) / 3, i = (1 + b * w(g * a) / w(e - g * a)) / 3, h = 1 - (f + i)) : a < 2 / 3 ? (a -= 1 / 3, 
        i = (1 - b) / 3, h = (1 + b * w(g * a) / w(e - g * a)) / 3, f = 1 - (i + h)) : (a -= 2 / 3, 
        h = (1 - b) / 3, f = (1 + b * w(g * a) / w(e - g * a)) / 3, i = 1 - (h + f)), i = U(c * i * 3), 
        h = U(c * h * 3), f = U(c * f * 3), [ 255 * i, 255 * h, 255 * f, d.length > 3 ? d[3] : 1 ];
      }, ga = function ga() {
        var a, b, c, d, e, f, h, i;
        return h = ya(arguments), f = h[0], b = h[1], a = h[2], g = 2 * Math.PI, f /= 255, 
        b /= 255, a /= 255, e = Math.min(f, b, a), d = (f + b + a) / 3, i = 1 - e / d, 0 === i ? c = 0 : (c = (f - b + (f - a)) / 2, 
        c /= Math.sqrt((f - b) * (f - b) + (f - a) * (b - a)), c = Math.acos(c), a > b && (c = g - c), 
        c /= g), [ 360 * c, i, d ];
      }, t.hsi = function() {
        return function(a, b, c) {
          c.prototype = a.prototype;
          var d = new c(), e = a.apply(d, b);
          return Object(e) === e ? e : d;
        }(a, Ca.call(arguments).concat([ "hsi" ]), function() {});
      }, k.hsi = E, a.prototype.hsi = function() {
        return ga(this._rgb);
      }, J = function J(a, b, c, d) {
        var e, f, g, h, i, j, k, l, m, n, o, p;
        return "hsl" === d ? (o = a.hsl(), p = b.hsl()) : "hsv" === d ? (o = a.hsv(), p = b.hsv()) : "hcg" === d ? (o = a.hcg(), 
        p = b.hcg()) : "hsi" === d ? (o = a.hsi(), p = b.hsi()) : "lch" !== d && "hcl" !== d || (d = "hcl", 
        o = a.hcl(), p = b.hcl()), "h" === d.substr(0, 1) && (g = o[0], m = o[1], j = o[2], 
        h = p[0], n = p[1], k = p[2]), isNaN(g) || isNaN(h) ? isNaN(g) ? isNaN(h) ? f = Number.NaN : (f = h, 
        1 !== j && 0 !== j || "hsv" === d || (l = n)) : (f = g, 1 !== k && 0 !== k || "hsv" === d || (l = m)) : (e = h > g && h - g > 180 ? h - (g + 360) : h < g && g - h > 180 ? h + 360 - g : h - g, 
        f = g + c * e), null == l && (l = m + c * (n - m)), i = j + c * (k - j), t[d](f, l, i);
      }, l = l.concat(function() {
        var a, b, c, d;
        for (c = [ "hsv", "hsl", "hsi", "hcl", "lch", "hcg" ], d = [], b = 0, a = c.length; b < a; b++) X = c[b], 
        d.push([ X, J ]);
        return d;
      }()), M = function M(a, b, c, d) {
        var e, f;
        return e = a.num(), f = b.num(), t.num(e + (f - e) * c, "num");
      }, l.push([ "num", M ]), K = function K(b, c, d, e) {
        var f, g;
        return f = b.lab(), g = c.lab(), new a(f[0] + d * (g[0] - f[0]), f[1] + d * (g[1] - f[1]), f[2] + d * (g[2] - f[2]), e);
      }, l.push([ "lab", K ]);
    }).call(void 0);
    cc._RF.pop();
  }, {} ],
  "compressed-texture": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "615a1E9o7JL16wYETk3dcOV", "compressed-texture");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sprite: {
          default: null,
          type: cc.Sprite
        },
        infoLabel: cc.Label
      },
      start: function start() {
        var texture = this.sprite.spriteFrame.getTexture();
        this.infoLabel.string = texture.url + "@" + texture.getPixelFormat();
      }
    });
    cc._RF.pop();
  }, {} ],
  custom_material: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cf55fSDhJtE4YLQLmUchrgd", "custom_material");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sprite: cc.Sprite,
        speed: .1
      },
      start: function start() {
        this.time = 0;
      },
      update: function update(dt) {
        if (!this.sprite) return;
        this.time += dt * this.speed;
        var material = this.sprite.getMaterial(0);
        material.setProperty("time", this.time);
      }
    });
    cc._RF.pop();
  }, {} ],
  doodle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "136e6rUnNlCbZ7UezYhQDoQ", "doodle");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        reactivity: .5,
        debug: false
      },
      onEnable: function onEnable() {
        this.graphics = this.getComponent(cc.Graphics);
        this.nodes = [];
        this.ripples = [];
        this.mouse = {
          x: 0,
          y: 0
        };
        this.color = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
        this.cycle = 90;
        this.createBezierNodes();
        var canvas = cc.find("Canvas");
        canvas.on(cc.Node.EventType.TOUCH_START, function(touch, event) {
          this.mouse = touch.getLocation();
          this.addRipple();
        }, this);
        canvas.on(cc.Node.EventType.TOUCH_END, function() {
          this.input = false;
        }, this);
      },
      createBezierNodes: function createBezierNodes() {
        this.updateColorCycle();
        for (var quantity = 0, len = 6; quantity < len; quantity++) {
          var theta = 2 * Math.PI * quantity / len;
          var x = .5 * cc.winSize.width + 0 * Math.cos(theta);
          var y = .5 * cc.winSize.height + 0 * Math.sin(theta);
          this.nodes.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            lastX: x,
            lastY: y,
            min: 150,
            max: 250,
            disturb: 150,
            orbit: 20,
            angle: Math.random() * Math.PI * 2,
            speed: .05 + .05 * Math.random(),
            theta: theta
          });
        }
      },
      addRipple: function addRipple() {
        this.input = true;
        if (0 === this.ripples.length) {
          this.updateColorCycle();
          this.ripples.push({
            x: this.mouse.x,
            y: this.mouse.y,
            reactivity: 0,
            fade: 1
          });
        }
      },
      updateColorCycle: function updateColorCycle() {
        this.cycle = 100 !== Math.min(this.cycle + this.reactivity + .3, 100) ? this.cycle += this.reactivity + .3 : 0;
        var color = this.color;
        color.r = ~~(127 * Math.sin(.3 * this.cycle + 0) + 128);
        color.g = ~~(127 * Math.sin(.3 * this.cycle + 2) + 128);
        color.b = ~~(127 * Math.sin(.3 * this.cycle + 4) + 128);
      },
      update: function update(dt) {
        var _this = this;
        var nodes = this.nodes;
        var ripples = this.ripples;
        var ease = .01, friction = .98;
        for (var index = 0; index < ripples.length; index++) {
          var ripple = ripples[index];
          ripple.reactivity += 5;
          ripple.fade -= .05;
          ripple.fade <= 0 && ripples.splice(index, 1);
        }
        [].forEach.call(nodes, function(node, index) {
          node.lastX += .08 * (.5 * cc.winSize.width + node.disturb * Math.cos(node.theta) - node.lastX);
          node.lastY += .08 * (.5 * cc.winSize.height + node.disturb * Math.sin(node.theta) - node.lastY);
          node.x += .08 * (node.lastX + Math.cos(node.angle) * node.orbit - node.x);
          node.y += .08 * (node.lastY + Math.sin(node.angle) * node.orbit - node.y);
          node.vx += (node.min - node.disturb) * ease;
          node.vx *= friction;
          node.disturb += node.vx;
          _this.input && (node.disturb += (node.max - node.disturb) * _this.reactivity);
          node.angle += node.speed;
        });
        this.render();
      },
      render: function render() {
        var _this2 = this;
        var nodes = this.nodes;
        var ripples = this.ripples;
        var graphics = this.graphics;
        var color = this.color;
        var currentIndex, nextIndex, xc, yc;
        color.a = this.debug ? 255 : 127.5;
        graphics.clear();
        [].forEach.call(nodes, function(node, index) {
          currentIndex = nodes[nodes.length - 1];
          nextIndex = nodes[0];
          xc = currentIndex.x + .5 * (nextIndex.x - currentIndex.x);
          yc = currentIndex.y + .5 * (nextIndex.y - currentIndex.y);
          var strokeColor = cc.color().fromHEX(_this2.debug ? "#a9a9a9" : "#e5e5e5");
          strokeColor.a = _this2.debug ? 255 : 127.5;
          graphics.strokeColor = strokeColor;
          graphics.fillColor = color;
          graphics.lineWidth = _this2.debug ? 1 : 5;
          graphics.moveTo(xc, yc);
          for (var N = 0; N < nodes.length; N++) {
            currentIndex = nodes[N];
            nextIndex = N + 1 > nodes.length - 1 ? nodes[N - nodes.length + 1] : nodes[N + 1];
            xc = currentIndex.x + .5 * (nextIndex.x - currentIndex.x);
            yc = currentIndex.y + .5 * (nextIndex.y - currentIndex.y);
            graphics.quadraticCurveTo(currentIndex.x, currentIndex.y, xc, yc);
          }
          _this2.debug ? null : graphics.fill();
          graphics.stroke();
          graphics.lineWidth = 1;
          graphics.lineCap = cc.Graphics.LineCap.ROUND;
          graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
          graphics.strokeColor.fromHEX("#a9a9a9");
          graphics.fillColor.fromHEX("#a9a9a9");
          for (var N = 0; N < nodes.length; N++) {
            currentIndex = nodes[N];
            nextIndex = N + 1 > nodes.length - 1 ? nodes[N - nodes.length + 1] : nodes[N + 1];
            xc = currentIndex.x + .8 * (nextIndex.x - currentIndex.x);
            yc = currentIndex.y + .8 * (nextIndex.y - currentIndex.y);
            graphics.moveTo(xc, yc);
            currentIndex = nextIndex;
            nextIndex = N + 2 > nodes.length - 1 ? nodes[N - nodes.length + 2] : nodes[N + 2];
            xc = currentIndex.x + .2 * (nextIndex.x - currentIndex.x);
            yc = currentIndex.y + .2 * (nextIndex.y - currentIndex.y);
            graphics.lineTo(xc, yc);
            graphics.stroke();
            currentIndex = nodes[N];
            nextIndex = N + 1 > nodes.length - 1 ? nodes[N - nodes.length + 1] : nodes[N + 1];
            xc = currentIndex.x + .8 * (nextIndex.x - currentIndex.x);
            yc = currentIndex.y + .8 * (nextIndex.y - currentIndex.y);
            graphics.circle(xc, yc, 2);
            graphics.fill();
            currentIndex = nextIndex;
            nextIndex = N + 2 > nodes.length - 1 ? nodes[N - nodes.length + 2] : nodes[N + 2];
            xc = currentIndex.x + .2 * (nextIndex.x - currentIndex.x);
            yc = currentIndex.y + .2 * (nextIndex.y - currentIndex.y);
            graphics.circle(xc, yc, 2);
            graphics.fill();
          }
        });
        for (var index = 0; index < ripples.length; index++) {
          var ripple = ripples[index];
          var fillColor = cc.color().fromHEX("#ffffff");
          fillColor.a = 255 * ripple.fade;
          graphics.fillColor = fillColor;
          graphics.circle(ripple.x, ripple.y, ripple.reactivity);
          graphics.fill();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  "downloader-audio": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c2cc2alblHzIYTnubkC9U7", "downloader-audio");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        remindLabel: {
          default: null,
          type: cc.Label
        },
        inputUrlBox: {
          default: null,
          type: cc.EditBox
        },
        _audioPlayer: null,
        _audioUrl: "http://tools.itharbors.com/christmas/res/sounds/ss.mp3"
      },
      onLoad: function onLoad() {
        this.remindLabel.textKey = "";
        this._audioPlayer = this.node.getComponent("AudioCtrl");
      },
      startLoad: function startLoad() {
        this._audioUrl = this.inputUrlBox.string;
        if (this._audioUrl) {
          cc.loader.load({
            url: this._audioUrl,
            type: "mp3"
          }, this.onProgress.bind(this), this.audioLoadComplete.bind(this));
          this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.2");
        } else this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.10");
      },
      audioLoadComplete: function audioLoadComplete(err, res) {
        if (err || !res) {
          console.log(err);
          this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.5.1");
          return;
        }
        this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.4.1");
        this._audioPlayer.setAudioTask(res);
      },
      onProgress: function onProgress(completedCount, totalCount) {
        this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.3") + " " + completedCount / totalCount * 100;
      },
      update: function update() {
        this._audioPlayer.currentTime();
      },
      onDisable: function onDisable() {
        this._audioPlayer.stopAllAudio();
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  "downloader-picture": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d00dQT3HNGKavyQVCwTT1h", "downloader-picture");
    "use strict";
    var i18n = require("i18n");
    cc.Class({
      extends: cc.Component,
      properties: {
        remindLabel: {
          default: null,
          type: cc.Label
        },
        inputUrlBox: {
          default: null,
          type: cc.EditBox
        },
        picNode: {
          default: null,
          type: cc.Sprite
        },
        _picUrl: "http://tools.itharbors.com/christmas/res/tree.png"
      },
      onLoad: function onLoad() {
        this.remindLabel.textKey = "";
      },
      startLoad: function startLoad() {
        this._picUrl = this.inputUrlBox.string;
        if (this._picUrl) {
          cc.loader.load({
            url: this._picUrl,
            type: "png"
          }, this.onProgress.bind(this), this.picLoadComplete.bind(this));
          this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.2");
        } else this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.10");
      },
      picLoadComplete: function picLoadComplete(err, res) {
        if (err || !res) {
          console.log(err);
          this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.5.2");
          return;
        }
        this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.4.2");
        var spriteFrame = new cc.SpriteFrame(res);
        this.picNode.spriteFrame = spriteFrame;
        this.picNode.node.active = true;
      },
      onProgress: function onProgress(completedCount, totalCount) {
        this.remindLabel.textKey = i18n.t("cases/05_scripting/11_network/download-web.fire.3") + " " + completedCount / totalCount * 100;
      }
    });
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  "dynamic-load-material": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93268zvFsZAKpSHQw+2ixa3", "dynamic-load-material");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        meshRenderer: cc.MeshRenderer
      },
      start: function start() {
        var _this = this;
        this.scheduleOnce(function() {
          cc.loader.loadRes("materials/dynamic-load-material", cc.Material, function(err, material) {
            if (err) {
              cc.error(err);
              return;
            }
            _this.meshRenderer.setMaterial(0, material);
          });
        }, 1);
      }
    });
    cc._RF.pop();
  }, {} ],
  "dynamic-tiledmap": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cad2cnE69BPqr+Aejz96TlC", "dynamic-tiledmap");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        map_root: cc.Node
      },
      onLoadTileMap: function onLoadTileMap(url) {
        var _this = this;
        cc.loader.loadRes(url, cc.TiledMapAsset, function(err, tmxAsset) {
          if (err) {
            cc.error(err);
            return;
          }
          _this.onCreateTileMap(tmxAsset);
        });
      },
      onCreateTileMap: function onCreateTileMap(tmxAsset) {
        this.map_root.destroyAllChildren();
        var node = new cc.Node();
        this.map_root.addChild(node);
        var tileMap = node.addComponent(cc.TiledMap);
        tileMap.tmxAsset = tmxAsset;
      },
      onBtnCreateTileMap: function onBtnCreateTileMap() {
        var url = "tilemap/tile_iso_offset";
        this.onLoadTileMap(url);
      },
      onBtnCreateTileMapWithTsx: function onBtnCreateTileMapWithTsx() {
        var url = "tilemap/tile_iso_offset_with_tsx";
        this.onLoadTileMap(url);
      }
    });
    cc._RF.pop();
  }, {} ],
  ellipse: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7e65GQDltH+6fpuWTVubaZ", "ellipse");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var g = this.getComponent(cc.Graphics);
        g.lineWidth = 10;
        g.fillColor.fromHEX("#ff0000");
        g.circle(150, 0, 100);
        g.ellipse(-150, 0, 100, 70);
        g.stroke();
        g.fill();
      }
    });
    cc._RF.pop();
  }, {} ],
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "920c5VLzJxKjYCAoIUwUHym", "en");
    "use strict";
    module.exports = {
      example_case_tips_content: "The example case not support the current platform",
      example_case_nonsupport_native_desktop_tips: "The example case nonsupport the Mac platform and Windows platform",
      example_case_nonsupport_runtime_tips: "The example case does not support the runtime platform",
      example_case_nonsupport_mobile_tips: "The example case nonsupport mobile platforms",
      example_case_nonsupport_web_canvas_tips: "The example case nonsupport Canvas mode",
      example_case_support_webGl_tips: "The example case only supports WebGL mode",
      example_case_support_mobile_tips: "The example case only supports mobile platforms",
      example_case_support_mobile_android_tips: "The example case only supports Android mobile platform",
      example_case_support_native_chrome_tips: "The example case only supports Chrome browser (Native)",
      example_case_support_native_desktop_tips: "The example case only supports the Mac platform and Windows platform",
      example_case_nonsupport_preview_tips: "The example case nonsupport Preview",
      example_case_nonsupport_qqplay_tips: "The example case nonsupport QQplay",
      example_case_nonsupport_Wechatgame_tips: "The example case nonsupport Wechatgame",
      "cases/01_graphics/01_sprite/AtlasSprite.fire.7": "This is Spirte Single.",
      "cases/01_graphics/01_sprite/AtlasSprite.fire.11": "This is Spirte From Atlas.",
      "cases/01_graphics/01_sprite/FilledSprite.fire.9": "Fill Type: HORIZONTAL",
      "cases/01_graphics/01_sprite/FilledSprite.fire.15": "Fill Type: VERTICAL",
      "cases/01_graphics/01_sprite/FilledSprite.fire.23": "FILL Type: RADIAL",
      "cases/01_graphics/01_sprite/SimpleSprite.fire.7": "This is Simple Sprite.",
      "cases/01_graphics/01_sprite/SlicedSprite.fire.7": "This is Sliced Sprite.",
      "cases/01_graphics/01_sprite/TiledSprite.fire.6": "This is Tiled Sprite.",
      "cases/01_graphics/01_sprite/ChangeColor.fire.1": "Draw Call will be changed when change color.",
      "cases/01_graphics/01_sprite/TrimmedSprite.fire.7": "TRIMMED ",
      "cases/01_graphics/01_sprite/TrimmedSprite.fire.12": "No TRIMMED",
      "cases/01_graphics/02_particle/AutoRemoveParticle.fire.9": 'Particle 1\n"Auto Remove On Finish" disabled',
      "cases/01_graphics/02_particle/AutoRemoveParticle.fire.13": 'Particle 2\n"Auto Remove On Finish" enabled',
      "cases/01_graphics/02_particle/ToggleParticle.fire.6": 'Press "Button" to toggle particle play',
      "cases/02_ui/01_widget/AdvancedWidget.fire.7": "Top Left",
      "cases/02_ui/01_widget/AdvancedWidget.fire.9": "top: 10% left: 6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.14": "Top Left",
      "cases/02_ui/01_widget/AdvancedWidget.fire.16": "top: -34px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.21": "Top Right",
      "cases/02_ui/01_widget/AdvancedWidget.fire.23": "top: 10% right: 6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.28": "Left",
      "cases/02_ui/01_widget/AdvancedWidget.fire.30": "left: -50px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.35": "Right",
      "cases/02_ui/01_widget/AdvancedWidget.fire.37": "right: -50px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.42": "Bottom Left",
      "cases/02_ui/01_widget/AdvancedWidget.fire.44": "bottom: 10% left: 6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.49": "Bottom",
      "cases/02_ui/01_widget/AdvancedWidget.fire.51": "bottom: -34px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.56": "Bottom Right",
      "cases/02_ui/01_widget/AdvancedWidget.fire.58": "bottom:10% right:6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.63": "This is Advanced WIdget.",
      "cases/02_ui/01_widget/AlignOnceWidget.fire.1": "AlignOne is false, It is always aligns",
      "cases/02_ui/01_widget/AlignOnceWidget.fire.2": "AlignOne is true, It aligns only once",
      "cases/02_ui/01_widget/AnimatedWidget.fire.9": "This is Animation Widget.",
      "cases/02_ui/01_widget/AutoResize.fire.13": "This is Widget Auto Resize.",
      "cases/02_ui/01_widget/WidgetAlign.fire.18": "This is Widget Align.",
      "cases/02_ui/02_label/GoldBeatingAnime.js.1": "0",
      "cases/02_ui/02_label/AlignFontLabel.fire.6": "Align Label",
      "cases/02_ui/02_label/AlignFontLabel.fire.9": "Horizontal Align",
      "cases/02_ui/02_label/AlignFontLabel.fire.14": "Hello! \nWelcome Come To \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.16": "Align: LEFT",
      "cases/02_ui/02_label/AlignFontLabel.fire.21": "Hello! \nWelcome Come To \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.23": "Align: CENTER",
      "cases/02_ui/02_label/AlignFontLabel.fire.28": "Hello! \nWelcome Come To \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.30": "Align: RIGHT",
      "cases/02_ui/02_label/AlignFontLabel.fire.33": "Vertical Align",
      "cases/02_ui/02_label/AlignFontLabel.fire.38": "Welcome Come To \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.40": "Align: TOP",
      "cases/02_ui/02_label/AlignFontLabel.fire.45": "Welcome Come To \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.47": "Align: CENTER",
      "cases/02_ui/02_label/AlignFontLabel.fire.52": "Welcome Come To \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.54": "Align: BOTTOM",
      "cases/02_ui/02_label/SystemFontLabel.fire.6": "System Font",
      "cases/02_ui/02_label/SystemFontLabel.fire.9": "Wrap",
      "cases/02_ui/02_label/SystemFontLabel.fire.14": "This is System Font",
      "cases/02_ui/02_label/SystemFontLabel.fire.16": "Overflow: CLAMP",
      "cases/02_ui/02_label/SystemFontLabel.fire.21": "This is System Font",
      "cases/02_ui/02_label/SystemFontLabel.fire.23": "Overflow: SHRINK",
      "cases/02_ui/02_label/SystemFontLabel.fire.26": "No Wrap",
      "cases/02_ui/02_label/SystemFontLabel.fire.31": "This is System Font",
      "cases/02_ui/02_label/SystemFontLabel.fire.33": "Overflow: CLAMP",
      "cases/02_ui/02_label/SystemFontLabel.fire.38": "This is System Font",
      "cases/02_ui/02_label/SystemFontLabel.fire.40": "Overflow: SHRINK",
      "cases/02_ui/02_label/SystemFontLabel.fire.45": "Hello! Welcome Come To Cocos Creator",
      "cases/02_ui/02_label/SystemFontLabel.fire.47": "Overflow: RESZIE_HEIGHT",
      "cases/02_ui/03_button/ButtonInScroll.js.1": "Top button clicked!",
      "cases/02_ui/03_button/ButtonInScroll.js.2": "Bottom button clicked!",
      "cases/02_ui/03_button/ButtonInScroll.fire.21": "Which button is clicked?",
      "cases/02_ui/03_button/ButtonInScroll.fire.27": "drag to reveal more buttons",
      "cases/02_ui/03_button/SimpleButton.js.1": "Left button clicked!",
      "cases/02_ui/03_button/SimpleButton.js.2": "Right button clicked!",
      "cases/02_ui/03_button/ButtonInteractable.fire.7": "PLAY",
      "cases/02_ui/03_button/ButtonInteractable.fire.16": "STOP",
      "cases/02_ui/03_button/ButtonInteractable.fire.21": "interactable: true",
      "cases/02_ui/03_button/ButtonInteractable.fire.23": "interactable: false",
      "cases/02_ui/03_button/ButtonInteractable.js.1": "interactable: ",
      "cases/02_ui/03_button/ButtonInteractable.js.2": "interactable: ",
      "cases/02_ui/03_button/ButtonSizeMode.fire": "Buttons with different hit areas",
      "cases/02_ui/03_button/SimpleButton.fire.6": "Which button is clicked?",
      "cases/02_ui/04_progressbar/progressbar.fire.7": "Horizontal bar with progress 0.3",
      "cases/02_ui/04_progressbar/progressbar.fire.11": "Horizontal bar reverse with progress 1.0",
      "cases/02_ui/04_progressbar/progressbar.fire.15": "Vertical bar \nfrom bottom",
      "cases/02_ui/04_progressbar/progressbar.fire.19": "Vertical bar \nfrom top",
      "cases/02_ui/04_progressbar/progressbar.fire.23": "Progress bar with sprite",
      "cases/02_ui/04_progressbar/progressbar.fire.28": "Progress bar with child sprite",
      "cases/02_ui/05_scrollView/Item.js.1": "Tmpl#",
      "cases/02_ui/05_scrollView/ListView.fire.23": "Item #00",
      "cases/02_ui/05_scrollView/ScrollView.fire.7": "Scrollview full functionality",
      "cases/02_ui/05_scrollView/ScrollView.fire.30": "Scrollview without inertia",
      "cases/02_ui/05_scrollView/ScrollView.fire.53": "Scrollview without elastic",
      "cases/02_ui/05_scrollView/ScrollView.fire.76": "Scrollview horizontal scroll only",
      "cases/02_ui/05_scrollView/ScrollView.fire.93": "Scrollview vertical only",
      "cases/02_ui/05_scrollView/ScrollView.fire.110": "Scrollview no scrollbar",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.6": "Basic",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.31": "Horizontal",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.36": "Vertical",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.41": "Grid Layout Axis horizontal",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.46": "Grid Layout Axis vertical",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.6": "Horizontal layout none",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.31": "Vertical layout none",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.48": "Grid start axis horizontal none",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.85": "Grid start axis vertical none",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.6": "ScrollView with vertical  layout",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.40": "ScrollView with horizontal layout",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.74": "ScrollView with Grid Layout\nstart axis: horizontal ",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.144": "ScrollView with Grid Layout\nstart axis: vertical ",
      "cases/02_ui/06_layout/LayoutNone.fire.6": "Basic layout, Type: None\nResize container",
      "cases/02_ui/06_layout/LayoutNone.fire.35": "Horizontal layout None\nNo resize",
      "cases/02_ui/06_layout/LayoutNone.fire.60": "Vertical layout, Type: None\nNo resize",
      "cases/02_ui/06_layout/LayoutNone.fire.77": "Grid start axis: horizontal, Type: None\nNo resize",
      "cases/02_ui/06_layout/LayoutNone.fire.142": "Grid start axis: vertical, Type: None\nNo resize",
      "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.8": "x:0, y:0",
      "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.12": "x:480, y:320",
      "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.16": "x:960, y:640",
      "cases/02_ui/07_editBox/editbox.js.1": "Enter Text: ",
      "cases/02_ui/07_editBox/EditBox.fire.25": "Single Line Password:",
      "cases/02_ui/07_editBox/EditBox.fire.27": "Single Line Text:",
      "cases/02_ui/07_editBox/EditBox.fire.29": "Mutiple Line Text:",
      "cases/02_ui/07_editBox/EditBox.fire.32": "Click",
      "cases/02_ui/07_editBox/EditBox.fire.38": "Button must be on top of EditBox, \nand it should enable click.",
      "cases/02_ui/09_videoplayer/fullscreenVideo.fire": "When you touch the screen, video will be played. \n It will be removed when video complete.",
      "cases/02_ui/09_videoplayer/videoPlayer.nonsupport_fullscreen": "currect device does nonsupport fullscreen.",
      "cases/03_gameplay/01_player_control/EventManager/KeyboardInput.fire.6": "Press 'A' or 'D' to control sheep",
      "cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1": "touch (",
      "cases/03_gameplay/01_player_control/On/OnTouchInput.fire.10": "Try touching anywhere.",
      "cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.20": "The sample can only be effective on mobile platforms!",
      "cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.21": "Use your fingers to zoom image!",
      "cases/03_gameplay/01_player_control/On/DeviceMotion.fire.1": "Open Accelerometer",
      "cases/03_gameplay/01_player_control/On/DeviceMotion.fire.2": "Close Accelerometer",
      "cases/03_gameplay/02_actions/SimpleAction.fire.13": "This is Simple Action.",
      "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.14": "Label",
      "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.18": "This is Animate Custom Property.",
      "cases/03_gameplay/03_animation/AnimationEvent.fire.6": "Start the first animation",
      "cases/03_gameplay/03_animation/AnimationEvent.fire.14": "This is Animation Event.",
      "cases/03_gameplay/03_animation/AnimationEvent.js.1": "Start the",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.11": "Linear",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.17": "Case In Expo",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.23": "Case Out Expo",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.29": "Case Out In Expo",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.35": "Back Forward",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.41": "This is Move Animation.",
      "cases/03_gameplay/03_animation/SpriteAnimation.fire.9": "This is SprieFrame Animation.",
      "cases/03_gameplay/03_animation/CreateClip.fire.1": "Dynamic Creating AnimationClip",
      "cases/04_audio/SimpleAudio.fire.6": "Enjoy the music!",
      "cases/05_scripting/01_properties/NodeArray.fire.14": "This is Node Array.",
      "cases/05_scripting/01_properties/NonSerialized.fire.6": "Label",
      "cases/05_scripting/01_properties/NonSerialized.fire.8": "Label",
      "cases/05_scripting/01_properties/NonSerialized.fire.10": "This is Non Serialized.",
      "cases/05_scripting/01_properties/ReferenceType.fire.8": "Label",
      "cases/05_scripting/01_properties/ReferenceType.fire.11": "This example does not include the runtime demonstration",
      "cases/05_scripting/01_properties/ValueType.fire.6": "This example does not include the runtime demonstration",
      "cases/05_scripting/02_prefab/InstantiatePrefab.fire.7": "This is Instantiate Prefab.",
      "cases/05_scripting/03_events/EventInMask.fire.23": "Change order of nodes",
      "cases/05_scripting/03_events/SimpleEvent.fire.19": "Touch event can support click",
      "cases/05_scripting/03_events/SimpleEvent.fire.21": "Mouse event can support click, hover, wheel",
      "cases/05_scripting/03_events/SimpleEvent.fire.23": "Custom event can be triggered manually\n(Click button above)",
      "cases/05_scripting/03_events/SimpleEvent.fire.25": "This is Simple Event.",
      "cases/05_scripting/03_events/TouchPropagation.fire.15": "This is Touch Propagation.",
      "cases/05_scripting/03_events/MousePropagation.fire.1": "This is Mouse Propagation.",
      "cases/05_scripting/04_scheduler/scheduleCallbacks.js.1": "5.00 s",
      "cases/05_scripting/04_scheduler/scheduler.fire.9": "5.00 s",
      "cases/05_scripting/04_scheduler/scheduler.fire.12": "Repeat Schedule",
      "cases/05_scripting/04_scheduler/scheduler.fire.18": "Cancel Schedules",
      "cases/05_scripting/04_scheduler/scheduler.fire.24": "Schedule Once",
      "cases/05_scripting/04_scheduler/scheduler.fire.29": "Counter use update function to change string value each frame",
      "cases/05_scripting/04_scheduler/scheduler.fire.31": "This is Scheduler.",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.0": "Click button to start recursive tasks, you should see task2 invoked at last.",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.1": "Task1 invoked",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.2": "Task2 invoked",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.3": "Start tasks",
      "cases/05_scripting/05_cross_reference/CrossReference.fire.7": "Label",
      "cases/05_scripting/05_cross_reference/CrossReference.fire.12": "Label",
      "cases/05_scripting/05_cross_reference/CrossReference.fire.14": "This is Cross Reference.",
      "cases/05_scripting/06_life_cycle/life_cycle.fire.6": "This is Life cycle.",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.5": "Asset Loading",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.9": "Load SpriteFrame",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.15": "Load Texture",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.21": "Load Audio",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.27": "Load Txt",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.33": "Load Font",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.39": "Load Plist",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.45": "Load Prefab",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.51": "Load Scene",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.57": "Load Animation",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.59": "Load Spine",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.65": "Not currently loaded Entity.",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.1": "Loaded ",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.2": "Play ",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.3": "Create ",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.4": "Playing Music.",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.5": "This is Font!",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.7": "By Type",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.10": "Load SpriteFrame",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.17": "By Url",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.20": "Load Prefab",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.6": "LoadResDir",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.24": "Load All",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.30": "Load SpriteFrame All",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.36": "Clear All",
      "cases/05_scripting/08_module/load_module.fire.6": "Load Module",
      "cases/05_scripting/08_module/load_module.fire.10": "Create Monster",
      "cases/05_scripting/09_singleton/Singleton.fire.6": "This example does not include the runtime demonstration",
      "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1": "download complete!!",
      "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2": "dowloading: ",
      "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.3": "click anywhere to download...",
      "cases/05_scripting/10_loadingBar/loadingBar.fire.7": "Loading Completed",
      "cases/05_scripting/10_loadingBar/loadingBar.fire.18": "Dowloading",
      "cases/05_scripting/11_network/NetworkCtrl.js.1": "waiting...",
      "cases/05_scripting/11_network/NetworkCtrl.js.2": "waiting...",
      "cases/05_scripting/11_network/NetworkCtrl.js.3": "waiting...",
      "cases/05_scripting/11_network/NetworkCtrl.js.4": "waiting...",
      "cases/05_scripting/11_network/NetworkCtrl.js.5": "WebSocket\\nSend Binary WS was opened.",
      "cases/05_scripting/11_network/NetworkCtrl.js.6": "WebSocket\\nResponse get.",
      "cases/05_scripting/11_network/NetworkCtrl.js.7": "WebSocket\\nsendBinary Error was fired.",
      "cases/05_scripting/11_network/NetworkCtrl.js.8": "WebSocket\\nwebsocket instance closed.",
      "cases/05_scripting/11_network/NetworkCtrl.js.9": "WebSocket\\nSend Binary WS is waiting...",
      "cases/05_scripting/11_network/NetworkCtrl.js.10": "WebSocket\\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.11": "SocketIO\\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.12": "SocketIO\\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.13": "SocketIO\\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.14": "SocketIO\\n",
      "cases/05_scripting/11_network/network.fire.7": "Label",
      "cases/05_scripting/11_network/network.fire.6": "XMLHttpRequest",
      "cases/05_scripting/11_network/network.fire.11": "Label",
      "cases/05_scripting/11_network/network.fire.10": "XMLHttpRequest (ArrayBuffer)",
      "cases/05_scripting/11_network/network.fire.15": "Label",
      "cases/05_scripting/11_network/network.fire.14": "WebSocket",
      "cases/05_scripting/11_network/network.fire.19": "Label",
      "cases/05_scripting/11_network/network.fire.18": "SocketIO",
      "cases/05_scripting/11_network/download-web.fire.1.1": "Remote Audio DownLoad",
      "cases/05_scripting/11_network/download-web.fire.1.2": "Remote Picture DownLoad",
      "cases/05_scripting/11_network/download-web.fire.2": "Wait For DownLoading...",
      "cases/05_scripting/11_network/download-web.fire.3": "DownLoad Process\uff1a",
      "cases/05_scripting/11_network/download-web.fire.4.1": "Audio DownLoad Completed",
      "cases/05_scripting/11_network/download-web.fire.4.2": "Picture DownLoad Completed",
      "cases/05_scripting/11_network/download-web.fire.5.1": "Audio DownLoad Failed",
      "cases/05_scripting/11_network/download-web.fire.5.2": "Picture DownLoad Failed",
      "cases/05_scripting/11_network/download-web.fire.6": "Remote Url:",
      "cases/05_scripting/11_network/download-web.fire.7": "download",
      "cases/05_scripting/11_network/download-web.fire.8": "SlideToNext",
      "cases/05_scripting/11_network/download-web.fire.9": "SlideToPreview",
      "cases/05_scripting/11_network/download-web.fire.10": "Url Is Unavailable",
      "cases/native_call/native_call.fire.1": "JS to JAVA reflection only works Android mobile platform!",
      "cases/native_call/native_call.fire.2": "Click on the button calls the static method!",
      "cases/native_call/native_call.fire.3": "Click",
      "cases/collider/Category.fire.3": "Group: Collider",
      "cases/collider/Category.fire.5": "Group: Collider",
      "cases/collider/Category.fire.7": "Group: Collider",
      "cases/collider/Category.fire.9": "Group: Default",
      "cases/collider/Shape.fire.20": "Show Polygon",
      "cases/collider/Shape.fire.27": "Show Circle",
      "cases/collider/Shape.fire.34": "Show Box",
      "cases/collider/Shape.fire.43": "Show Polygon",
      "cases/collider/Shape.fire.50": "Show Circle",
      "cases/collider/Shape.fire.57": "Show Box",
      "cases/motionStreak/MotionStreak.fire.1": "Change MotionStreak",
      "cases/spine/SpineBoy.fire.11": "Debug Slots",
      "cases/spine/SpineBoy.fire.18": "Debug Bones",
      "cases/spine/SpineBoy.fire.25": "Time Scale",
      "cases/spine/SpineBoy.fire.36": "Stop",
      "cases/spine/SpineBoy.fire.43": "Walk",
      "cases/spine/SpineBoy.fire.50": "Run",
      "cases/spine/SpineBoy.fire.58": "Jump",
      "cases/spine/SpineBoy.fire.65": "Shoot",
      "cases/tiledmap/Puzzle.fire.18": "You Win",
      "cases/tiledmap/Puzzle.fire.21": "Restart",
      "cases/tiledmap/Dynamic-Tiledmap.fire.22": "Dynamically created TiledMap",
      "res/prefabs/ListItem.prefab.2": "Label ssss",
      "res/prefabs/Monster.prefab.3": "Name:",
      "res/prefabs/Monster.prefab.11": "Level :",
      "res/prefabs/Monster.prefab.19": "Hp :",
      "res/prefabs/Monster.prefab.27": "Attack :",
      "res/prefabs/Monster.prefab.35": "Defense :",
      "res/prefabs/loadItem.prefab.1": "Label",
      "resources/test_assets/prefab.prefab.2": "This is Prefab",
      "resources/test_assets/scene.fire.3": "Return Asset Loading Scene",
      "resources/test_assets/scene.fire.6": "Return",
      "scripts/Global/Menu.js.1": "Temporary lack of introduction",
      "cases/subpackage1": "Load First Subpackage",
      "cases/goSubpackage1": "Go to the first scene",
      "cases/goSubpackage1.failed": "Can not go to the first scene, Please load the First Subpackage",
      "cases/subpackage1.loaded": "First Subpackage is loaded",
      "cases/subpackage2": "Load Second Subpackage",
      "cases/goSubpackage2": "Go to the second scene",
      "cases/goSubpackage2.failed": "Can not go to the second scene, Please load the Second Subpackage",
      "cases/subpackage2.loaded": "First Subpackage is loaded",
      "cases/subpackage.complete": "Load the sub-package successfully, you can jump to the scene to view",
      "cases/subpackage.failed": "Failed to load the package, please check the console for details",
      "cases/subpackage.back": "Back",
      "scripts/AudioCtrl_Play": "Play",
      "scripts/AUdioCtrl_Stop": "Stop",
      "scripts/AUdioCtrl_Pause": "Pause",
      "scripts/AUdioCtrl_Resume": "Resume",
      "scripts/AUdioCtrl_StopAll": "StopAll",
      "scripts/AUdioCtrl_PauseAll": "PauseAll",
      "scripts/AUdioCtrl_ResumeAll": "ResumeAll",
      sprite_loadRes_asset_success: "Load Success",
      sprite_loadRes_asset_failed: "Load Failed"
    };
    cc._RF.pop();
  }, {} ],
  follow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d96400vNFFPIpzg48kPuXVc", "follow");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.node.active = !cc.sys.isMobile;
        if (!this.target) return;
        var follow = cc.follow(this.target, cc.rect(0, 0, 2e3, 2e3));
        this.node.runAction(follow);
      }
    });
    cc._RF.pop();
  }, {} ],
  i18n: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93789C/shtIL6entYsZPjee", "i18n");
    "use strict";
    var Polyglot = require("polyglot");
    var data = "zh" === cc.sys.language ? require("zh") : require("en");
    var polyglot = new Polyglot({
      phrases: data,
      allowMissing: true
    });
    module.exports = {
      init: function init(language) {
        lang = language;
        data = require("zh" === language ? "zh" : "en");
        polyglot.replace(data);
      },
      t: function t(key, opt) {
        return polyglot.t(key, opt);
      }
    };
    cc._RF.pop();
  }, {
    en: "en",
    polyglot: "polyglot",
    zh: "zh"
  } ],
  lineTo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ed7bVI5mxF+I75PHb0k24q", "lineTo");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var g = this.getComponent(cc.Graphics);
        g.lineWidth = 10;
        g.fillColor.fromHEX("#ff0000");
        g.moveTo(-20, 0);
        g.lineTo(0, -100);
        g.lineTo(20, 0);
        g.lineTo(0, 100);
        g.close();
        g.stroke();
        g.fill();
      }
    });
    cc._RF.pop();
  }, {} ],
  linejoin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23e05St68tC7aM880aEaUaS", "linejoin");
    "use strict";
    var LineJoin = cc.Graphics.LineJoin;
    var LineCap = cc.Graphics.LineCap;
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        this.graphics = this.getComponent(cc.Graphics);
        this.graphics.lineWidth = 20;
        this.time = 0;
        this.radius = 100;
        this.draw();
      },
      update: function update(dt) {
        this.time += .5 * dt;
        this.draw();
      },
      draw: function draw() {
        var graphics = this.graphics;
        graphics.clear();
        var rx = this.radius * Math.sin(this.time);
        var ry = -this.radius * Math.cos(this.time);
        graphics.lineCap = LineCap.BUTT;
        graphics.lineJoin = LineJoin.BEVEL;
        this.drawLine(-200, 0, rx, ry);
        graphics.lineJoin = LineJoin.MITER;
        this.drawLine(0, 0, rx, ry);
        graphics.lineJoin = LineJoin.ROUND;
        this.drawLine(200, 0, rx, ry);
        graphics.lineJoin = LineJoin.MITER;
        graphics.lineCap = LineCap.BUTT;
        this.drawLine(0, -125, rx, ry);
        graphics.lineCap = LineCap.SQUARE;
        this.drawLine(-200, -125, rx, ry);
        graphics.lineCap = LineCap.ROUND;
        this.drawLine(200, -125, rx, ry);
      },
      drawLine: function drawLine(x, y, rx, ry) {
        var graphics = this.graphics;
        graphics.moveTo(x + rx, y + ry);
        graphics.lineTo(x, y);
        graphics.lineTo(x - rx, y + ry);
        graphics.stroke();
      }
    });
    cc._RF.pop();
  }, {} ],
  "load-subpackage": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9221ffOiRZCRqhxaYTw/z7u", "load-subpackage");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tips: require("LabelLocalized")
      },
      onLoadSubpackageCallback: function onLoadSubpackageCallback(err) {
        if (err) {
          console.error(err);
          this.tips.textKey = "cases/subpackage.failed";
          return;
        }
        this.tips.textKey = "cases/subpackage.complete";
      },
      loadSubpackage1: function loadSubpackage1() {
        cc.loader.downloader.loadSubpackage("First", this.onLoadSubpackageCallback.bind(this));
      },
      loadSubpackage2: function loadSubpackage2() {
        cc.loader.downloader.loadSubpackage("Second", this.onLoadSubpackageCallback.bind(this));
      },
      goSubpackage1: function goSubpackage1() {
        var _this = this;
        cc.director.loadScene("sub-first", function(err) {
          err && (_this.tips.textKey = "cases/goSubpackage1.failed");
        });
      },
      goSubpackage2: function goSubpackage2() {
        var _this2 = this;
        cc.director.loadScene("sub-second", function(err) {
          err && (_this2.tips.textKey = "cases/goSubpackage2.failed");
        });
      }
    });
    cc._RF.pop();
  }, {
    LabelLocalized: "LabelLocalized"
  } ],
  loadDragonBonesCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9c63c/3U5Gv7w0rm3g5wvj", "loadDragonBonesCtrl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        dragonBone: {
          default: null,
          type: dragonBones.ArmatureDisplay
        }
      },
      dynamicCreate: function dynamicCreate() {
        var _this = this;
        if (this.dragonBone.dragonAtlasAsset) return;
        cc.loader.loadRes("dragonBones/NewDragonTest", dragonBones.DragonBonesAsset, function(err, res) {
          err && cc.error(err);
          _this.dragonBone.dragonAsset = res;
          cc.loader.loadRes("dragonBones/texture", dragonBones.DragonBonesAtlasAsset, _this.onComplete.bind(_this));
        });
      },
      onComplete: function onComplete(err, res) {
        err && cc.error(err);
        this.dragonBone.dragonAtlasAsset = res;
        this.dragonBone.armatureName = "armatureName";
        this.dragonBone.playAnimation("stand", 0);
      }
    });
    cc._RF.pop();
  }, {} ],
  loadResDir_example: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fee3dcLoaZCvrJ9FZrBngbb", "loadResDir_example");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnClearAll: cc.Node,
        label: cc.Prefab,
        scrollView: cc.ScrollView
      },
      _init: function _init() {
        this._assets = [];
        this._hasLoading = false;
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
      },
      onLoad: function onLoad() {
        this._init();
      },
      _createLabel: function _createLabel(text) {
        var node = cc.instantiate(this.label);
        var label = node.getComponent(cc.Label);
        label.textKey = text;
        this.scrollView.content.addChild(node);
      },
      _clear: function _clear() {
        this.scrollView.content.removeAllChildren(true);
        for (var i = 0; i < this._assets.length; ++i) {
          var asset = this._assets[i];
          var deps = cc.loader.getDependsRecursively(asset);
          cc.loader.release(deps);
        }
      },
      onClearAll: function onClearAll() {
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
        this._clear();
      },
      onLoadAll: function onLoadAll() {
        var _this = this;
        if (this._hasLoading) return;
        this._hasLoading = true;
        this._clear();
        this._createLabel("Load All Assets");
        this.scrollView.scrollToTop();
        this.btnClearAll.active = false;
        cc.loader.loadResDir("test_assets", function(err, assets) {
          if (!_this.isValid) return;
          _this._assets = assets;
          for (var i = 0; i < assets.length; ++i) {
            var asset = assets[i];
            var info = asset.toString();
            info || (info = asset instanceof cc.JsonAsset ? JSON.stringify(asset.json, null, 4) : info || asset.name || cc.js.getClassName(asset));
            _this._createLabel(info);
          }
          _this._hasLoading = false;
          _this.btnClearAll.active = true;
        });
      },
      onLoadSpriteFrameAll: function onLoadSpriteFrameAll() {
        var _this2 = this;
        if (this._hasLoading) return;
        this._hasLoading = true;
        this._clear();
        this._createLabel("Load All Sprite Frame");
        this.scrollView.scrollToTop();
        this.btnClearAll.active = false;
        cc.loader.loadResDir("test_assets", cc.SpriteFrame, function(err, assets) {
          if (!_this2.isValid) return;
          _this2._assets = assets;
          for (var i = 0; i < assets.length; ++i) {
            var asset = assets[i];
            _this2._createLabel(asset.name);
          }
          _this2._hasLoading = false;
          _this2.btnClearAll.active = true;
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  "mesh-texture": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95a3dIihBlE1bM4psBuANTA", "mesh-texture");
    "use strict";
    var gfx = cc.gfx;
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true
      },
      properties: {
        speed: 50
      },
      start: function start() {
        var vfmt = new gfx.VertexFormat([ {
          name: gfx.ATTR_POSITION,
          type: gfx.ATTR_TYPE_FLOAT32,
          num: 2
        }, {
          name: gfx.ATTR_UV0,
          type: gfx.ATTR_TYPE_FLOAT32,
          num: 2
        } ]);
        var mesh = new cc.Mesh();
        mesh.init(vfmt, 9, true);
        this.mesh = mesh;
        this.vertexes = [ cc.v2(-100, 100), cc.v2(0, 100), cc.v2(100, 100), cc.v2(-100, 0), cc.v2(0, 0), cc.v2(100, 0), cc.v2(-100, -100), cc.v2(0, -100), cc.v2(100, -100) ];
        mesh.setVertices(gfx.ATTR_POSITION, this.vertexes);
        mesh.setVertices(gfx.ATTR_UV0, [ cc.v2(0, 0), cc.v2(.5, 0), cc.v2(1, 0), cc.v2(0, .5), cc.v2(.5, .5), cc.v2(1, .5), cc.v2(0, 1), cc.v2(.5, 1), cc.v2(1, 1) ]);
        mesh.setIndices([ 0, 1, 3, 1, 4, 3, 1, 2, 4, 2, 5, 4, 3, 4, 6, 4, 7, 6, 4, 5, 7, 5, 8, 7 ]);
        var renderer = this.node.getComponent(cc.MeshRenderer);
        renderer || (renderer = this.node.addComponent(cc.MeshRenderer));
        renderer.mesh = mesh;
        this.mesh = mesh;
      },
      update: function update(dt) {
        false;
        var lm = this.vertexes[3];
        var rm = this.vertexes[5];
        (lm.x < -200 && this.speed < 0 || lm.x > 0 && this.speed > 0) && (this.speed *= -1);
        lm.x += dt * this.speed;
        rm.x += -dt * this.speed;
        this.mesh.setVertices(gfx.ATTR_POSITION, this.vertexes);
      }
    });
    cc._RF.pop();
  }, {} ],
  mesh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85b7cwUbltFwab1+S5HCilZ", "mesh");
    "use strict";
    var chroma = require("chroma");
    var gfx = cc.gfx;
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true
      },
      properties: {},
      start: function start() {
        this.lighten = 0;
        this.lightenDirection = 1;
        this.c1 = cc.color();
        this.c2 = cc.color();
        var vfmtPosColor = new gfx.VertexFormat([ {
          name: gfx.ATTR_POSITION,
          type: gfx.ATTR_TYPE_FLOAT32,
          num: 3
        }, {
          name: gfx.ATTR_COLOR,
          type: gfx.ATTR_TYPE_UINT8,
          num: 4,
          normalize: true
        } ]);
        var mesh = new cc.Mesh();
        mesh.init(vfmtPosColor, 8, true);
        this.mesh = mesh;
        mesh.setVertices(gfx.ATTR_POSITION, [ cc.v3(-100, 100, 100), cc.v3(-100, -100, 100), cc.v3(100, 100, 100), cc.v3(100, -100, 100), cc.v3(-100, 100, -100), cc.v3(-100, -100, -100), cc.v3(100, 100, -100), cc.v3(100, -100, -100) ]);
        mesh._minPos = cc.v3(-100, -100, -100);
        mesh._maxPos = cc.v3(100, 100, 100);
        this.updateColor(cc.Color.RED, cc.Color.BLUE);
        mesh.setIndices([ 0, 1, 2, 1, 3, 2, 0, 6, 4, 0, 2, 6, 2, 7, 6, 2, 3, 7, 0, 5, 4, 0, 1, 5, 1, 7, 5, 1, 3, 7, 4, 5, 6, 5, 7, 6 ]);
        var renderer = this.node.getComponent(cc.MeshRenderer);
        renderer || (renderer = this.node.addComponent(cc.MeshRenderer));
        renderer.mesh = mesh;
      },
      updateColor: function updateColor(c1, c2) {
        this.mesh.setVertices(gfx.ATTR_COLOR, [ c1, c1, c1, c1, c2, c2, c2, c2 ]);
      },
      update: function update(dt) {
        false;
        var c1 = chroma.hsl(330, 1, this.lighten);
        var c2 = chroma.hsl(100, 1, 1 - this.lighten);
        this.lighten += .1 * dt * this.lightenDirection;
        (this.lighten > 1 && this.lightenDirection > 0 || this.lighten < 0 && this.lightenDirection < 0) && (this.lightenDirection *= -1);
        this.c1.fromHEX(c1.toString());
        this.c2.fromHEX(c2.toString());
        this.updateColor(this.c1, this.c2);
      }
    });
    cc._RF.pop();
  }, {
    chroma: "chroma"
  } ],
  "moving-objects": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d056HwAmhA7ZTa6tqf8K23", "moving-objects");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tempPrefab: {
          default: null,
          type: cc.Node
        },
        camera: {
          default: null,
          type: cc.Node
        },
        root: {
          default: null,
          type: cc.Node
        },
        moveSpeed: 100,
        nodeCount: 2e3,
        _useCamera: true,
        useCamera: {
          get: function get() {
            return this._useCamera;
          },
          set: function set(v) {
            if (this._useCamera === v) return;
            this._useCamera = v;
            if (true, this.movingNode) {
              this.movingNode = v ? this.camera : this.root;
              this.camera.x = this.root.x = 0;
              this.moveSpeed = -this.moveSpeed;
            }
          }
        },
        _enableCulling: true,
        enableCulling: {
          get: function get() {
            return this._enableCulling;
          },
          set: function set(v) {
            this._enableCulling = v;
            this.setMacroCulling(v);
          }
        }
      },
      onEnable: function onEnable() {
        this._originEnableCulling = cc.macro.ENABLE_CULLING;
      },
      onDisable: function onDisable() {
        this.setMacroCulling(this._originEnableCulling);
      },
      onLoad: function onLoad() {
        for (var i = 0; i < this.nodeCount; i++) {
          var node = cc.instantiate(this.tempPrefab);
          node.x = 960 * (Math.random() - .5);
          node.y = 640 * (Math.random() - .5);
          node.parent = this.root;
        }
        this.movingNode = this._useCamera ? this.camera : this.root;
        this.setMacroCulling(this._enableCulling);
      },
      setMacroCulling: function setMacroCulling(enable) {
        if (cc.macro.ENABLE_CULLING === enable || false) return;
        cc.macro.ENABLE_CULLING = enable;
        cc.renderer.childrenOrderDirty = true;
      },
      update: function update(dt) {
        this.movingNode.x += this.moveSpeed * dt;
        (this.moveSpeed > 0 && this.movingNode.x > 900 || this.moveSpeed < 0 && this.movingNode.x < -900) && (this.moveSpeed *= -1);
      },
      useCameraChanged: function useCameraChanged(toggle) {
        this.useCamera = toggle.isChecked;
        this.root.group = this.useCamera ? "Actor" : "Default";
      },
      enableCullingChanged: function enableCullingChanged(toggle) {
        this.enableCulling = toggle.isChecked;
      }
    });
    cc._RF.pop();
  }, {} ],
  polyglot: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "69decSgpRlE1rzEKp0RzG3V", "polyglot");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(root, factory) {
        "function" === typeof define && define.amd ? define([], function() {
          return factory(root);
        }) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = factory(root) : root.Polyglot = factory(root);
      })("undefined" !== typeof global ? global : void 0, function(root) {
        var replace = String.prototype.replace;
        function Polyglot(options) {
          options = options || {};
          this.phrases = {};
          this.extend(options.phrases || {});
          this.currentLocale = options.locale || "en";
          this.allowMissing = !!options.allowMissing;
          this.warn = options.warn || warn;
        }
        Polyglot.VERSION = "1.0.0";
        Polyglot.prototype.locale = function(newLocale) {
          newLocale && (this.currentLocale = newLocale);
          return this.currentLocale;
        };
        Polyglot.prototype.extend = function(morePhrases, prefix) {
          var phrase;
          for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.extend(phrase, key) : this.phrases[key] = phrase;
          }
        };
        Polyglot.prototype.unset = function(morePhrases, prefix) {
          var phrase;
          if ("string" === typeof morePhrases) delete this.phrases[morePhrases]; else for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.unset(phrase, key) : delete this.phrases[key];
          }
        };
        Polyglot.prototype.clear = function() {
          this.phrases = {};
        };
        Polyglot.prototype.replace = function(newPhrases) {
          this.clear();
          this.extend(newPhrases);
        };
        Polyglot.prototype.t = function(key, options) {
          var phrase, result;
          options = null == options ? {} : options;
          "number" === typeof options && (options = {
            smart_count: options
          });
          if ("string" === typeof this.phrases[key]) phrase = this.phrases[key]; else if ("string" === typeof options._) phrase = options._; else if (this.allowMissing) phrase = key; else {
            this.warn('Missing translation for key: "' + key + '"');
            result = key;
          }
          if ("string" === typeof phrase) {
            options = clone(options);
            result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
            result = interpolate(result, options);
          }
          return result;
        };
        Polyglot.prototype.has = function(key) {
          return key in this.phrases;
        };
        var delimeter = "||||";
        var pluralTypes = {
          chinese: function chinese(n) {
            return 0;
          },
          german: function german(n) {
            return 1 !== n ? 1 : 0;
          },
          french: function french(n) {
            return n > 1 ? 1 : 0;
          },
          russian: function russian(n) {
            return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          czech: function czech(n) {
            return 1 === n ? 0 : n >= 2 && n <= 4 ? 1 : 2;
          },
          polish: function polish(n) {
            return 1 === n ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          icelandic: function icelandic(n) {
            return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
          }
        };
        var pluralTypeToLanguages = {
          chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
          german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
          french: [ "fr", "tl", "pt-br" ],
          russian: [ "hr", "ru" ],
          czech: [ "cs", "sk" ],
          polish: [ "pl" ],
          icelandic: [ "is" ]
        };
        function langToTypeMap(mapping) {
          var type, langs, l, ret = {};
          for (type in mapping) if (mapping.hasOwnProperty(type)) {
            langs = mapping[type];
            for (l in langs) ret[langs[l]] = type;
          }
          return ret;
        }
        var trimRe = /^\s+|\s+$/g;
        function trim(str) {
          return replace.call(str, trimRe, "");
        }
        function choosePluralForm(text, locale, count) {
          var ret, texts, chosenText;
          if (null != count && text) {
            texts = text.split(delimeter);
            chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
            ret = trim(chosenText);
          } else ret = text;
          return ret;
        }
        function pluralTypeName(locale) {
          var langToPluralType = langToTypeMap(pluralTypeToLanguages);
          return langToPluralType[locale] || langToPluralType.en;
        }
        function pluralTypeIndex(locale, count) {
          return pluralTypes[pluralTypeName(locale)](count);
        }
        var dollarRegex = /\$/g;
        var dollarBillsYall = "$$$$";
        function interpolate(phrase, options) {
          for (var arg in options) if ("_" !== arg && options.hasOwnProperty(arg)) {
            var replacement = options[arg];
            "string" === typeof replacement && (replacement = replace.call(options[arg], dollarRegex, dollarBillsYall));
            phrase = replace.call(phrase, new RegExp("%\\{" + arg + "\\}", "g"), replacement);
          }
          return phrase;
        }
        function warn(message) {
          root.console && root.console.warn && root.console.warn("WARNING: " + message);
        }
        function clone(source) {
          var ret = {};
          for (var prop in source) ret[prop] = source[prop];
          return ret;
        }
        return Polyglot;
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  raycast: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99487EWEA1JVpLMAPptRiG6", "raycast");
    "use strict";
    var WHITE = cc.Color.WHITE;
    cc.Class({
      extends: cc.Component,
      properties: {
        mesh: cc.Node
      },
      start: function start() {
        var canvas = cc.find("Canvas");
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.touchPos = null;
        this.results = [];
      },
      onTouchStart: function onTouchStart(event) {
        this.touchPos = event.touch.getLocation();
      },
      onTouchMove: function onTouchMove(event) {
        this.touchPos = event.touch.getLocation();
      },
      onTouchEnd: function onTouchEnd(event) {
        this.touchPos = null;
      },
      raycast: function raycast(pos) {
        var ray = cc.Camera.main.getRay(pos);
        return cc.geomUtils.intersect.raycast(this.node, ray);
      },
      update: function update(dt) {
        for (var i = 0; i < this.results.length; i++) this.results[i].node.opacity = 255;
        this.results.length = 0;
        if (!this.touchPos) return;
        var ray = cc.Camera.main.getRay(this.touchPos);
        var results = cc.geomUtils.intersect.raycast(this.node, ray);
        if (results.length > 0) {
          var distance = results[0].distance;
          var d = cc.vmath.vec3.normalize(cc.v3(), ray.d);
          var p = cc.vmath.vec3.scaleAndAdd(cc.v3(), ray.o, d, distance);
          this.mesh.position = p;
        }
        this.results = results;
      }
    });
    cc._RF.pop();
  }, {} ],
  rect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a7cahCMIJCaZpdzIZPkHsp", "rect");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        var g = this.getComponent(cc.Graphics);
        g.lineWidth = 10;
        g.fillColor.fromHEX("#ff0000");
        g.rect(-250, 0, 200, 100);
        g.roundRect(50, 0, 200, 100, 20);
        g.stroke();
        g.fill();
      }
    });
    cc._RF.pop();
  }, {} ],
  recursiveTask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1bdf4Sc2zlNZI/eLikUgkJ3", "recursiveTask");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: require("LabelLocalized")
      },
      run: function run() {
        this.schedule(this.task1, 1, 0, 1);
      },
      task1: function task1() {
        this.unschedule(this.task1);
        this.label.textKey = "cases/05_scripting/04_scheduler/recursiveScheduler.fire.1";
        this.schedule(this.task2, 1, 0, 1);
      },
      task2: function task2() {
        this.label.textKey = "cases/05_scripting/04_scheduler/recursiveScheduler.fire.2";
      }
    });
    cc._RF.pop();
  }, {
    LabelLocalized: "LabelLocalized"
  } ],
  rotate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b8182lpDXBKXKHB4KDgd7AY", "rotate");
    "use strict";
    cc.Class({
      extends: cc.Component,
      update: function update() {
        this.node.eulerAngles = cc.v3(0, Date.now() / 10, 0);
      }
    });
    cc._RF.pop();
  }, {} ],
  scheduleCallbacks: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "930deImxoZIkp6ugjMU5ULW", "scheduleCallbacks");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        time: {
          default: 5
        },
        counter: cc.Label
      },
      _callback: function _callback() {
        this.node.stopAllActions();
        this.node.runAction(this.seq);
        this.repeat ? this.counting = true : this.counting = false;
        this.time = 5;
        this.counter.string = this.time.toFixed(2) + " s";
      },
      onLoad: function onLoad() {
        var squashAction = cc.scaleTo(.2, 1, .6);
        var stretchAction = cc.scaleTo(.2, 1, 1.2);
        var scaleBackAction = cc.scaleTo(.1, 1, 1);
        var moveUpAction = cc.moveBy(1, cc.v2(0, 100)).easing(cc.easeCubicActionOut());
        var moveDownAction = cc.moveBy(1, cc.v2(0, -100)).easing(cc.easeCubicActionIn());
        this.seq = cc.sequence(squashAction, stretchAction, moveUpAction, scaleBackAction, moveDownAction, squashAction, scaleBackAction);
        this.counter.string = this.time.toFixed(2) + " s";
        this.counting = false;
        this.repeat = false;
      },
      update: function update(dt) {
        if (this.counting) {
          this.time -= dt;
          this.counter.string = this.time.toFixed(2) + " s";
        }
      },
      stopCounting: function stopCounting() {
        this.unscheduleAllCallbacks();
        this.counting = false;
        this.time = 5;
        this.counter.string = this.time.toFixed(2) + " s";
      },
      repeatSchedule: function repeatSchedule() {
        this.stopCounting();
        this.schedule(this._callback, 5);
        this.repeat = true;
        this.counting = true;
      },
      oneSchedule: function oneSchedule() {
        this.stopCounting();
        this.scheduleOnce(this._callback, 5);
        this.repeat = false;
        this.counting = true;
      },
      cancelSchedules: function cancelSchedules() {
        this.repeat = false;
        this.stopCounting();
      }
    });
    cc._RF.pop();
  }, {} ],
  "sine-waves": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65147r484dHPoeDmtu3n5DT", "sine-waves");
    "use strict";
    var PI180 = Math.PI / 180;
    var PI2 = 2 * Math.PI;
    var HALFPI = Math.PI / 2;
    var Ease = {};
    Ease.linear = function(percent, amplitude) {
      return amplitude;
    };
    Ease.sinein = function(percent, amplitude) {
      return amplitude * (Math.sin(percent * Math.PI - HALFPI) + 1) * .5;
    };
    Ease.sineout = function(percent, amplitude) {
      return amplitude * (Math.sin(percent * Math.PI + HALFPI) + 1) * .5;
    };
    Ease.sineinout = function(percent, amplitude) {
      return amplitude * (Math.sin(percent * PI2 - HALFPI) + 1) * .5;
    };
    var EaseEnumOptins = {};
    for (var k in Ease) EaseEnumOptins[k] = -1;
    Ease.Enum = cc.Enum(EaseEnumOptins);
    var Waves = {};
    Waves.sine = function(x) {
      return Math.sin(x);
    };
    Waves.sign = function(x) {
      x = +x;
      if (0 === x || isNaN(x)) return x;
      return x > 0 ? 1 : -1;
    };
    Waves.square = function(x) {
      return Waves.sign(Math.sin(x * PI2));
    };
    Waves.sawtooth = function(x) {
      return 2 * (x - Math.floor(x + .5));
    };
    Waves.triangle = function(x) {
      return Math.abs(Waves.sawtooth(x));
    };
    var WavesEnumOptins = {};
    for (var _k in Waves) WavesEnumOptins[_k] = -1;
    Waves.Enum = cc.Enum(WavesEnumOptins);
    var Wave = cc.Class({
      name: "Wave",
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
    var SineWaves = cc.Class({
      extends: cc.Component,
      properties: {
        speed: 1,
        waves: {
          default: function _default() {
            return [ new Wave() ];
          },
          type: [ Wave ]
        }
      },
      onLoad: function onLoad() {
        this.time = 0;
        this.ctx = this.getComponent(cc.Graphics);
        this.ctx.lineCap = cc.Graphics.LineCap.BUTT;
        this.ctx.lineJoin = cc.Graphics.LineJoin.ROUND;
        var waves = this.waves;
        for (var i = 0, l = waves.length; i < l; i++) {
          waves[i].waveFn = Waves[Waves.Enum[waves[i].waveType]].bind(Waves);
          waves[i].easeFn = Ease[Ease.Enum[waves[i].easeType]].bind(Ease);
        }
      },
      update: function update(dt) {
        this.ctx.clear();
        this.yAxis = cc.visibleRect.height / 2;
        this.width = cc.visibleRect.width;
        this.waveWidth = .95 * this.width;
        this.waveLeft = .25 * this.width;
        this.time += dt;
        var waves = this.waves;
        for (var i = 0, l = waves.length; i < l; i++) {
          var timeModifier = this.waves[i].timeModifier || 1;
          this.drawWave(this.time * timeModifier, waves[i]);
        }
      },
      drawWave: function drawWave(time, options) {
        this.ctx.lineWidth = options.lineWidth;
        this.ctx.strokeColor = options.strokeColor;
        this.ctx.moveTo(0, this.yAxis);
        this.ctx.lineTo(this.waveLeft, this.yAxis);
        for (var i = 0; i < this.waveWidth; i += options.segmentLength) {
          var point = this.getPoint(time, i, options);
          this.ctx.lineTo(point.x, point.y);
        }
        this.ctx.lineTo(this.width, this.yAxis);
        this.ctx.stroke();
      },
      getPoint: function getPoint(time, position, options) {
        var x = time * this.speed + (-this.yAxis + position) / options.wavelength;
        var y = options.waveFn(x);
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
    cc._RF.pop();
  }, {} ],
  textureRenderUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a886773x+pEaJGtwGtEiE9q", "textureRenderUtils");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        camera: cc.Camera,
        label: cc.Label,
        _canvas: null
      },
      init: function init() {
        this.label.string = "";
        var texture = new cc.RenderTexture();
        var gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = texture;
        this.texture = texture;
      },
      initImage: function initImage() {
        var dataURL = this._canvas.toDataURL("image/png");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
      },
      createSprite: function createSprite() {
        var width = this.texture.width;
        var height = this.texture.height;
        if (this._canvas) this.clearCanvas(); else {
          this._canvas = document.createElement("canvas");
          this._canvas.width = width;
          this._canvas.height = height;
        }
        var ctx = this._canvas.getContext("2d");
        this.camera.render();
        var data = this.texture.readPixels();
        var rowBytes = 4 * width;
        for (var row = 0; row < height; row++) {
          var srow = height - 1 - row;
          var imageData = ctx.createImageData(width, 1);
          var start = srow * width * 4;
          for (var i = 0; i < rowBytes; i++) imageData.data[i] = data[start + i];
          ctx.putImageData(imageData, 0, row);
        }
        return this._canvas;
      },
      showSprite: function showSprite(img) {
        var _this = this;
        var texture = new cc.Texture2D();
        texture.initWithElement(img);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, function() {
          node.parent = null;
          _this.label.string = "";
          node.destroy();
        });
        this.captureAction(node, width, height);
      },
      captureAction: function captureAction(capture, width, height) {
        var scaleAction = cc.scaleTo(1, .3);
        var targetPos = cc.v2(width - width / 6, height / 4);
        var moveAction = cc.moveTo(1, targetPos);
        var spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        var blinkAction = cc.blink(.1, 1);
        this.node.runAction(blinkAction);
      },
      clearCanvas: function clearCanvas() {
        var ctx = this._canvas.getContext("2d");
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
    });
    cc._RF.pop();
  }, {} ],
  "tween-demo": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ad8dW61zxGsrp51I5maibs", "tween-demo");
    "use strict";
    var t = cc.tween;
    cc.Class({
      extends: cc.Component,
      properties: {
        nodes: [ cc.Node ]
      },
      start: function start() {
        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          t(node).delay(.5 + .2 * i).repeat(1e3, t().set({
            opacity: 0,
            scale: 10,
            x: 0,
            rotation: 0
          }).parallel(t().to(1, {
            opacity: 255,
            scale: 1
          }, {
            easing: "quintInOut"
          }), t().to(2.5, {
            x: node.x
          }, {
            easing: "backOut"
          })).delay(.5).to(.8, {
            rotation: 360
          }, {
            easing: "cubicInOut"
          }).delay(1).to(.3, {
            opacity: 0,
            scale: 3
          }, {
            easing: "quintIn"
          }).delay(1)).start();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87f1fs0gohHDIfNg4aePXbt", "zh");
    "use strict";
    module.exports = {
      example_case_tips_content: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301\u5f53\u524d\u5e73\u53f0",
      example_case_nonsupport_native_desktop_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301 Mac \u5e73\u53f0\u548c Windows \u5e73\u53f0",
      example_case_nonsupport_runtime_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301 Runtime \u5e73\u53f0",
      example_case_nonsupport_mobile_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301\u79fb\u52a8\u5e73\u53f0",
      example_case_nonsupport_web_canvas_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301 Canvas \u6a21\u5f0f",
      example_case_nonsupport_wechat_game_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301 wechatGame \u5e73\u53f0",
      example_case_support_webGl_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u53ea\u652f\u6301 WebGL \u6a21\u5f0f",
      example_case_support_mobile_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u53ea\u652f\u6301\u79fb\u52a8\u5e73\u53f0",
      example_case_support_mobile_android_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u53ea\u652f\u6301 Android \u79fb\u52a8\u5e73\u53f0",
      example_case_support_native_chrome_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u53ea\u652f\u6301 PC \u5e73\u53f0\u4e0a\u7684 Chrome \u6d4f\u89c8\u5668",
      example_case_support_native_desktop_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u53ea\u652f\u6301 Mac \u5e73\u53f0\u548c Windows \u5e73\u53f0",
      example_case_support_wechat_game_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u652f\u6301 wechatGame \u5e73\u53f0",
      example_case_nonsupport_qqplay_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301 QQplay \u5e73\u53f0",
      example_case_nonsupport_Wechatgame_tips: "\u8be5\u6d4b\u8bd5\u7528\u4f8b\u4e0d\u652f\u6301 Wechatgame \u5e73\u53f0",
      "cases/01_graphics/01_sprite/AtlasSprite.fire.7": "\u8fd9\u4e2a\u7cbe\u7075\u6765\u81ea\u5355\u5f20\u56fe\u7247",
      "cases/01_graphics/01_sprite/AtlasSprite.fire.11": "\u8fd9\u4e2a\u7cbe\u7075\u6765\u81ea\u56fe\u96c6",
      "cases/01_graphics/01_sprite/FilledSprite.fire.9": "\u586b\u5145\u7c7b\u578b\uff1a\u6c34\u5e73",
      "cases/01_graphics/01_sprite/FilledSprite.fire.15": "\u586b\u5145\u7c7b\u578b\uff1a\u5782\u76f4",
      "cases/01_graphics/01_sprite/FilledSprite.fire.23": "\u586b\u5145\u7c7b\u578b\uff1a\u5706\u5f62",
      "cases/01_graphics/01_sprite/SimpleSprite.fire.7": "\u8fd9\u662f\u666e\u901a\u7cbe\u7075",
      "cases/01_graphics/01_sprite/SlicedSprite.fire.7": "\u8fd9\u662f\u4e5d\u5bab\u683c\u7cbe\u7075",
      "cases/01_graphics/01_sprite/TiledSprite.fire.6": "\u8fd9\u662f\u5e73\u94fa\u7cbe\u7075",
      "cases/01_graphics/01_sprite/ChangeColor.fire.1": "\u6539\u53d8\u989c\u8272 Draw Call \u7684\u503c\u4e0d\u53d1\u751f\u6539\u53d8",
      "cases/01_graphics/01_sprite/TrimmedSprite.fire.7": "\u81ea\u52a8\u526a\u88c1 ",
      "cases/01_graphics/01_sprite/TrimmedSprite.fire.12": "\u672a\u81ea\u52a8\u526a\u88c1",
      "cases/01_graphics/02_particle/AutoRemoveParticle.fire.9": '\u7c92\u5b50 1\n"\u5b8c\u6210\u65f6\u81ea\u52a8\u79fb\u9664" \u7981\u6b62',
      "cases/01_graphics/02_particle/AutoRemoveParticle.fire.13": '\u7c92\u5b50 2\n"\u5b8c\u6210\u65f6\u81ea\u52a8\u79fb\u9664" \u5f00\u542f',
      "cases/01_graphics/02_particle/ToggleParticle.fire.6": '\u6309 "\u6309\u94ae" \u8fdb\u884c\u5f00\u5173\u7c92\u5b50\u64ad\u653e',
      "cases/02_ui/01_widget/AdvancedWidget.fire.7": "\u5de6\u4e0a",
      "cases/02_ui/01_widget/AdvancedWidget.fire.9": "top: 10% left: 6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.14": "\u4e0a",
      "cases/02_ui/01_widget/AdvancedWidget.fire.16": "top: -34px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.21": "\u53f3\u4e0a",
      "cases/02_ui/01_widget/AdvancedWidget.fire.23": "top: 10% right: 6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.28": "\u5de6",
      "cases/02_ui/01_widget/AdvancedWidget.fire.30": "left: -50px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.35": "\u53f3",
      "cases/02_ui/01_widget/AdvancedWidget.fire.37": "right: -50px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.42": "\u5de6\u4e0b",
      "cases/02_ui/01_widget/AdvancedWidget.fire.44": "bottom: 10% left: 6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.49": "\u4e0b",
      "cases/02_ui/01_widget/AdvancedWidget.fire.51": "bottom: -34px",
      "cases/02_ui/01_widget/AdvancedWidget.fire.56": "\u53f3\u4e0b",
      "cases/02_ui/01_widget/AdvancedWidget.fire.58": "bottom:10% right:6%",
      "cases/02_ui/01_widget/AdvancedWidget.fire.63": "\u9ad8\u7ea7\u6302\u4ef6",
      "cases/02_ui/01_widget/AlignOnceWidget.fire.1": "AlignOne \u4e3a false \u65f6\uff0c\u4f1a\u4e00\u76f4\u4fdd\u6301\u5bf9\u9f50",
      "cases/02_ui/01_widget/AlignOnceWidget.fire.2": "AlignOne \u4e3a true \u65f6\uff0c\u53ea\u5728 Widget \u751f\u6548\u65f6\u5bf9\u9f50\u4e00\u6b21",
      "cases/02_ui/01_widget/AnimatedWidget.fire.9": "\u52a8\u753b\u6302\u4ef6\u3002",
      "cases/02_ui/01_widget/WidgetAlign.fire.18": "\u6302\u4ef6\u5bf9\u9f50\u65b9\u5f0f\u3002",
      "cases/02_ui/01_widget/AutoResize.fire.13": "\u6302\u4ef6\u81ea\u52a8\u8c03\u6574\u5927\u5c0f\u3002",
      "cases/02_ui/02_label/GoldBeatingAnime.js.1": "0",
      "cases/02_ui/02_label/AlignFontLabel.fire.6": "\u6587\u672c\u5bf9\u9f50",
      "cases/02_ui/02_label/AlignFontLabel.fire.9": "\u6c34\u5e73\u5bf9\u9f50",
      "cases/02_ui/02_label/AlignFontLabel.fire.14": "\u54c8\u5570\uff01\n\u6b22\u8fce\u4f7f\u7528 \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.16": "\u5bf9\u9f50: \u9760\u5de6",
      "cases/02_ui/02_label/AlignFontLabel.fire.21": "\u54c8\u5570\uff01\n\u6b22\u8fce\u4f7f\u7528 \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.23": "\u5bf9\u9f50: \u5c45\u4e2d",
      "cases/02_ui/02_label/AlignFontLabel.fire.28": "\u54c8\u5570\uff01\n\u6b22\u8fce\u4f7f\u7528 \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.30": "\u5bf9\u9f50: \u9760\u53f3",
      "cases/02_ui/02_label/AlignFontLabel.fire.33": "\u5782\u76f4\u5bf9\u9f50",
      "cases/02_ui/02_label/AlignFontLabel.fire.38": "\u6b22\u8fce\u4f7f\u7528 \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.40": "\u5bf9\u9f50: \u9876\u90e8",
      "cases/02_ui/02_label/AlignFontLabel.fire.45": "\u6b22\u8fce\u4f7f\u7528 \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.47": "\u5bf9\u9f50: \u5c45\u4e2d",
      "cases/02_ui/02_label/AlignFontLabel.fire.52": "\u6b22\u8fce\u4f7f\u7528 \nCocos Creator",
      "cases/02_ui/02_label/AlignFontLabel.fire.54": "\u5bf9\u9f50: \u5e95\u90e8",
      "cases/02_ui/02_label/SystemFontLabel.fire.6": "\u7cfb\u7edf\u5b57\u4f53",
      "cases/02_ui/02_label/SystemFontLabel.fire.9": "\u6362\u884c",
      "cases/02_ui/02_label/SystemFontLabel.fire.14": "\u8fd9\u662f\u7cfb\u7edf\u9ed8\u8ba4\u5b57\u4f53",
      "cases/02_ui/02_label/SystemFontLabel.fire.16": "Overflow: CLAMP",
      "cases/02_ui/02_label/SystemFontLabel.fire.21": "\u8fd9\u662f\u7cfb\u7edf\u9ed8\u8ba4\u5b57\u4f53",
      "cases/02_ui/02_label/SystemFontLabel.fire.23": "Overflow: SHRINK",
      "cases/02_ui/02_label/SystemFontLabel.fire.26": "\u4e0d\u6362\u884c",
      "cases/02_ui/02_label/SystemFontLabel.fire.31": "\u8fd9\u662f\u7cfb\u7edf\u9ed8\u8ba4\u5b57\u4f53",
      "cases/02_ui/02_label/SystemFontLabel.fire.33": "Overflow: CLAMP",
      "cases/02_ui/02_label/SystemFontLabel.fire.38": "\u8fd9\u662f\u7cfb\u7edf\u9ed8\u8ba4\u5b57\u4f53",
      "cases/02_ui/02_label/SystemFontLabel.fire.40": "Overflow: SHRINK",
      "cases/02_ui/02_label/SystemFontLabel.fire.45": "\u54c8\u55bd! \u6b22\u8fce\u4f7f\u7528 Cocos Creator",
      "cases/02_ui/02_label/SystemFontLabel.fire.47": "Overflow: RESZIE_HEIGHT",
      "cases/02_ui/03_button/ButtonInScroll.js.1": "\u9876\u90e8\u6309\u94ae\u88ab\u70b9\u51fb\uff01",
      "cases/02_ui/03_button/ButtonInScroll.js.2": "\u5e95\u90e8\u6309\u94ae\u88ab\u70b9\u51fb\uff01",
      "cases/02_ui/03_button/ButtonInScroll.fire.21": "\u54ea\u4e2a\u6309\u94ae\u88ab\u70b9\u51fb\uff1f",
      "cases/02_ui/03_button/ButtonInScroll.fire.27": "\u62d6\u52a8\u663e\u793a\u66f4\u591a\u6309\u94ae",
      "cases/02_ui/03_button/SimpleButton.js.1": "\u5de6\u8fb9\u7684\u6309\u94ae\u88ab\u70b9\u51fb\uff01",
      "cases/02_ui/03_button/SimpleButton.js.2": "\u53f3\u8fb9\u7684\u6309\u94ae\u88ab\u70b9\u51fb\uff01",
      "cases/02_ui/03_button/ButtonInteractable.fire.7": "\u64ad\u653e",
      "cases/02_ui/03_button/ButtonInteractable.fire.16": "\u505c\u6b62",
      "cases/02_ui/03_button/ButtonInteractable.fire.21": "\u4ea4\u4e92(interactable): true",
      "cases/02_ui/03_button/ButtonInteractable.fire.23": "\u4ea4\u4e92(interactable): false",
      "cases/02_ui/03_button/ButtonInteractable.js.1": "\u4ea4\u4e92(interactable): ",
      "cases/02_ui/03_button/ButtonInteractable.js.2": "\u4ea4\u4e92(interactable): ",
      "cases/02_ui/03_button/ButtonSizeMode.fire": "\u4e0d\u540c\u7684\u6309\u94ae\u7684\u54cd\u5e94\u533a\u57df",
      "cases/02_ui/03_button/SimpleButton.fire.6": "\u54ea\u4e2a\u6309\u94ae\u88ab\u70b9\u51fb\uff1f",
      "cases/02_ui/05_scrollView/Item.js.1": "Tmpl#",
      "cases/02_ui/04_progressbar/progressbar.fire.7": "\u6c34\u5e73\u8fdb\u5ea6\u6761\uff0c\u8fdb\u5ea6 0.3",
      "cases/02_ui/04_progressbar/progressbar.fire.11": "\u53cd\u5411\u6c34\u5e73\u8fdb\u5ea6\u6761\uff0c\u8fdb\u5ea6 1.0",
      "cases/02_ui/04_progressbar/progressbar.fire.15": "\u5782\u76f4\u8fdb\u5ea6\u6761 \n\u4ece\u4e0b\u5411\u4e0a",
      "cases/02_ui/04_progressbar/progressbar.fire.19": "\u5782\u76f4\u8fdb\u5ea6\u6761 \n\u4ece\u4e0a\u5411\u4e0b",
      "cases/02_ui/04_progressbar/progressbar.fire.23": "\u8bbe\u7f6e\u4e86\u7cbe\u7075\u7684\u8fdb\u5ea6\u6761",
      "cases/02_ui/04_progressbar/progressbar.fire.28": "\u8bbe\u7f6e\u4e86\u7cbe\u7075\uff08\u5b50\u63a7\u4ef6\uff09\u7684\u8fdb\u5ea6\u6761",
      "cases/02_ui/05_scrollView/ListView.fire.23": "Item #00",
      "cases/02_ui/05_scrollView/ScrollView.fire.7": "Scrollview \u5b8c\u6574\u529f\u80fd",
      "cases/02_ui/05_scrollView/ScrollView.fire.30": "Scrollview \u6ca1\u6709\u60ef\u6027",
      "cases/02_ui/05_scrollView/ScrollView.fire.53": "Scrollview \u6ca1\u6709\u5f39\u6027",
      "cases/02_ui/05_scrollView/ScrollView.fire.76": "Scrollview \u53ea\u80fd\u6c34\u5e73\u6eda\u52a8",
      "cases/02_ui/05_scrollView/ScrollView.fire.93": "Scrollview \u53ea\u80fd\u5782\u76f4\u6eda\u52a8",
      "cases/02_ui/05_scrollView/ScrollView.fire.110": "Scrollview \u6ca1\u6709\u6eda\u52a8\u6761",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.6": "ScrollView \u548c\u5782\u76f4\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.40": "ScrollView \u548c\u6c34\u5e73\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.74": "ScrollView \u548c\u6a2a\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668 ",
      "cases/02_ui/06_layout/LayoutInScrollView.fire.144": "ScrollView \u548c\u7eb5\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668 ",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.6": "\u6c34\u5e73\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.31": "\u5782\u76f4\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.48": "\u6a2a\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutResizeChildren.fire.85": "\u7eb5\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.6": "\u57fa\u672c",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.31": "\u6c34\u5e73",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.36": "\u5782\u76f4",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.41": "\u6a2a\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/06_layout/LayoutResizeContainer.fire.46": "\u7eb5\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668",
      "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.8": "x:0, y:0",
      "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.12": "x:480, y:320",
      "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.16": "x:960, y:640",
      "cases/02_ui/07_editBox/editbox.js.1": "\u8f93\u5165\u6587\u672c: ",
      "cases/02_ui/06_layout/LayoutNone.fire.6": "\u57fa\u672c\u5e03\u5c40\u5bb9\u5668, \u7c7b\u578b: None\n\u81ea\u52a8\u8c03\u6574\u5927\u5c0f",
      "cases/02_ui/06_layout/LayoutNone.fire.35": "\u6c34\u5e73\u5e03\u5c40\u5bb9\u5668\uff0c\u7c7b\u578b: None\n\u4e0d\u81ea\u52a8\u8c03\u6574\u5927\u5c0f",
      "cases/02_ui/06_layout/LayoutNone.fire.60": "\u5782\u76f4\u5e03\u5c40\u5bb9\u5668\uff0c\u7c7b\u578b: None\n\u4e0d\u81ea\u52a8\u8c03\u6574\u5927\u5c0f",
      "cases/02_ui/06_layout/LayoutNone.fire.77": "\u6a2a\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668\uff0c\u7c7b\u578b: None\n\u4e0d\u81ea\u52a8\u8c03\u6574\u5927\u5c0f",
      "cases/02_ui/06_layout/LayoutNone.fire.142": "\u7eb5\u5411\u7f51\u683c\u5e03\u5c40\u5bb9\u5668\uff0c\u7c7b\u578b: None\n\u4e0d\u81ea\u52a8\u8c03\u6574\u5927\u5c0f",
      "cases/02_ui/07_editBox/EditBox.fire.25": "\u5355\u884c\u5bc6\u7801\u6846:",
      "cases/02_ui/07_editBox/EditBox.fire.27": "\u5355\u884c\u6587\u672c\u6846:",
      "cases/02_ui/07_editBox/EditBox.fire.29": "\u591a\u884c\u6587\u672c\u6846:",
      "cases/02_ui/07_editBox/EditBox.fire.32": "\u70b9\u51fb",
      "cases/02_ui/07_editBox/EditBox.fire.38": "\u6309\u94ae\u5fc5\u987b\u5728 EditBox \u7684\u4e0a\u9762, \n\u5e76\u4e14\u5b83\u5e94\u8be5\u5141\u8bb8\u70b9\u51fb.",
      "cases/02_ui/09_videoplayer/fullscreenVideo.fire": "\u5f53\u60a8\u89e6\u6478\u5c4f\u5e55\u65f6\uff0c\u5c06\u64ad\u653e\u89c6\u9891\u3002\n \u89c6\u9891\u5b8c\u6210\u540e\uff0c\u5b83\u5c06\u88ab\u5220\u9664\u3002",
      "cases/02_ui/09_videoplayer/videoPlayer.nonsupport_fullscreen": "\u5f53\u524d\u8bbe\u5907\u4e0d\u652f\u6301\u5168\u5c4f\u64ad\u653e",
      "cases/03_gameplay/01_player_control/EventManager/KeyboardInput.fire.6": "\u6309 'A' \u6216 'D' \u952e\u63a7\u5236\u5c0f\u7ef5\u7f8a",
      "cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1": "touch (",
      "cases/03_gameplay/01_player_control/On/OnTouchInput.fire.10": "\u8bf7\u89e6\u6478\u4efb\u610f\u4f4d\u7f6e\u8bd5\u8bd5",
      "cases/03_gameplay/01_player_control/On/OnMultiTouchInput.fire.20": "\u7528\u4f60\u7684\u624b\u6307\u653e\u7f29\u56fe\u7247\uff01",
      "cases/03_gameplay/01_player_control/On/DeviceMotion.fire.1": "\u5f00\u542f \u91cd\u529b\u611f\u5e94",
      "cases/03_gameplay/01_player_control/On/DeviceMotion.fire.2": "\u5173\u95ed \u91cd\u529b\u611f\u5e94",
      "cases/03_gameplay/02_actions/SimpleAction.fire.13": "\u7b80\u5355\u7684\u52a8\u4f5c",
      "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.14": "Label",
      "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.18": "\u81ea\u5b9a\u4e49\u52a8\u753b\u5c5e\u6027",
      "cases/03_gameplay/03_animation/AnimationEvent.js.1": "\u5f00\u59cb\u7b2c",
      "cases/03_gameplay/03_animation/AnimationEvent.fire.6": "\u5f00\u59cb\u7b2c1\u4e2a\u52a8\u753b",
      "cases/03_gameplay/03_animation/AnimationEvent.fire.14": "\u52a8\u753b\u4e8b\u4ef6",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.11": "Linear",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.17": "Case In Expo",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.23": "Case Out Expo",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.29": "Case Out In Expo",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.35": "Back Forward",
      "cases/03_gameplay/03_animation/MoveAnimation.fire.41": "\u8fd9\u662f\u4e00\u4e2a\u79fb\u52a8\u52a8\u753b\u3002",
      "cases/03_gameplay/03_animation/SpriteAnimation.fire.9": "\u8fd9\u662f\u7cbe\u7075\u5e27\u52a8\u753b",
      "cases/03_gameplay/03_animation/CreateClip.fire.1": "\u52a8\u6001\u521b\u5efa\u52a8\u753b\u526a\u8f91",
      "cases/04_audio/SimpleAudio.fire.6": "\u4eab\u53d7\u97f3\u4e50!",
      "cases/05_scripting/01_properties/NodeArray.fire.14": "\u8fd9\u662f\u8282\u70b9\u6570\u7ec4",
      "cases/05_scripting/01_properties/NonSerialized.fire.6": "Label",
      "cases/05_scripting/01_properties/NonSerialized.fire.8": "Label",
      "cases/05_scripting/01_properties/NonSerialized.fire.10": "\u8fd9\u662f\u975e\u5e8f\u5217\u5316",
      "cases/05_scripting/01_properties/ReferenceType.fire.8": "Label",
      "cases/05_scripting/01_properties/ReferenceType.fire.11": "\u8fd9\u4e2a\u4f8b\u5b50\u4e0d\u5305\u62ec\u8fd0\u884c\u65f6\u6f14\u793a",
      "cases/05_scripting/01_properties/ValueType.fire.6": "\u8fd9\u4e2a\u4f8b\u5b50\u4e0d\u5305\u62ec\u8fd0\u884c\u65f6\u6f14\u793a",
      "cases/05_scripting/02_prefab/InstantiatePrefab.fire.7": "\u5b9e\u4f8b\u5316\u9884\u5236\u8d44\u6e90",
      "cases/05_scripting/03_events/EventInMask.fire.23": "\u66f4\u6539\u8282\u70b9\u6392\u5e8f",
      "cases/05_scripting/03_events/SimpleEvent.fire.19": "\u89e6\u6478\u4e8b\u4ef6\u53ef\u4ee5\u652f\u6301\u70b9\u51fb",
      "cases/05_scripting/03_events/SimpleEvent.fire.21": "\u9f20\u6807\u4e8b\u4ef6\u53ef\u4ee5\u652f\u6301\u5355\u51fb\u3001\u60ac\u505c\u3001\u6eda\u8f6e",
      "cases/05_scripting/03_events/SimpleEvent.fire.23": "\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u53ef\u4ee5\u624b\u52a8\u89e6\u53d1\n(\u70b9\u51fb\u4e0a\u9762\u7684\u6309\u94ae)",
      "cases/05_scripting/03_events/SimpleEvent.fire.25": "\u57fa\u672c\u4e8b\u4ef6",
      "cases/05_scripting/03_events/TouchPropagation.fire.15": "\u89e6\u6478\u4e8b\u4ef6\u5192\u6ce1",
      "cases/05_scripting/03_events/MousePropagation.fire.1": "\u9f20\u6807\u4e8b\u4ef6\u5192\u6ce1",
      "cases/05_scripting/04_scheduler/scheduleCallbacks.js.1": "5.00 s",
      "cases/05_scripting/04_scheduler/scheduler.fire.9": "5.00 s",
      "cases/05_scripting/04_scheduler/scheduler.fire.12": "\u91cd\u590d\u5b9a\u65f6\u5668",
      "cases/05_scripting/04_scheduler/scheduler.fire.18": "\u53d6\u6d88\u5b9a\u65f6\u5668",
      "cases/05_scripting/04_scheduler/scheduler.fire.24": "\u5b9a\u65f6\u6267\u884c1\u6b21",
      "cases/05_scripting/04_scheduler/scheduler.fire.29": "\u4f7f\u7528 update \u51fd\u6570\u6bcf\u5e27\u66f4\u65b0\u8ba1\u6570",
      "cases/05_scripting/04_scheduler/scheduler.fire.31": "\u5b9a\u65f6\u5668",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.0": "\u70b9\u51fb\u6309\u94ae\u5f00\u59cb\u6267\u884c\u9012\u5f52\u4efb\u52a1\uff0c\u4f60\u6700\u7ec8\u5e94\u8be5\u770b\u5230'\u4efb\u52a12\u6267\u884c\u5b8c\u6210'",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.1": "\u4efb\u52a11\u6267\u884c\u5b8c\u6210",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.2": "\u4efb\u52a12\u6267\u884c\u5b8c\u6210",
      "cases/05_scripting/04_scheduler/recursiveScheduler.fire.3": "\u5f00\u59cb\u4efb\u52a1",
      "cases/05_scripting/05_cross_reference/CrossReference.fire.7": "Label",
      "cases/05_scripting/05_cross_reference/CrossReference.fire.12": "Label",
      "cases/05_scripting/05_cross_reference/CrossReference.fire.14": "\u4ea4\u53c9\u5f15\u7528",
      "cases/05_scripting/06_life_cycle/life_cycle.fire.6": "\u751f\u547d\u5468\u671f",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.5": "\u8d44\u6e90\u52a0\u8f7d",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.9": "\u52a0\u8f7d SpriteFrame",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.15": "\u52a0\u8f7d Texture",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.21": "\u52a0\u8f7d Audio",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.27": "\u52a0\u8f7d Txt",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.33": "\u52a0\u8f7d Font",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.39": "\u52a0\u8f7d Plist",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.45": "\u52a0\u8f7d Prefab",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.51": "\u52a0\u8f7d Scene",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.57": "\u52a0\u8f7d Animation",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.59": "\u52a0\u8f7d Spine",
      "cases/05_scripting/07_asset_loading/AssetLoading.fire.65": "\u5f53\u524d\u5c1a\u65e0\u52a0\u8f7d\u3002",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.1": "\u5df2\u52a0\u8f7d ",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.2": "\u64ad\u653e ",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.3": "\u521b\u5efa ",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.4": "\u64ad\u653e\u97f3\u4e50\u3002",
      "cases/05_scripting/07_asset_loading/AssetLoading.js.5": "\u8fd9\u662f\u5b57\u4f53\uff01",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.7": "\u6309\u7c7b\u578b",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.10": "\u52a0\u8f7d SpriteFrame",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.17": "\u6309 Url",
      "cases/05_scripting/07_asset_loading/LoadRes.fire.20": "\u52a0\u8f7d\u9884\u5236\u8d44\u6e90",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.6": "\u8fd9\u4e2a\u4f8b\u5b50\u4e0d\u5305\u62ec\u8fd0\u884c\u65f6\u6f14\u793a",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.24": "\u5168\u90e8\u52a0\u8f7d",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.30": "\u52a0\u8f7d\u5168\u90e8\u7684SpriteFrame",
      "cases/05_scripting/07_asset_loading/LoadResAll.fire.36": "\u6e05\u7a7a",
      "cases/05_scripting/08_module/load_module.fire.6": "\u52a0\u8f7d\u6a21\u5757",
      "cases/05_scripting/08_module/load_module.fire.10": "\u521b\u5efa\u602a\u7269",
      "cases/05_scripting/09_singleton/Singleton.fire.6": "\u8fd9\u4f8b\u5b50\u4e0d\u5305\u542b\u8fd0\u884c\u65f6\u6f14\u793a",
      "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1": "\u4e0b\u8f7d\u5b8c\u6210!!",
      "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2": "\u6b63\u5728\u4e0b\u8f7d: ",
      "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.3": "\u70b9\u51fb\u4efb\u610f\u5730\u65b9\u8fdb\u884c\u4e0b\u8f7d...",
      "cases/05_scripting/10_loadingBar/loadingBar.fire.7": "\u52a0\u8f7d\u5b8c\u6210",
      "cases/05_scripting/10_loadingBar/loadingBar.fire.18": "\u6b63\u5728\u4e0b\u8f7d",
      "cases/05_scripting/11_network/NetworkCtrl.js.1": "\u8bf7\u7a0d\u7b49...",
      "cases/05_scripting/11_network/NetworkCtrl.js.2": "\u8bf7\u7a0d\u7b49...",
      "cases/05_scripting/11_network/NetworkCtrl.js.3": "\u8bf7\u7a0d\u7b49...",
      "cases/05_scripting/11_network/NetworkCtrl.js.4": "\u8bf7\u7a0d\u7b49...",
      "cases/05_scripting/11_network/NetworkCtrl.js.5": "WebSocket\n\u53d1\u9001\u4e8c\u8fdb\u5236WS\u5df2\u6253\u5f00.",
      "cases/05_scripting/11_network/NetworkCtrl.js.6": "WebSocket\n\u6536\u5230\u54cd\u5e94.",
      "cases/05_scripting/11_network/NetworkCtrl.js.7": "WebSocket\n\u53d1\u9001\u4e8c\u8fdb\u5236\u9047\u5230\u9519\u8bef.",
      "cases/05_scripting/11_network/NetworkCtrl.js.8": "WebSocket\nwebsocket \u5b9e\u4f8b\u5df2\u5173\u95ed.",
      "cases/05_scripting/11_network/NetworkCtrl.js.9": "WebSocket\n\u53d1\u9001\u4e8c\u8fdb\u5236WS\u7b49\u5f85\u4e2d...",
      "cases/05_scripting/11_network/NetworkCtrl.js.10": "WebSocket\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.11": "SocketIO\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.12": "SocketIO\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.13": "SocketIO\n",
      "cases/05_scripting/11_network/NetworkCtrl.js.14": "SocketIO\n",
      "cases/05_scripting/11_network/network.fire.7": "Label",
      "cases/05_scripting/11_network/network.fire.6": "XMLHttpRequest",
      "cases/05_scripting/11_network/network.fire.11": "Label",
      "cases/05_scripting/11_network/network.fire.10": "XMLHttpRequest (ArrayBuffer)",
      "cases/05_scripting/11_network/network.fire.15": "Label",
      "cases/05_scripting/11_network/network.fire.14": "WebSocket",
      "cases/05_scripting/11_network/network.fire.19": "Label",
      "cases/05_scripting/11_network/network.fire.18": "SocketIO",
      "cases/05_scripting/11_network/download-web.fire.1.1": "\u8fdc\u7a0b\u97f3\u9891\u8d44\u6e90\u4e0b\u8f7d",
      "cases/05_scripting/11_network/download-web.fire.1.2": "\u8fdc\u7a0b\u56fe\u7247\u8d44\u6e90\u4e0b\u8f7d",
      "cases/05_scripting/11_network/download-web.fire.2": "\u7b49\u5f85\u4e0b\u8f7d\u4e2d...",
      "cases/05_scripting/11_network/download-web.fire.3": "\u4e0b\u8f7d\u8fdb\u5ea6\uff1a",
      "cases/05_scripting/11_network/download-web.fire.4.1": "\u8fdc\u7a0b\u97f3\u9891\u8d44\u6e90\u4e0b\u8f7d\u5b8c\u6210",
      "cases/05_scripting/11_network/download-web.fire.4.2": "\u8fdc\u7a0b\u56fe\u7247\u8d44\u6e90\u4e0b\u8f7d\u5b8c\u6210",
      "cases/05_scripting/11_network/download-web.fire.5.1": "\u8fdc\u7a0b\u97f3\u9891\u8d44\u6e90\u4e0b\u8f7d\u5931\u8d25",
      "cases/05_scripting/11_network/download-web.fire.5.2": "\u8fdc\u7a0b\u56fe\u7247\u8d44\u6e90\u4e0b\u8f7d\u5931\u8d25",
      "cases/05_scripting/11_network/download-web.fire.6": "\u8d44\u6e90\u5730\u5740\uff1a",
      "cases/05_scripting/11_network/download-web.fire.7": "\u4e0b\u8f7d",
      "cases/05_scripting/11_network/download-web.fire.8": "\u6ed1\u52a8\u5230\u4e0b\u4e00\u9875",
      "cases/05_scripting/11_network/download-web.fire.9": "\u6ed1\u52a8\u5230\u4e0a\u4e00\u9875",
      "cases/05_scripting/11_network/download-web.fire.10": "\u52a0\u8f7d\u5730\u5740\u65e0\u6548",
      "cases/native_call/native_call.fire.1": "\u70b9\u51fb\u6309\u94ae\u8c03\u7528\u9759\u6001\u65b9\u6cd5\uff01",
      "cases/native_call/native_call.fire.2": "\u70b9\u51fb",
      "cases/collider/Category.fire.3": "\u7ec4: \u78b0\u649e",
      "cases/collider/Category.fire.5": "\u7ec4: \u78b0\u649e",
      "cases/collider/Category.fire.7": "\u7ec4: \u78b0\u649e",
      "cases/collider/Category.fire.9": "\u7ec4: \u9ed8\u8ba4",
      "cases/collider/Shape.fire.20": "\u663e\u793a\u591a\u8fb9\u5f62",
      "cases/collider/Shape.fire.27": "\u663e\u793a\u5706",
      "cases/collider/Shape.fire.34": "\u663e\u793a\u76d2\u5b50",
      "cases/collider/Shape.fire.43": "\u663e\u793a\u591a\u8fb9\u5f62",
      "cases/collider/Shape.fire.50": "\u663e\u793a\u5706",
      "cases/collider/Shape.fire.57": "\u663e\u793a\u76d2\u5b50",
      "cases/motionStreak/MotionStreak.fire.1": "\u6539\u53d8\u62d6\u5c3e",
      "cases/spine/SpineBoy.fire.11": "\u8c03\u8bd5\u63d2\u69fd",
      "cases/spine/SpineBoy.fire.18": "\u8c03\u8bd5\u5173\u8282",
      "cases/spine/SpineBoy.fire.25": "\u65f6\u95f4\u7f29\u653e",
      "cases/spine/SpineBoy.fire.36": "\u505c\u6b62",
      "cases/spine/SpineBoy.fire.43": "\u8d70",
      "cases/spine/SpineBoy.fire.50": "\u8dd1",
      "cases/spine/SpineBoy.fire.58": "\u8df3",
      "cases/spine/SpineBoy.fire.65": "\u5c04\u51fb",
      "cases/tiledmap/Puzzle.fire.18": "\u4f60\u8d62\u4e86",
      "cases/tiledmap/Puzzle.fire.21": "\u91cd\u65b0\u5f00\u59cb",
      "cases/tiledmap/Dynamic-Tiledmap.fire.22": "\u52a8\u6001\u521b\u5efa TiledMap",
      "res/prefabs/ListItem.prefab.2": "Label ssss",
      "res/prefabs/Monster.prefab.3": "\u540d\u5b57:",
      "res/prefabs/Monster.prefab.11": "\u7b49\u7ea7 :",
      "res/prefabs/Monster.prefab.19": "\u8840\u91cf :",
      "res/prefabs/Monster.prefab.27": "\u653b\u51fb :",
      "res/prefabs/Monster.prefab.35": "\u9632\u5fa1 :",
      "res/prefabs/loadItem.prefab.1": "Label",
      "resources/test_assets/prefab.prefab.2": "\u8fd9\u662f\u4e00\u4e2a\u9884\u5236",
      "resources/test_assets/scene.fire.3": "\u8fd4\u56de\u8d44\u6e90\u52a0\u8f7d\u573a\u666f",
      "resources/test_assets/scene.fire.6": "\u8fd4\u56de",
      "scripts/Global/Menu.js.1": "\u8bf4\u660e\u6682\u7f3a",
      "cases/subpackage1": "\u52a0\u8f7d\u7b2c\u4e00\u4e2a\u5b50\u5305",
      "cases/goSubpackage1": "\u8fdb\u5165\u7b2c\u4e00\u4e2a\u5b50\u5305\u573a\u666f",
      "cases/goSubpackage1.failed": "\u8fdb\u5165\u7b2c\u4e00\u4e2a\u5b50\u5305\u573a\u666f\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7d\u7b2c\u4e00\u5b50\u5305",
      "cases/subpackage1.loaded": "\u7b2c\u4e00\u4e2a\u5b50\u5305\u5df2\u7ecf\u6210\u529f\u52a0\u8f7d",
      "cases/subpackage2": "\u52a0\u8f7d\u7b2c\u4e8c\u4e2a\u5b50\u5305",
      "cases/goSubpackage2": "\u8fdb\u5165\u7b2c\u4e8c\u4e2a\u5b50\u5305\u573a\u666f",
      "cases/goSubpackage2.failed": "\u8fdb\u5165\u7b2c\u4e8c\u4e2a\u5b50\u5305\u573a\u666f\u5931\u8d25\uff0c\u8bf7\u5148\u52a0\u8f7d\u7b2c\u4e8c\u5b50\u5305",
      "cases/subpackage2.loaded": "\u7b2c\u4e8c\u4e2a\u5b50\u5305\u5df2\u7ecf\u6210\u529f\u52a0\u8f7d",
      "cases/subpackage.complete": "\u52a0\u8f7d\u5b50\u5305\u6210\u529f\uff0c\u53ef\u8df3\u8f6c\u573a\u666f\u8fdb\u884c\u67e5\u770b",
      "cases/subpackage.failed": "\u65e0\u6cd5\u52a0\u8f7d\u5b50\u5305\uff0c\u8bf7\u68c0\u67e5\u63a7\u5236\u53f0\u4ee5\u83b7\u53d6\u8be6\u7ec6\u4fe1\u606f",
      "cases/subpackage.back": "\u8fd4\u56de\u52a0\u8f7d\u5206\u5305\u573a\u666f",
      "scripts/AudioCtrl_Play": "\u64ad\u653e",
      "scripts/AUdioCtrl_Stop": "\u505c\u6b62",
      "scripts/AUdioCtrl_Pause": "\u6682\u505c",
      "scripts/AUdioCtrl_Resume": "\u6062\u590d",
      "scripts/AUdioCtrl_StopAll": "\u505c\u6b62\u6240\u6709",
      "scripts/AUdioCtrl_PauseAll": "\u6682\u505c\u6240\u6709",
      "scripts/AUdioCtrl_ResumeAll": "\u6062\u590d\u6240\u6709",
      sprite_loadRes_asset_success: "\u8d44\u6e90\u52a0\u8f7d\u6210\u529f",
      sprite_loadRes_asset_failed: "\u8d44\u6e90\u52a0\u8f7d\u5931\u8d25"
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "AR", "ChangeColor", "FilledSpriteControl", "TiledSpriteControl", "ParticleControl", "compressed-texture", "GoldBeatingAnime", "ButtonControlCtrl", "ButtonTransition", "SimpleButtonCtrl", "ProgressBarCtrl", "Item", "ListViewCtrl", "LayoutResizeContainerCtrl", "EditBoxEvent", "EditBoxFocus", "EditboxCtrl", "VideoPlayerCtrl", "WebviewCtrl", "RichTextEvents", "SliderCtrl", "checkbox", "PageViewCtrl", "MaskCtrl", "SafeAreaCtrl", "DeviceMotionCtrl", "SimpleKeyboardMovement", "OnMultiTouchCtrl", "OnTouchCtrl", "MoveAction", "RepeatAction", "RotationCtrl", "SequenceAction", "SimpleAction", "AnimateCustomPropertyCtrl", "AnimationCallback", "AnimationEvent", "CreateClipCtrl", "MoveAnimationCtrl", "SheepAnimationCtrl", "tween-demo", "AudioEngineControl", "AudioSourceControl", "MyCustomComponent", "NodeGroupControl", "NonSerializedProperties", "ReferenceTypeProperties", "ValueTypeProperties", "MonsterPrefab", "PopulatePrefab", "ActionCallback", "BasicEventCtrl", "CustomEvent", "Desactiver", "HideOrShowEvent", "HideOrShowEventLogItem", "MouseDragger", "MouseEvent", "OrderSwitcher", "TouchDragger", "TouchEvent", "recursiveTask", "scheduleCallbacks", "Bar", "Switcher", "Foo", "DestroySelf", "AssetLoading", "ComeBackToAssetLoad", "LoadRes_example", "loadResDir_example", "InitData", "LoadModuleCtrl", "Monster", "Singleton", "SingletonCtrl", "LoadingBarCtrl", "NetworkCtrl", "DownloaderCtrl", "downloader-audio", "downloader-picture", "NodeGenerator", "PoolHandler", "ColorRect", "ColorRectAssembler", "custom_material", "capture_to_native", "capture_to_web", "capture_to_wechat", "textureRenderUtils", "3d-model", "dynamic-load-material", "mesh-texture", "mesh", "raycast", "rotate", "moving-objects", "ColliderListener", "Hittest", "HeroControl", "follow", "ShowCollider", "Bullet", "Shooter", "TagColliderListener", "PlatformMotion", "SimpleMotion", "Wall", "DragonBonesCtrl", "loadDragonBonesCtrl", "RuntimeLabel", "doodle", "sine-waves", "arc", "ellipse", "lineTo", "linejoin", "rect", "MotionStreakCtrl", "NativeCallCtrl", "LoadSpine", "SpineCtrl", "load-subpackage", "Puzzle", "TiledTile", "dynamic-tiledmap", "LabelLocalized", "en", "zh", "i18n", "polyglot", "chroma", "Menu", "ShowSubMenu", "StorageUtil", "AudioCtrl", "SearchBlock", "AdaptiveSprite", "Helpers", "Instruction", "ListItem", "SceneList", "TipsCtrl", "TipsManager" ]);
//# sourceMappingURL=project.dev.js.map