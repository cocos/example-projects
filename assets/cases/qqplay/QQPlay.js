/**
 * @author Javen 
 * @copyright 2018-09-27 19:53:21 javendev@126.com 
 * @description QQPlay 案例
 */
let CustomComponent = require("CustomComponent");
let BKTools = require("BKTools");
cc.Class({
    extends: CustomComponent,

    properties: {
        tipNode: {
            default: null,
            type: cc.Node,
            tooltip: "提示节点",
            visible: true
        },
    },
    setTipMsg(msg) {
        let lable = this.tipNode.getComponent(cc.Label);
        lable.string = msg;
        this.scheduleOnce(function () {
            lable.string = "请点击按钮测试";
        }, 1);
    },
    btn(event, data) {
        let self = this;
        if (data == 'loadImg') {
            if (cc.sys.platform != cc.sys.QQ_PLAY) {
                self.setTipMsg("请在QQ玩一玩环境下测试");
                return;
            }
            //下载图片并保存在手机中
            BKTools.BKGet("http://h.hiphotos.baidu.com/image/pic/item/18d8bc3eb13533fa4dd573ada3d3fd1f40345bd6.jpg", function (res, code) {
                BKTools.log("结果:" + code + " 渗透参数:" + this.custom);
                BK.FileUtil.writeBufferToFile("GameSandBox://test/test.jpg", res);
            }, "custom");

        } else if (data == 'BKNet') {
            if (cc.sys.platform != cc.sys.QQ_PLAY) {
                self.setTipMsg("请在QQ玩一玩环境下测试");
                return;
            }
            BKTools.BKGet("http://h.hiphotos.baidu.com/image/pic/item/18d8bc3eb13533fa4dd573ada3d3fd1f40345bd6.jpg", function (res, code) {
                BKTools.log("结果:" + code + " data>" + res.readAsString() + " 渗透参数:" + this.custom);
            }, "custom");

        } else if (data == 'XMLHttpRequest') {
            //网络请求
            BKTools.get("http://www.wanandroid.com/tools/mockapi/3461/Javen", "", function (status, data) {
                BKTools.log("status>" + status + " data>" + data);
                if (status == 200) {
                    if (data.code == 0) {
                        self.setTipMsg("网络请求结果 Gitee:" + data.data.name);
                        BKTools.log(JSON.stringify(data));
                    } else {
                        self.setTipMsg("网络请求异常:" + data.msg);
                    }
                }
            });
        } else if (data == 'makeDir') {
            if (cc.sys.platform != cc.sys.QQ_PLAY) {
                self.setTipMsg("请在QQ玩一玩环境下测试");
                return;
            }

            let isOk = BKTools.makeDir("GameSandBox://test");
            BKTools.log("GameSandBox文件夹是否创建成功.." + isOk);
            //无法在根目录下创建文件以及文件夹
            isOk = BKTools.makeDir("GameRes://test");
            BKTools.log("文件夹是否创建成功.." + isOk);

        } else if (data == 'skipGame') {
            if (cc.sys.platform != cc.sys.QQ_PLAY) {
                self.setTipMsg("请在QQ玩一玩环境下测试");
                return;
            }
            if (BKTools.versionCompare(GameStatusInfo.QQVer, "7.7.0.0")) {
                BKTools.skipGame("2731");
            } else {
                self.setTipMsg("手Q版本过低,请更新");
            }
        } else if (data == 'toShare') {
            if (cc.sys.platform != cc.sys.QQ_PLAY) {
                self.setTipMsg("请在QQ玩一玩环境下测试");
                return;
            }

            BKTools.log("toShare.....");
            BKTools.toShare(BKTools.getShareInfo(), function (code) {
                BKTools.log("分享结果:" + code);
            });

        } else if (data == 'toFollow') {
            if (cc.sys.platform != cc.sys.QQ_PLAY) {
                self.setTipMsg("请在QQ玩一玩环境下测试");
                return;
            }
            BKTools.log("follow.....");
            BKTools.follow();

        } else if (data == 'uploadScore') {
            BKTools.log("uploadScore.....");
            BKTools.uploadScore(1, function (error, data) {
                BKTools.log("测试上报成绩>" + error + " data>" + data);
            });
        } else if (data == 'toRank') {

            BKTools.getRankList(function (e, d) {
                BKTools.log("拉取排行榜数据:" + e);
                if (e == 0 && d) {
                    d.forEach(element => {
                        BKTools.log("....home华丽的分割线....");
                        BKTools.log("score:" + element.score);
                        BKTools.log("nick:" + element.nick);
                        BKTools.log("url:" + element.url);
                        BKTools.log("selfFlag:" + element.selfFlag);
                        BKTools.log("....home华丽的分割线....");
                    });
                } else {
                    BKTools.log("拉取排行榜数据为空");
                }
            });
        } else if (data == 'toAd') {
            cc.director.loadScene("BkAd");
        } else if (data == 'userInfo') {
            cc.director.loadScene("UserInfo");
        } else if (data == 'webSocket') {
            cc.director.loadScene("WebSocket");
        }
    },
    // onLoad () {},

    start() {
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            BKTools.addGameEvent();
            BKTools.log("初始化生命周期方法..");
        }
    },

    // update (dt) {},
});