cc.Class({
    extends: cc.Component,

    properties: {
        editBox: cc.EditBox,
        eventDisplay: cc.Label,

        _isEditingReturn: false,
    },
    
    editingDidBegan (event) {
        this.eventDisplay.string = 'editing did began';
    },

    textChanged (event) {
        this.eventDisplay.string = 'text changed: ' + event;
    },

    editingDidEnded (event) {
        if (this._isEditingReturn) {
            this.eventDisplay.string = 'editing returned and ended';
            this._isEditingReturn = false;
        }
        else {
            this.eventDisplay.string = 'editing did ended';
        }
    },

    editingReturn (event) {
        this._isEditingReturn = true;
    },
});
