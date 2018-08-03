cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {

    },
    
    onBtnClick: function (event) {
        var target = event.target;
        var shapeClassName = `cc.${target.name}Collider`;
        var nodePath = 'Canvas/root/' + target.parent.name;
        var collider = cc.find(nodePath).getComponent(shapeClassName);
        collider.enabled = !collider.enabled;
        
        var label = target.getChildByName('Label').getComponent(cc.Label);
        if (collider.enabled) {
            label.string = label.string.replace('Show', 'Hide');
        }
        else {
            label.string = label.string.replace('Hide', 'Show');   
        }
    }
});
