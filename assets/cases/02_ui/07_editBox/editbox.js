const i18n = require('i18n');

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
        },

        showEditorBoxLabel: {
            default: null,
            type: cc.Label
        }

    },

    // use this for initialization
    onLoad: function () {

    },

    singleLineEditBoxDidBeginEditing: function(sender) {
        cc.log(sender.node.name + " single line editBoxDidBeginEditing");
    },

    singleLineEditBoxDidChanged: function(text, sender) {
        cc.log(sender.node.name + " single line editBoxDidChanged: " + text);
    },

    singleLineEditBoxDidEndEditing: function(sender) {
        cc.log(sender.node.name + " single line editBoxDidEndEditing: " + this.singleLineText.string);
    },

    singleLinePasswordEditBoxDidBeginEditing: function(sender) {
        cc.log(sender.node.name + " single line password editBoxDidBeginEditing");
    },

    singleLinePasswordEditBoxDidChanged: function(text, sender) {
        cc.log(sender.node.name + " single line password editBoxDidChanged: " + text);
    },

    singleLinePasswordEditBoxDidEndEditing: function(sender) {
        cc.log(sender.node.name + " single line password editBoxDidEndEditing: " + this.singleLinePassword.string);
    },

    multiLinePasswordEditBoxDidBeginEditing: function(sender) {
        cc.log(sender.node.name + " multi line editBoxDidBeginEditing");
    },

    multiLinePasswordEditBoxDidChanged: function(text, sender) {
        cc.log(sender.node.name + " multi line editBoxDidChanged: " + text);
    },

    multiLinePasswordEditBoxDidEndEditing: function(sender) {
        cc.log(sender.node.name + " multi line editBoxDidEndEditing: " + this.multiLineText.string);
    },
    buttonClicked: function() {
        cc.log("button Clicked!");
        if (this.singleLineText.string !== "") {
            this.showEditorBoxLabel.string = i18n.t("cases/02_ui/07_editBox/editbox.js.1") + this.singleLineText.string;
        }
        else {
            this.showEditorBoxLabel.string = "";
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
