cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.crashPlugin = anysdk.agentManager.getCrashPlugin();
        }
    },
    
    setUserIdentifier: function (){
        if (!this.crashPlugin) return;
        this.crashPlugin.setUserIdentifier('AnySDK');                         
	},
	
	reportException: function (){
        if (!this.crashPlugin) return;
		this.crashPlugin.reportException('error', 'AnySDK');
	},
	
	leaveBreadcrumb: function (){
        if (!this.crashPlugin) return;
		this.crashPlugin.leaveBreadcrumb('AnySDK');
	}

});
