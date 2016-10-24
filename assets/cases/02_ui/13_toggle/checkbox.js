cc.Class({
    extends: cc.Component,

    properties: {
        checkbox: {
            default: null,
            type: cc.Toggle
        },

        checkBoxEventString: {
            default: null,
            type: cc.Label
        },

        radioButtonEventString: {
            default: null,
            type: cc.Label
        },

        radioButton: {
            default: [],
            type: cc.Toggle
        }
    },

    // use this for initialization
    onLoad: function () {
        if(this.checkbox) {
            this._updateToggleEventString("CheckBox", this.checkBoxEventString, this.checkbox);
        }
    },

    _updateToggleEventString: function(title, label, toggle) {
        if(toggle.isChecked) {
            label.string = title + " is checked.";
        } else {
            label.string = title + " is unchecked.";
        }
    },

    radioButtonClicked: function(toggle) {
        var index = this.radioButton.indexOf(toggle);
        var title = "RadioButton";
        switch(index) {
          case 0:
              title += "1";
              break;
          case 1:
              title += "2";
              break;
          case 2:
              title += "3";
              break;
          default:
              break;
        }
        this._updateToggleEventString(title, this.radioButtonEventString, toggle);
    },

    checkBoxClicked: function (toggle) {
        this._updateToggleEventString("CheckBox", this.checkBoxEventString, toggle);
    }
});
