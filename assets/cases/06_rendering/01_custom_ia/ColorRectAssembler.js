module.exports = {
    useModel: false,
    updateRenderData (comp) {
        if (!comp._renderData) {
            let IARenderData = cc.renderer.renderEngine.IARenderData;
            comp._renderData = new IARenderData();
            comp._renderData.material = comp.getMaterial();
            comp._renderData.ia = comp._ia;
        }
    },

    renderIA (comp, renderer) {
        renderer._flushIA(comp._renderData);
    }
}