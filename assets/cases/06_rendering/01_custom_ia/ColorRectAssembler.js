const IARenderData = cc.renderer.renderEngine.IARenderData;

module.exports = {
    useModel: false,
    datas: [],
    updateRenderData (comp) {
        if (!comp._renderData) {
            comp._renderData = new IARenderData();
            comp._renderData.effect = comp.getEffect();
            comp._renderData.ia = comp._ia;
        }

        this.datas.length = 0;
        this.datas.push(comp._renderData);
        return this.datas;
    }
}