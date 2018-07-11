cc.Class({
    extends: cc.Component,

    properties: {
        tempVidePlay: cc.Prefab,
    },

    start () {
        this.node.on('touchend', () => {
            let node = cc.instantiate(this.tempVidePlay);
            node.parent = cc.find('Canvas');
            let videoPlayer = node.getComponent(cc.VideoPlayer);
            videoPlayer.enabled = true;
            videoPlayer.isFullscreen = true;
            videoPlayer.play();
        });
    }

});
