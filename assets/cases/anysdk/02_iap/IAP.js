cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile){
            this.iapPlugin = anysdk.agentManager.getIAPPlugin();
            if(this.iapPlugin){
                this.iapPlugin.setListener(this.onIAPResult, this);
            }
        }
    },
    
    payForProduct: function () {
        if(!this.iapPlugin) return;
        var info = {
            'Product_Id': '107196',                    //商品唯一标示符
            'Product_Name': 'three hearts',            //商品名称
            'Product_Price': '0.1',                    //商品单价
            'Product_Count': '1',                      //商品数量
            'Product_Desc': 'three hearts',            //商品描述 
            'Coin_Name': 'heart',                      //虚拟币名称
            'Coin_Rate': '3',                          //虚拟币兑换率
            'Role_Id': "id",    //角色唯一标示符
            'Role_Name': 'name',                      //角色名称
            'Role_Grade': '1',                         //角色等级
            'Role_Balance': "1",  //虚拟币余额
            'Vip_Level': '0',                          //VIP等级
            'Party_Name': 'null',                      //工会名称
            'Server_Id': '1',                          //服务器唯一标示符
            'Server_Name': '1',                        //服务器名称
            'EXT': 'Cocos Creator'                     //扩展字段
        };
        this.iapPlugin.payForProduct(info);
    },
    
    getOrderId: function () {
        if(!this.iapPlugin) return;
        var orderId = this.iapPlugin.getOrderId();
        cc.log('########## getOrderId ########## : ' + orderId);
    },
    
    onPayResult (code, msg) {
        cc.log('########## PAY RESULT ########## code: ' + code + ',msg: ' + msg);
        switch(code){
            case anysdk.PayResultCode.kPaySuccess:// 支付系统支付成功
                console.log('########## kPaySuccess ##########');
                break;
            case anysdk.PayResultCode.kPayCancel:// 支付系统支付取消
                console.log('########## kPayCancel ##########');
                break;
            case anysdk.PayResultCode.kPayFail:// 支付系统支付失败
            case anysdk.PayResultCode.kPayNetworkError:// 支付系统网络错误
            case anysdk.PayResultCode.kPayProductionInforIncomplete:// 支付系统支付信息不完整
                console.log('########## kPayFail ##########');
                break;
            case anysdk.PayResultCode.kPayInitSuccess:// 支付系统初始化成功
                console.log('########## kPayInitSuccess ##########');
                break;
            case anysdk.PayResultCode.kPayInitFail:// 支付系统初始化失败
                console.log('########## kPayInitFail ##########');
                 break;
            case anysdk.PayResultCode.kPayNowPaying:// 支付系统正在支付中
                console.log('########## kPayNowPaying ##########');
                break;
            default:
                break;
            }
    },

});
