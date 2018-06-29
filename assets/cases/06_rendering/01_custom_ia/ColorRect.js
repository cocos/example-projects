// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let assembler = require('./ColorRectAssembler');
let renderEngine;
let gfx;
let math;
let _prevMat;
let _currMat;

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    renderEngine = cc.renderer.renderEngine;
    gfx = renderEngine.gfx;
    math = renderEngine.math;

    _prevMat = math.mat4.create();
    _currMat = math.mat4.create();
})

let ColorRect = cc.Class({
    extends: cc.RenderComponent,

    properties: {
        blColor: cc.Color,
        brColor: cc.Color,
        tlColor: cc.Color,
        trColor: cc.Color,
    },

    _updateVertexData (matrix) {
        let verts = this._vData,
            uintV = this._uintVData;
        let w = this.node.width,
            h = this.node.height,
            appx = w * this.node.anchorX,
            appy = h * this.node.anchorY;
        let a = matrix.m00, b = matrix.m01, c = matrix.m04, d = matrix.m05,
            tx = matrix.m12, ty = matrix.m13;

        let x, y, i = 0;
        
        // bl
        x = -appx;
        y = -appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        // color._val is rgba packed into uint32
        uintV[i++] = this.blColor._val;
        // br
        x = w - appx;
        y = -appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.brColor._val;
        // tl
        x = -appx;
        y = h - appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.tlColor._val;
        // tr
        x = w - appx;
        y = h - appy;
        verts[i++] = x * a + y * c + tx;
        verts[i++] = x * b + y * d + ty;
        uintV[i++] = this.trColor._val;

        this._vb.update(0, verts);
    },

    _createIA () {
        let device = cc.renderer.device;
        // Vertex format defines vertex buffer layout: x, y, color
        this._vertexFormat = new gfx.VertexFormat([
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
            { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true }
        ]);

        // six float for each vertex
        this._vData = new Float32Array(3 * 4);
        this._uintVData = new Uint32Array(this._vData.buffer);
        this._iData = new Uint16Array([0, 1, 2, 1, 3, 2]);

        this._vb = new gfx.VertexBuffer(
            device,
            this._vertexFormat,
            gfx.USAGE_DYNAMIC,
            // array buffer with real data
            null,
            // vertex count
            4
        );
        this._ib = new gfx.IndexBuffer(
            device,
            gfx.INDEX_FMT_UINT16,
            gfx.USAGE_STATIC,
            this._iData,
            // index count
            this._iData.length
        );

        this.node.getWorldMatrix(_currMat);
        this._updateVertexData(_currMat);

        this._ia = new renderEngine.InputAssembler();
        this._ia._vertexBuffer = this._vb;
        this._ia._indexBuffer = this._ib;
        this._ia._start = 0;
        this._ia._count = this._iData.length;
    },

    onEnable () {
        this._super();

        this.node._renderFlag &= ~cc.RenderFlow.FLAG_RENDER;
        this.node._renderFlag |= cc.RenderFlow.FLAG_CUSTOM_IA_RENDER;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this._material = new renderEngine.SpriteMaterial();
        this._material.useTexture = false;
        this._material.useColor = false;

        this._createIA();
    },

    update () {
        this.node.getWorldMatrix(_currMat);
        if (_currMat.m00 !== _prevMat.m00 || 
            _currMat.m01 !== _prevMat.m01 ||
            _currMat.m04 !== _prevMat.m04 ||
            _currMat.m05 !== _prevMat.m05 ||
            _currMat.m12 !== _prevMat.m12 ||
            _currMat.m13 !== _prevMat.m13) 
        {
            this._updateVertexData(_currMat);
        }
    }
});

ColorRect._assembler = assembler;

module.exports = ColorRect;