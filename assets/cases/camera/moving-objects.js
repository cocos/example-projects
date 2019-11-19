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
        nodeCount: 2000,

        _useCamera: true,
        useCamera: {
            get: function () {
                return this._useCamera;
            },
            set: function (v) {
                if (this._useCamera === v) return;

                this._useCamera = v;

                if (!CC_EDITOR && this.movingNode) {
                    this.movingNode = v ? this.camera : this.root;
                    this.camera.x = this.root.x = 0;
                    this.moveSpeed = -this.moveSpeed;
                }
            }
        }
    },

    onEnable: function () {
    },

    onDisable: function () {
    },

    // use this for initialization
    onLoad: function () {
        console.time('move-objects : onLoad')

        for (var i = 0; i < this.nodeCount; i++) {
            var node = cc.instantiate(this.tempPrefab);
            node.x = (Math.random() - 0.5) * 960;
            node.y = (Math.random() - 0.5) * 640;
            node.parent = this.root;
        }

        this.movingNode = this._useCamera ? this.camera : this.root;
        
        console.timeEnd('move-objects : onLoad')
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.movingNode.x += this.moveSpeed * dt;
        if ((this.moveSpeed > 0 && this.movingNode.x > 900) || 
            (this.moveSpeed < 0 && this.movingNode.x < -900)) {
            this.moveSpeed *= -1;
        }
    },

    useCameraChanged: function (toggle) {
        this.useCamera = toggle.isChecked;
        this.root.group = this.useCamera ? 'Actor' : 'Default';
    },
});
