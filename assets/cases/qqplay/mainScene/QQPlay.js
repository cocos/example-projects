/**
 * @origin Javen 
 * @description QQPlay
 * 
 * QQ 厘米游戏相关文档链接
 * https://hudong.qq.com/docs/engine/
 */

let BKTools = require("BKTools");
cc.Class({
    extends: cc.Component,

    properties: {
        tipLabel: {
            default: null,
            type: cc.Label,
            tooltip: "提示节点",
            visible: true
        },
        gameId: {
            default: "",
            tooltip: "玩一玩游戏 id"
        },

        PUIN: {
            default: "",
            tooltip: "QQ 公众号"
        },

        startTime: 0
    },

    setTipMsg(msg, error) {
        this.tipLabel.node.color = error ? cc.color(255,0,0,1) : cc.color(0,255,0,1);
        this.tipLabel.string = msg;
        if (!error)
            this.scheduleOnce( () => {
                this.tipLabel.node.color = cc.color(255,255,255,1);
                this.tipLabel.string = "请点击按钮测试";
            }, 2);
    },

    
    start() {
        if (cc.sys.platform == cc.sys.QQ_PLAY) {
            BKTools.addGameEvent();
            BKTools.log("初始化生命周期方法..");
            let now = new Date();
            this.startTime = `${now.getHours()}: ${now.getMinutes()}: ${now.getSeconds()}`;
        }
        else {
            this.setTipMsg('初始化失败，功能无法生效', true);
        }
    },

    loadImg () {
        let self = this;
        //下载图片并保存在手机中
        BKTools.BKGet("http://tools.itharbors.com/christmas/res/tree.png", function (res, code) {
            BKTools.log("结果:" + code + " 渗透参数:" + this.custom);
            BK.FileUtil.writeBufferToFile("GameSandBox://test/test.jpg", res);
            self.setTipMsg("图片保存成功");
        }, "custom");
    },

    getRank () {
        let self = this;
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
                self.setTipMsg("拉取排行榜数据为空");
            }
        });
    },

    uploadScore () {
        let self = this;
        BKTools.log("uploadScore.....");
        BKTools.uploadScore(1, this.startTime, function (error, data) {
            BKTools.log("测试上报成绩>" + error + " data>" + data);
            self.setTipMsg("测试上报成绩>" + error + " data>" + data);
        });
    },
    // 公众号
    officialAccounts () {
        BKTools.log("follow.....");
        BKTools.follow(this.PUIN);
    },

    toShare () {
        BKTools.log("toShare.....");
        BKTools.toShare(BKTools.getShareInfo(), function (code) {
            BKTools.log("分享结果:" + code);
        });
    },

    jmpGame () {
        if (BKTools.versionCompare(GameStatusInfo.QQVer, "7.7.0.0")) {
            BKTools.skipGame(this.gameId);
        } else {
            this.setTipMsg("手Q版本过低,请更新");
        }
    },

    mkdir () {
        let isOk = BKTools.makeDir("GameSandBox://test");
        BKTools.log("GameSandBox文件夹是否创建成功.." + isOk);
        this.setTipMsg("GameSandBox文件夹是否创建成功.." + isOk);

        //无法在根目录下创建文件以及文件夹
        /* isOk = BKTools.makeDir("GameRes://test");
        BKTools.log("根目录文件夹是否创建成功.." + isOk); */
    },

    XMLRequesttTest () {
        let self = this;
        //网络请求
        BKTools.get("https://httpbin.org/get?show_env=1", "", function (status, data) {
            BKTools.log("status>" + status + " data>" + data);
            if (status == 200) {
                if (data) {
                    self.setTipMsg("网络请求成功");
                    BKTools.log(JSON.stringify(data));
                }
            }
        });
    },

    BKNet () {
        let self = this;
        BKTools.BKGet("http://tools.itharbors.com/christmas/res/tree.png", function (res, code) {
            BKTools.log("结果:" + code + " data>" + res.readAsString() + " 渗透参数:" + this.custom);
            self.setTipMsg("结果:" + code + " data>" + res.readAsString() + " 渗透参数:" + this.custom);
        }, "custom");

    }
});