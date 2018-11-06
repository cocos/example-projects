cc.Class({
    extends: require('./textureRenderUtils'),

    start () {
        this.init();
    },

    captureAndShow () {
        this.createSprite();
        var img = this.initImage();
        this.showSprite(img);
        // download the pic as the file to your local
        this.label.string = 'Showing the capture'
        this.downloadFile('capture_to_web.png', img.src);
    },

    base64Img2Blob(code){
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType}); 
    },

    downloadFile (fileName, content){      
        var aLink = document.createElement('a');
        var blob = this.base64Img2Blob(content);
      
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
 
        aLink.dispatchEvent(evt);
    }   

});
