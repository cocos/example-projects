cc.Class({
    extends: cc.Component,

    properties: {
        editBox1: cc.EditBox,
        editBox2: cc.EditBox,
        editBox3: cc.EditBox
    },

    // use this for initialization
    onLoad: function () {

    },

    setFocus: function (event){
        var target = event.target;
        if (target.name === "Button1") {
            this.editBox1.setFocus(true);
        } else if (target.name === "Button2") {
            this.editBox2.setFocus(true);
        } else if (target.name === "Button3"){
            this.editBox3.setFocus(true);
        }

        if (this.editBox1.isFocused()) {
            cc.log("Button1 is focused");
        }
        if (this.editBox2.isFocused()) {
            cc.log("Button2 is focused");
        }
        if (this.editBox3.isFocused()) {
            cc.log("Button3 is focused");
        }
    }

});
