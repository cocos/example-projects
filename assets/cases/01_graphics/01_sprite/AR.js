cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        posAR: cc.Label,
        pos: cc.Label,
        goldAR: cc.Node,
        gold: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        var sheep = this.goldAR.parent;
        var posAR = sheep.convertToWorldSpaceAR(cc.v2(this.goldAR.x, this.goldAR.y));
        this.posAR.string = '(' + parseInt(posAR.x) + ', ' + parseInt(posAR.y) + ')';
        
        sheep = this.goldAR.parent;
        var pos = sheep.convertToWorldSpace(cc.v2(this.gold.x, this.gold.y));
        this.pos.string = '(' + parseInt(pos.x) + ', ' + parseInt(pos.y) + ')';
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
