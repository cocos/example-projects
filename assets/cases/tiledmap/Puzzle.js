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
            serializable: false,
        },
        _touching: {
            default: false,
            serializable: false,
        },

        _isMapLoaded : {
            default: false,
            serializable: false,
        },

        floorLayerName: {
            default: 'floor'
        },

        barrierLayerName: {
            default: 'barrier'
        },

        objectGroupName: {
            default: 'players'
        },

        startObjectName: {
            default:'SpawnPoint'
        },

        successObjectName: {
            default:'SuccessPoint'
        }
    },

    // use this for initialization
    onLoad: function () {
        this._player = this.node.getChildByName('player');
        if (! this._isMapLoaded) {
            this._player.active = false;
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);

        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this._touching = true;
            this._touchStartPos = event.touch.getLocation();
        });
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (!this._touching || !this._isMapLoaded || this._succeedLayer.active) return;

            this._touching = false;
            var touchPos = event.touch.getLocation();
            var movedX = touchPos.x - this._touchStartPos.x;
            var movedY = touchPos.y - this._touchStartPos.y;
            var movedXValue = Math.abs(movedX);
            var movedYValue = Math.abs(movedY);
            if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
                // touch moved not enough
                return;
            }

            var newTile = cc.v2(this._curTile.x, this._curTile.y);
            var mapMoveDir = MoveDirection.NONE;
            if (movedXValue >= movedYValue) {
                // move to right or left
                if (movedX > 0) {
                    newTile.x += 1;
                    mapMoveDir = MoveDirection.LEFT;
                } else {
                    newTile.x -= 1;
                    mapMoveDir = MoveDirection.RIGHT;
                }
            } else {
                // move to up or down
                if (movedY > 0) {
                    newTile.y -= 1;
                    mapMoveDir = MoveDirection.DOWN;
                } else {
                    newTile.y += 1;
                    mapMoveDir = MoveDirection.UP;
                }
            }
            this._tryMoveToNewTile(newTile, mapMoveDir);
        });
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
    },

    restartGame: function() {
        this._succeedLayer.active = false;
        this._initMapPos();
        this._curTile = this._startTile;
        this._updatePlayerPos();
    },

    start: function(err) {
        if (err) return;

        // init the map position
        this._initMapPos();

        // init the succeed layer
        this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
        this._succeedLayer.active = false;

        // init the player position
        this._tiledMap = this.node.getComponent('cc.TiledMap');
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

    _initMapPos: function() {
        this.node.setPosition(cc.visibleRect.bottomLeft);
    },

    _updatePlayerPos: function() {
        var pos = this._layerFloor.getPositionAt(this._curTile);
        this._player.setPosition(pos);
    },

    _getTilePos: function(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this._tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);

        return cc.v2(x, y);
    },

    _onKeyPressed: function(event) {
        if (!this._isMapLoaded || this._succeedLayer.active) return;

        var newTile = cc.v2(this._curTile.x, this._curTile.y);
        var mapMoveDir = MoveDirection.NONE;
        switch(event.keyCode) {
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

    _tryMoveToNewTile: function(newTile, mapMoveDir) {
        var mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        if (this._layerBarrier.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }

        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();

        // move the map if necessary
        this._tryMoveMap(mapMoveDir);

        // check the player is success or not
        if (this._curTile.equals(this._endTile)) {
            cc.log('succeed');
            this._succeedLayer.active = true;
        }
    },

    _tryMoveMap: function(moveDir) {
        // get necessary data
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
                if (disY < minDisY) {
                    newPos = cc.v2(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.DOWN:
                if (viewSize.height - disY - tileSize.height < minDisY) {
                    newPos = cc.v2(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.LEFT:
                if (viewSize.width - disX - tileSize.width < minDisX) {
                    newPos = cc.v2(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            case MoveDirection.RIGHT:
                if (disX < minDisX) {
                    newPos = cc.v2(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            default:
                return;
        }

        if (newPos) {
            // calculate the position range of map
            var minX = viewSize.width - mapContentSize.width - cc.visibleRect.left;
            var maxX = cc.visibleRect.left.x;
            var minY = viewSize.height - mapContentSize.height - cc.visibleRect.bottom;
            var maxY = cc.visibleRect.bottom.y;

            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;

            if (!newPos.equals(mapPos)) {
                cc.log('Move the map to new position: ', newPos);
                this.node.setPosition(newPos);
            }
        }
    }
});
