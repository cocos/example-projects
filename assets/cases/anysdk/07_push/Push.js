cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.pushPlugin = anysdk.agentManager.getPushPlugin();
            if(this.pushPlugin){
                this.pushPlugin.setListener(this.onPushResult, this);
            }
        }
    },
    
	startPush: function (){
	    if (!this.pushPlugin) return;
	    this.pushPlugin.startPush();
	},
	
	closePush: function (){
        if (!this.pushPlugin) return;
		this.pushPlugin.closePush();
	},
	
	setAlias: function (){
	    if (!this.pushPlugin) return;
        this.pushPlugin.setAlias("ivenKill");
    },
    
	delAlias: function (){
	    if (!this.pushPlugin) return;
		this.pushPlugin.delAlias("ivenKill");
    },
    
    setTags: function (){
        if (!this.pushPlugin) return;
    	this.pushPlugin.setTags(["easy","fast","qwe"]);
    },
    
    delTags: function (){
        if (!this.pushPlugin) return;
    	this.pushPlugin.delTags(["easy","qwe"]);
    },
    
    onPushResult:function(code,msg){
        cc.log('########## PUSH RESULT ########## code: ' + code + ',msg: ' + msg);
		switch(code){
	    	case anysdk.PushActionResultCode.kPushReceiveMessage:
	    		cc.log("########## kPushReceiveMessage ##########");
	    		break;
	    	default:
	    		break;
	    }
    }

});
