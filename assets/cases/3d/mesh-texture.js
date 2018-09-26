
let gfx = cc.renderer.renderEngine.gfx;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var vfmt = new gfx.VertexFormat([
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
            { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
        ]);
        
        let mesh = new cc.Mesh();
        mesh.init(vfmt, 4, true);
        this.mesh = mesh;
        
        this.vertexes = [cc.v2(-100, 100), cc.v2(-100, -100), cc.v2(100, 100), cc.v2(100, -100)];

        mesh.setVertexes(gfx.ATTR_POSITION, this.vertexes);

        mesh.setVertexes(gfx.ATTR_UV0, [
            cc.v2(0,0), cc.v2(0, 1), cc.v2(1, 0), cc.v2(1, 1),
        ]);

        mesh.setIndices([
            0, 1, 2, 1, 3, 2
        ]);

        let renderer = this.node.getComponent(cc.MeshRenderer);
        if (!renderer) {
            renderer = this.node.addComponent(cc.MeshRenderer);
        }
        renderer.mesh = mesh;
    },

    update (dt) {
    },
});
