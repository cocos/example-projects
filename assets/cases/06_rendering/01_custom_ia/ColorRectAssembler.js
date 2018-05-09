const IARenderData = cc.renderer.renderEngine.IARenderData;

module.exports = {
    useModel: false,
    updateRenderData (comp) {
        if (!comp._renderData) {
            comp._renderData = new IARenderData();
            comp._renderData.material = comp.getMaterial();
            comp._renderData.ia = comp._ia;
        }
    },

    renderIA (comp, renderer) {
        renderer._flushIA(comp._renderData);
    }
}