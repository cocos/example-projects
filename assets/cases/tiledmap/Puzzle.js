
var MoveDirection = cc.Enum({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

var minTilesCount = 2;
var mapMoveStep = 1;

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: cc.TiledMap
    },

    properties: {
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

    _setPlayerVisible: function(value) {
        if (this._player) {
            var sp = this._player.getComponent('cc.Sprite');
            sp & sp.setVisible(value);
        }
    },

    _isSucceedLayerVisible: function() {
        if (this._succeedLayer) {
            var sp = this._succeedLayer.getComponent('cc.Sprite');
            return sp.isVisible();
        }

        return false;
    },

    _setSucceedLayerVisible: function(value) {
        if (this._succeedLayer) {
            var sp = this._succeedLayer.getComponent('cc.Sprite');
            sp & sp.setVisible(value);
        }
    },

    // use this for initialization
    onLoad: function () {
        this._player = this.node.getChildByName('player');
        if (! this._isMapLoaded) {
            this._setPlayerVisible(false);
        }

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                self._onKeyPressed(keyCode, event);
            }
        }, self);
    },

    restartGame: function() {
        this._setSucceedLayerVisible(false);
        this.node.setPosition(cc.p(0, 0));
        this._curTile = this._startTile;
        this._updatePlayerPos();
    },

    theMapLoaded: function(err) {
        if (CC_EDITOR || err) return;

        // init the succeed layer
        this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
        this._setSucceedLayerVisible(false);

        // init the player position
        this._tiledMap = this.node.getComponent('cc.TiledMap');
        var objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);
        if (!objectGroup) return;

        var startObj = objectGroup.getObject(this.startObjectName);
        var endObj = objectGroup.getObject(this.successObjectName);
        if (!startObj || !endObj) return;

        var startPos = cc.p(startObj.x, startObj.y);
        var endPos = cc.p(endObj.x, endObj.y);

        this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
        this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
        if (!this._layerFloor || !this._layerBarrier) return;

        this._curTile = this._startTile = this._getTilePos(startPos);
        this._endTile = this._getTilePos(endPos);

        if (this._player) {
            this._updatePlayerPos();
            this._setPlayerVisible(true);
        }

        this._isMapLoaded = true;
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

        return cc.p(x, y);
    },

    _onKeyPressed: function(keyCode, event) {
        if (!this._isMapLoaded || this._isSucceedLayerVisible()) return;

        var newTile = cc.p(this._curTile.x, this._curTile.y);
        var mapMoveDir = MoveDirection.NONE;
        switch(keyCode) {
            case cc.KEY.up:
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
                break;
            case cc.KEY.down:
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
                break;
            case cc.KEY.left:
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
                break;
            case cc.KEY.right:
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
                break;
            default:
                return;
        }

        var ret = this._tryMoveToNewTile(newTile);
        if (ret) {
            // move the map if necessary
            this._tryMoveMap(mapMoveDir);

            // check the player is success or not
            if (cc.pointEqualToPoint(this._curTile, this._endTile)) {
                cc.log('succeed');
                this._setSucceedLayerVisible(true);
            }
        }
    },

    _tryMoveToNewTile: function(newTile) {
        var mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return false;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return false;

        if (this._layerBarrier.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }

        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();

        return true;
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
                    newPos = cc.p(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.DOWN:
                if (viewSize.height - disY - tileSize.height < minDisY) {
                    newPos = cc.p(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.LEFT:
                if (viewSize.width - disX - tileSize.width < minDisX) {
                    newPos = cc.p(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            case MoveDirection.RIGHT:
                if (disX < minDisX) {
                    newPos = cc.p(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            default:
                return;
        }

        if (newPos) {
            // calculate the position range of map
            var minX = viewSize.width - mapContentSize.width;
            var maxX = 0;
            var minY = viewSize.height - mapContentSize.height;
            var maxY = 0;

            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;

            if (!cc.pointEqualToPoint(newPos, mapPos)) {
                cc.log('Move the map to new position: ', newPos);
                this.node.setPosition(newPos);
            }
        }
    }
});
