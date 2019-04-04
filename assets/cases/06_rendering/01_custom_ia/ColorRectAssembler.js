module.exports = {
    useModel: false,
    updateRenderData (comp) {
        if (!comp._renderData) {
            let IARenderData = cc.renderer.IARenderData;
            comp._renderData = new IARenderData();
            comp._renderData.material = comp.getMaterial(0);
            comp._renderData.ia = comp._ia;
        }
    },

    renderIA (comp, renderer) {
        renderer._flushIA(comp._renderData);
    }
}