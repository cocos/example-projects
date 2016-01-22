cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        editbox: {
            default: null,
            type: cc.EditBox,
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    
    editBoxDidBeginEditing: function() {
        cc.log("editBoxDidBeginEditing");
    },
    
     editBoxDidChanged: function(text) {
        cc.log("editBoxDidChanged: " + text);
    },
    
     editBoxDidEndEditing: function() {
        cc.log("editBoxDidEndEditing: " + this.editbox.string);
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
