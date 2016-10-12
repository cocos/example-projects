cc.Class({
    extends: cc.Component,

    properties: {
        oauthLoginServer: 'OAUTH_LOGIN_SERVER',
        appKey: 'APP_KEY',
        appSecret: 'APP_SERCRET',
        privateKey: 'PRIVATE_KEY'
    },

    // use this for initialization
    onLoad: function () {
    },
    
    init: function () {
        if(cc.sys.isMobile){
            this.agentManager = anysdk.agentManager;
            this.agentManager.init(this.appKey, this.appSecret, this.privateKey, this.oauthLoginServer);
        }
    },

});
