cc.Class({
    extends: cc.Component,

    // record example-case state
    setCurrentScene (sceneName) {
        if (!CC_PREVIEW) {
            return;
        }
        cc.sys.localStorage.setItem('current-scene', sceneName);
    },

    getCurrentScene () {
        if (!CC_PREVIEW) {
            return;
        }
        let scene = cc.sys.localStorage.getItem('current-scene');
        if (scene) {
            return scene;
        }
        return null;
    },
    // if you want to init the example-case state
    clearStorage () {
        cc.sys.localStorage.clear();
    }
});