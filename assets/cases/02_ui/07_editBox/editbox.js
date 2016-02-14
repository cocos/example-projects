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
        singleLineText: {
            default: null,
            type: cc.EditBox,
        },
        
        singleLinePassword: {
            default: null,
            type: cc.EditBox,
        },
        
        multiLineText: {
            default: null,
            type: cc.EditBox
        }
        
        
    },

    // use this for initialization
    onLoad: function () {

    },
    
    singleLineEditBoxDidBeginEditing: function() {
        cc.log("single line editBoxDidBeginEditing");
    },
    
    singleLineEditBoxDidChanged: function(text) {
        cc.log("single line editBoxDidChanged: " + text);
    },
    
    singleLineEditBoxDidEndEditing: function() {
        cc.log("single line editBoxDidEndEditing: " + this.singleLineText.string);
    },
    
    singleLinePasswordEditBoxDidBeginEditing: function() {
        cc.log("single line password editBoxDidBeginEditing");
    },
    
    singleLinePasswordEditBoxDidChanged: function(text) {
        cc.log("single line password editBoxDidChanged: " + text);
    },
    
    singleLinePasswordEditBoxDidEndEditing: function() {
        cc.log("single line password editBoxDidEndEditing: " + this.singleLinePassword.string);
    },
    
    multiLinePasswordEditBoxDidBeginEditing: function() {
        cc.log("multi line editBoxDidBeginEditing");
    },
    
    multiLinePasswordEditBoxDidChanged: function(text) {
        cc.log("multi line editBoxDidChanged: " + text);
    },
    
    multiLinePasswordEditBoxDidEndEditing: function() {
        cc.log("multi line editBoxDidEndEditing: " + this.multiLineText.string);
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
