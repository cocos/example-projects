cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.socialPlugin = anysdk.agentManager.getSocialPlugin();
            if(this.socialPlugin){
                this.socialPlugin.setListener(this.onSocialResult, this);
            }
        }
    },
	submitScore:function(){
	    if (!this.socialPlugin) return;
        var score = 131;
        this.socialPlugin.submitScore("friend", score);
	},
	showLeaderboard:function(){
	    if (!this.socialPlugin) return;
		this.socialPlugin.showLeaderboard("friend");
	},
	unlockAchievement:function(){
	    if (!this.socialPlugin) return;
        var achInfo = {"rank":"friends"}
        this.socialPlugin.unlockAchievement(achInfo);
	},
	
	showAchievements: function (){
	    if (!this.socialPlugin) return;
		this.socialPlugin.showAchievements();
	},
	
	signIn: function (){
	    if (!this.socialPlugin) return;
		this.socialPlugin.signIn();
	},
	
	signOut: function (){
	    if (!this.socialPlugin) return;
		this.socialPlugin.signOut();
	},
	
	onSocialResult:function(code, msg){
        cc.log('########## SOCIAL RESULT ########## code: ' + code + ',msg: ' + msg);
		switch(code){
			case anysdk.SocialRetCode.kScoreSubmitSucceed:
	    		cc.log("########## kScoreSubmitSucceed ##########");
				break;
			case anysdk.SocialRetCode.kScoreSubmitfail:
	    		cc.log("########## kScoreSubmitfail ##########");
				break;
			case anysdk.SocialRetCode.kAchUnlockSucceed:
	    		cc.log("########## kAchUnlockSucceed ##########");
				break;
			case anysdk.SocialRetCode.kAchUnlockFail:
	    		cc.log("########## kAchUnlockFail ##########");
				break;
			case anysdk.SocialRetCode.kSocialSignInSucceed:
	    		cc.log("########## kSocialSignInSucceed ##########");
				break;
			case anysdk.SocialRetCode.kSocialSignOutSucceed:
	    		cc.log("########## kSocialSignOutSucceed ##########");
				break;
			case anysdk.SocialRetCode.kSocialSignOutFail:
	    		cc.log("########## kSocialSignOutFail ##########");
				break;
			case anysdk.SocialRetCode.kSocialSignOutFail:
	    		cc.log("########## kSocialSignOutFail ##########");
				break;
			case anysdk.SocialRetCode.kSocialGetGameFriends:
	    		cc.log("########## kSocialGetGameFriends ##########");
				break;
		}
	}
});
