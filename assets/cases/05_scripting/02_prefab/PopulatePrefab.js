cc.Class({
    extends: cc.Component,

    properties: {
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

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.randomRange = cc.p(300, 200);
        self.spawnCount = 0;
        self.repeater = setInterval(function() {
            if (self.spawnCount >= self.numberToSpawn) {
                self.clearRepeater();
                return;
            }
            var monster = cc.instantiate(self.prefab);
            self.canvas.node.addChild(monster);
            monster.position = self.getRandomPosition();
            self.spawnCount++;
        }, self.spawnInterval);
    },

    getRandomPosition: function() {
        return cc.p(cc.randomMinus1To1() * this.randomRange.x, cc.randomMinus1To1() * this.randomRange.y);
    },

    clearRepeater: function() {
        clearInterval(this.repeater);
    },
});
