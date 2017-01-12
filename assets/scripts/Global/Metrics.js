if (!CC_EDITOR && (typeof cocosAnalytics) !== 'undefined'){
    //Cocos Analytics service, to learn more please visit:
    // http://analytics.qudao.info/    
    cocosAnalytics.init({
        // 申请的APPID,必填
        appID: '11036',
        appSecret: '4e46d7145f70314fa4c9f29a2019094b',
        // 渠道来源,区分 户渠道,渠道编号参考 http://dq.qudao.info/。 channel: '000002'
    });
}
