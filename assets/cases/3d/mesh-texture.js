let gfx = cc.gfx;

cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true
    },

    properties: {
        speed: 50
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var vfmt = new gfx.VertexFormat([
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
            { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
        ]);
        
        let mesh = new cc.Mesh();
        mesh.init(vfmt, 9, true);
        this.mesh = mesh;
        
        this.vertexes = [
            cc.v2(-100, 100), cc.v2(0, 100), cc.v2(100, 100),
            cc.v2(-100, 0), cc.v2(0, 0), cc.v2(100, 0),
            cc.v2(-100, -100), cc.v2(0, -100), cc.v2(100, -100)
        ];

        mesh.setVertices(gfx.ATTR_POSITION, this.vertexes);

        mesh.setVertices(gfx.ATTR_UV0, [
            cc.v2(0,0), cc.v2(0.5,0), cc.v2(1, 0),
            cc.v2(0,0.5), cc.v2(0.5,0.5), cc.v2(1,0.5),
            cc.v2(0, 1), cc.v2(0.5, 1), cc.v2(1, 1),
        ]);

        mesh.setIndices([
            0, 1, 3, 1, 4, 3,
            1, 2, 4, 2, 5, 4,
            3, 4, 6, 4, 7, 6,
            4, 5, 7, 5, 8, 7
        ]);

        let renderer = this.node.getComponent(cc.MeshRenderer);
        if (!renderer) {
            renderer = this.node.addComponent(cc.MeshRenderer);
        }
        renderer.mesh = mesh;
        this.mesh = mesh;
    },

    update (dt) {
        if (CC_EDITOR) return;
        
        let lm = this.vertexes[3];
        let rm = this.vertexes[5];
        if ((lm.x < -200 && this.speed < 0) || (lm.x > 0 && this.speed > 0)) {
            this.speed *= -1;
        }
        lm.x += dt * this.speed;
        rm.x += -dt * this.speed;

        this.mesh.setVertices(gfx.ATTR_POSITION, this.vertexes);
    },
});
