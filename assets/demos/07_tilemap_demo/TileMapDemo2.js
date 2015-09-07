Fire.Class({
    extends: Fire.Behavior,

    properties: {
        playerTexture: {
            default: '',
            url: Fire.Texture
        },

        speed: {
            default: 2
        }
    },

    // use this for initialization
    onLoad: function () {
        // init speed
        this._currentSpeed = cc.p(0, 0);

        // init barrier
        this._barrierLayer = this.getLayer("barrier");

        var players = this.getObjectGroup("players");

        // spawn point
        var spawnPoint = players.getObject("SpawnPoint");

        this.player = new cc.Sprite( this.playerTexture );
        this.player.setName( 'player' );
        this.player.setPosition( spawnPoint );
        this.addChild( this.player, 10000 );

        // keyboard listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this)
        }, this);
    },

    onKeyPressed: function(keyCode, event) {
        switch (keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._currentSpeed.x = -this.speed;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._currentSpeed.x = this.speed;
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                this._currentSpeed.y = this.speed;
                break;
            case cc.KEY.s:
            case cc.KEY.down:
                this._currentSpeed.y = -this.speed;
                break;
            default:
                break;
        }
    },

    onKeyReleased: function (keyCode, event) {
        switch (keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
            case cc.KEY.d:
            case cc.KEY.right:
                this._currentSpeed.x = 0;
                break;
            case cc.KEY.w:
            case cc.KEY.up:
            case cc.KEY.s:
            case cc.KEY.down:
                this._currentSpeed.y = 0;
                break;
            default:
                break;
        }
    },

    // called every frame
    update: function (dt) {
        this.updatePlayer();
    },

    updatePlayer: function () {

        var speed = cc.p( this._currentSpeed );

        if (speed.x != 0 && this.testBarrierBySpeed(cc.p(speed.x, 0)))
            speed.x = 0;
        if (speed.y != 0 && this.testBarrierBySpeed(cc.p(0, speed.y)))
            speed.y = 0;

        var oldPos = this.player.getPosition();
        var newPos = cc.pAdd( oldPos, speed );

        this.player.setPosition( newPos );
        this.setViewPointCenter(newPos);
    },

    pos2TilePosition: function (pos) {
        var mapSize = this.getMapSize();
        var tileSize = this.getTileSize();

        var x = 0 | (pos.x / tileSize.width);
        var y = 0 | (mapSize.height - pos.y / tileSize.height);
        return cc.p(x, y);
    },

    testBarrierBySpeed: function (speed) {
        var dif = this.player.getContentSize().width / 2 - 2;

        var oldPos = this.player.getPosition();
        var newPos = cc.pAdd( oldPos, speed );

        var testPosList = [];
        testPosList[0] = cc.p(newPos.x - dif, newPos.y - dif);
        testPosList[1] = cc.p(newPos.x - dif, newPos.y + dif);
        testPosList[2] = cc.p(newPos.x + dif, newPos.y + dif);
        testPosList[3] = cc.p(newPos.x + dif, newPos.y - dif);

        for (var i = 0; i < 4; i++) {
            var testPos = cc.p( testPosList[i] );

            if (testPos.x <= 0 || testPos.y <= 0)
                return true;
            if (testPos.x >= this.width || testPos.y >= this.height)
                return true;

            var tilePos = this.pos2TilePosition(testPos);

            var tileGid = this._barrierLayer.getTileGIDAt(tilePos);
            if (tileGid) {
                var properties = this.getPropertiesForGID(tileGid);
                if (properties.barrier) {
                    return true;
                }
            }
        }

        return false;
    },

    setViewPointCenter: function (pos) {
        var winSize = cc.winSize;
        var scene = cc.director.getRunningScene();

        var x = Math.max(pos.x, winSize.width / 2);
        var y = Math.max(pos.y, winSize.height / 2);
        x = Math.min(x, this.width - winSize.width / 2);
        y = Math.min(y, this.height - winSize.height / 2);
        var actualPosition = cc.p(x, y);

        var centerOfView = cc.p(winSize.width / 2, winSize.height / 2);
        var viewPoint = cc.pSub( centerOfView, actualPosition );
        scene.setPosition(viewPoint);
    }
});
