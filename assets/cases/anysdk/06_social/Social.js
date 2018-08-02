const TipsManager = require('TipsManager');
cc.Class({
    extends: cc.Component,

	start: function () {
		this.socialPlugin = anysdk.agentManager.getSocialPlugin();
		if (this.socialPlugin) {
			this.socialPlugin.setListener(this.onSocialResult, this);
		}
	},

	submitScore: function () {
		if (!this.socialPlugin) {
			TipsManager.createTips(' this.socialPlugin is null ');
			return;
		}
		var score = 131;
		this.socialPlugin.submitScore("friend", score);
	},

	showLeaderboard: function () {
		if (!this.socialPlugin) {
			TipsManager.createTips(' this.socialPlugin is null ');
			return;
		}
		this.socialPlugin.showLeaderboard("friend");
	},

	unlockAchievement: function () {
		if (!this.socialPlugin) {
			TipsManager.createTips(' this.socialPlugin is null ');
			return;
		}
		var achInfo = {"rank": "friends"};
		this.socialPlugin.unlockAchievement(achInfo);
	},

	showAchievements: function () {
		if (!this.socialPlugin) {
			TipsManager.createTips(' this.socialPlugin is null ');
			return;
		}
		this.socialPlugin.showAchievements();
	},

	signIn: function () {
		if (!this.socialPlugin) {
			TipsManager.createTips(' this.socialPlugin is null ');
			return;
		}
		this.socialPlugin.signIn();
	},

	signOut: function () {
		if (!this.socialPlugin) {
			TipsManager.createTips(' this.socialPlugin is null ');
			return;
		}
		this.socialPlugin.signOut();
	},

	onSocialResult: function (code, msg) {
		cc.log(' SOCIAL RESULT ########## code: ' + code + ',msg: ' + msg);
		switch (code) {
			case anysdk.SocialRetCode.kScoreSubmitSucceed:
				TipsManager.createTips(' kScoreSubmitSucceed ');
				break;
			case anysdk.SocialRetCode.kScoreSubmitfail:
				TipsManager.createTips(' kScoreSubmitfail ');
				break;
			case anysdk.SocialRetCode.kAchUnlockSucceed:
				TipsManager.createTips(' kAchUnlockSucceed ');
				break;
			case anysdk.SocialRetCode.kAchUnlockFail:
				TipsManager.createTips(' kAchUnlockFail ');
				break;
			case anysdk.SocialRetCode.kSocialSignInSucceed:
				TipsManager.createTips(' kSocialSignInSucceed ');
				break;
			case anysdk.SocialRetCode.kSocialSignOutSucceed:
				TipsManager.createTips(' kSocialSignOutSucceed ');
				break;
			case anysdk.SocialRetCode.kSocialSignOutFail:
				TipsManager.createTips(' kSocialSignOutFail ');
				break;
				break;
			case anysdk.SocialRetCode.kSocialGetGameFriends:
				TipsManager.createTips(' kSocialGetGameFriends ');
				break;
		}
	}
});
